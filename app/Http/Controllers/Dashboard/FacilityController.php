<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\FacilityRequest;
use App\Http\Resources\Dashboard\CityResource;
use App\Http\Resources\Dashboard\FacilityResource;
use App\Http\Resources\Dashboard\FacilityTypeResource;
use App\Http\Resources\Dashboard\GovernorateResource;
use App\Models\City;
use App\Models\Facility;
use App\Models\FacilityBranch;
use App\Models\FacilityType;
use App\Models\Governorate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $facilities = Facility::query()
            ->with(['facilityType', 'media'])
            ->when($search, fn ($q) => $q->where('slug', 'like', "%{$search}%"))
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($facility) => FacilityResource::make($facility)->resolve($request));

        return Inertia::render('dashboard/facilities/index', [
            'facilities' => $facilities,
            'filters' => ['search' => $search],
        ]);
    }

    public function show(Request $request, Facility $facility): Response
    {
        $facility->load([
            'facilityType',
            'branches' => fn ($q) => $q->orderBy('id'),
            'branches.governorate',
            'branches.city',
            'branches.media',
            'offers',
            'offers.offerable',
            'media',
        ]);

        return Inertia::render('dashboard/facilities/show', [
            'facility' => FacilityResource::make($facility)->resolve($request),
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('dashboard/facilities/create', [
            'facilityTypes' => $this->facilityTypeOptions($request),
            'governorates' => $this->governorateOptions($request),
            'cities' => $this->cityOptions($request),
        ]);
    }

    public function store(FacilityRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $branches = $data['branches'] ?? [];
        $logo = $request->file('logo');
        $logoRemove = (bool) ($data['logo_remove'] ?? false);
        unset($data['branches'], $data['logo'], $data['logo_remove']);

        $facility = DB::transaction(function () use ($request, $data, $branches, $logo, $logoRemove) {
            $facility = Facility::create($data);
            $this->syncFacilityLogo($facility, $logo, $logoRemove);
            $this->syncBranches($facility, $branches, $request);

            return $facility;
        });

        return $this->redirectAfterSave(
            $request,
            'dashboard.facilities.edit',
            'dashboard.facilities.index',
            $facility,
        );
    }

    public function edit(Request $request, Facility $facility): Response
    {
        $facility->load([
            'branches' => fn ($q) => $q->orderBy('id'),
            'branches.governorate',
            'branches.city',
            'branches.media',
            'media',
        ]);

        return Inertia::render('dashboard/facilities/edit', [
            'facility' => FacilityResource::make($facility)->resolve($request),
            'facilityTypes' => $this->facilityTypeOptions($request),
            'governorates' => $this->governorateOptions($request),
            'cities' => $this->cityOptions($request),
        ]);
    }

    public function update(FacilityRequest $request, Facility $facility): RedirectResponse
    {
        $data = $request->validated();
        $branches = $data['branches'] ?? [];
        $logo = $request->file('logo');
        $logoRemove = (bool) ($data['logo_remove'] ?? false);
        unset($data['branches'], $data['logo'], $data['logo_remove']);

        DB::transaction(function () use ($request, $facility, $data, $branches, $logo, $logoRemove) {
            $facility->update($data);
            $this->syncFacilityLogo($facility, $logo, $logoRemove);
            $this->syncBranches($facility, $branches, $request);
        });

        return $this->redirectAfterSave(
            $request,
            'dashboard.facilities.edit',
            'dashboard.facilities.index',
            $facility,
        );
    }

    private function syncFacilityLogo(Facility $facility, $logo, bool $remove): void
    {
        if ($remove || $logo) {
            $facility->clearMediaCollection('logo');
        }

        if ($logo) {
            $facility->addMedia($logo->getRealPath())
                ->usingFileName($logo->getClientOriginalName())
                ->toMediaCollection('logo');
        }
    }

    private function syncBranches(Facility $facility, array $branches, FacilityRequest $request): void
    {
        foreach ($branches as $i => $payload) {
            $id = $payload['id'] ?? null;
            $delete = (bool) ($payload['_delete'] ?? false);

            if ($id && $delete) {
                FacilityBranch::where('id', $id)
                    ->where('facility_id', $facility->id)
                    ->delete();

                continue;
            }

            $attributes = [
                'governorate_id' => $payload['governorate_id'] ?? null,
                'city_id' => $payload['city_id'] ?? null,
                'name' => $payload['name'] ?? ['en' => null, 'ar' => null],
                'address' => $payload['address'] ?? ['en' => null, 'ar' => null],
                'phone' => $payload['phone'] ?? [],
                'latitude' => $payload['latitude'] ?? null,
                'longitude' => $payload['longitude'] ?? null,
            ];

            $branch = null;
            if ($id) {
                $branch = FacilityBranch::where('id', $id)
                    ->where('facility_id', $facility->id)
                    ->first();

                if ($branch) {
                    $branch->update($attributes);
                }
            } else {
                $hasContent = ! empty(array_filter([
                    $attributes['name']['en'] ?? null,
                    $attributes['name']['ar'] ?? null,
                    $attributes['address']['en'] ?? null,
                    $attributes['address']['ar'] ?? null,
                ])) || ! empty($attributes['phone']);

                if (! $hasContent) {
                    continue;
                }

                $branch = $facility->branches()->create($attributes);
            }

            if ($branch) {
                $this->syncBranchMedia($branch, $request, $i, $payload);
            }
        }
    }

    private function syncBranchMedia(
        FacilityBranch $branch,
        FacilityRequest $request,
        int $index,
        array $payload,
    ): void {
        $headerFile = $request->file("branches.{$index}.header");
        $headerRemove = (bool) ($payload['header_remove'] ?? false);

        if ($headerRemove || $headerFile) {
            $branch->clearMediaCollection('header');
        }

        if ($headerFile) {
            $branch->addMedia($headerFile->getRealPath())
                ->usingFileName($headerFile->getClientOriginalName())
                ->toMediaCollection('header');
        }

        $galleryRemove = $payload['gallery_remove'] ?? [];
        if (is_array($galleryRemove) && ! empty($galleryRemove)) {
            $branch->media()
                ->where('collection_name', 'gallery')
                ->whereIn('id', $galleryRemove)
                ->each(fn ($media) => $media->delete());
        }

        $galleryFiles = $request->file("branches.{$index}.gallery_files") ?? [];
        if (! is_array($galleryFiles)) {
            $galleryFiles = [$galleryFiles];
        }
        foreach ($galleryFiles as $file) {
            if (! $file) {
                continue;
            }
            $branch->addMedia($file->getRealPath())
                ->usingFileName($file->getClientOriginalName())
                ->toMediaCollection('gallery');
        }
    }

    public function destroy(Facility $facility): RedirectResponse
    {
        $facility->delete();

        return to_route('dashboard.facilities.index');
    }

    private function facilityTypeOptions(Request $request): array
    {
        return FacilityType::query()
            ->orderBy('id')
            ->get()
            ->map(fn ($type) => FacilityTypeResource::make($type)->resolve($request))
            ->all();
    }

    private function governorateOptions(Request $request): array
    {
        return Governorate::query()
            ->orderBy('id')
            ->get()
            ->map(fn ($gov) => GovernorateResource::make($gov)->resolve($request))
            ->all();
    }

    private function cityOptions(Request $request): array
    {
        return City::query()
            ->orderBy('id')
            ->get()
            ->map(fn ($city) => CityResource::make($city)->resolve($request))
            ->all();
    }
}

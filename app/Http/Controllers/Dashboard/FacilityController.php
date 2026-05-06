<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\FacilityRequest;
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
            ->with(['facilityType', 'governorate'])
            ->when($search, fn ($q) => $q->where('slug', 'like', "%{$search}%"))
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($f) => [
                'id' => $f->id,
                'slug' => $f->slug,
                'name' => [
                    'en' => $f->getTranslation('name', 'en', false),
                    'ar' => $f->getTranslation('name', 'ar', false),
                ],
                'facility_type' => $f->facilityType ? [
                    'id' => $f->facilityType->id,
                    'name' => [
                        'en' => $f->facilityType->getTranslation('name', 'en', false),
                        'ar' => $f->facilityType->getTranslation('name', 'ar', false),
                    ],
                ] : null,
                'governorate' => $f->governorate ? [
                    'id' => $f->governorate->id,
                    'name' => [
                        'en' => $f->governorate->getTranslation('name', 'en', false),
                        'ar' => $f->governorate->getTranslation('name', 'ar', false),
                    ],
                ] : null,
            ]);

        return Inertia::render('dashboard/facilities/index', [
            'facilities' => $facilities,
            'filters' => ['search' => $search],
        ]);
    }

    public function show(Facility $facility): Response
    {
        $facility->load(['facilityType', 'governorate', 'branches', 'offers']);

        return Inertia::render('dashboard/facilities/show', [
            'facility' => [
                'id' => $facility->id,
                'slug' => $facility->slug,
                'name' => [
                    'en' => $facility->getTranslation('name', 'en', false),
                    'ar' => $facility->getTranslation('name', 'ar', false),
                ],
                'facility_type' => $facility->facilityType ? [
                    'id' => $facility->facilityType->id,
                    'name' => [
                        'en' => $facility->facilityType->getTranslation('name', 'en', false),
                        'ar' => $facility->facilityType->getTranslation('name', 'ar', false),
                    ],
                ] : null,
                'governorate' => $facility->governorate ? [
                    'id' => $facility->governorate->id,
                    'name' => [
                        'en' => $facility->governorate->getTranslation('name', 'en', false),
                        'ar' => $facility->governorate->getTranslation('name', 'ar', false),
                    ],
                ] : null,
                'created_at' => $facility->created_at?->toDateTimeString(),
                'phone' => $facility->phone,
                'logo_url' => $facility->logo ?: null,
                'branches' => $facility->branches->map(fn ($b) => [
                    'id' => $b->id,
                    'slug' => $b->slug,
                    'name' => [
                        'en' => $b->getTranslation('name', 'en', false),
                        'ar' => $b->getTranslation('name', 'ar', false),
                    ],
                    'address' => [
                        'en' => $b->getTranslation('address', 'en', false),
                        'ar' => $b->getTranslation('address', 'ar', false),
                    ],
                    'phone' => $b->phone ?? [],
                    'latitude' => $b->latitude,
                    'longitude' => $b->longitude,
                    'header_url' => $b->header ?: null,
                    'gallery' => $b->gallery,
                ])->all(),
                'offers' => $facility->offers->map(fn ($o) => [
                    'id' => $o->id,
                    'slug' => $o->slug,
                    'title' => [
                        'en' => $o->getTranslation('title', 'en', false),
                        'ar' => $o->getTranslation('title', 'ar', false),
                    ],
                    'price' => $o->price,
                    'old_price' => $o->old_price,
                ])->all(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/facilities/create', [
            'facilityTypes' => $this->facilityTypeOptions(),
            'governorates' => $this->governorateOptions(),
        ]);
    }

    public function store(FacilityRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $branches = $data['branches'] ?? [];
        $logo = $request->file('logo');
        $logoRemove = (bool) ($data['logo_remove'] ?? false);
        unset($data['branches'], $data['logo'], $data['logo_remove']);

        DB::transaction(function () use ($request, $data, $branches, $logo, $logoRemove) {
            $facility = Facility::create($data);
            $this->syncFacilityLogo($facility, $logo, $logoRemove);
            $this->syncBranches($facility, $branches, $request);
        });

        return to_route('dashboard.facilities.index');
    }

    public function edit(Facility $facility): Response
    {
        $facility->load(['branches' => fn ($q) => $q->orderBy('id'), 'branches.media', 'media']);

        return Inertia::render('dashboard/facilities/edit', [
            'facility' => [
                'id' => $facility->id,
                'slug' => $facility->slug,
                'facility_type_id' => $facility->facility_type_id,
                'governorate_id' => $facility->governorate_id,
                'name' => [
                    'en' => $facility->getTranslation('name', 'en', false),
                    'ar' => $facility->getTranslation('name', 'ar', false),
                ],
                'phone' => $facility->phone,
                'logo_url' => $facility->logo ?: null,
                'branches' => $facility->branches->map(fn ($b) => [
                    'id' => $b->id,
                    'name' => [
                        'en' => $b->getTranslation('name', 'en', false),
                        'ar' => $b->getTranslation('name', 'ar', false),
                    ],
                    'address' => [
                        'en' => $b->getTranslation('address', 'en', false),
                        'ar' => $b->getTranslation('address', 'ar', false),
                    ],
                    'phone' => $b->phone ?? [],
                    'latitude' => $b->latitude,
                    'longitude' => $b->longitude,
                    'header_url' => $b->header ?: null,
                    'gallery' => $b->gallery,
                ])->all(),
            ],
            'facilityTypes' => $this->facilityTypeOptions(),
            'governorates' => $this->governorateOptions(),
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

        return to_route('dashboard.facilities.index');
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

    private function facilityTypeOptions(): array
    {
        return FacilityType::orderBy('id')->get()->map(fn ($t) => [
            'id' => $t->id,
            'name' => [
                'en' => $t->getTranslation('name', 'en', false),
                'ar' => $t->getTranslation('name', 'ar', false),
            ],
        ])->all();
    }

    private function governorateOptions(): array
    {
        return Governorate::orderBy('id')->get()->map(fn ($g) => [
            'id' => $g->id,
            'name' => [
                'en' => $g->getTranslation('name', 'en', false),
                'ar' => $g->getTranslation('name', 'ar', false),
            ],
        ])->all();
    }
}

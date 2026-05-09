<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\FacilityBranchRequest;
use App\Http\Resources\Dashboard\CityResource;
use App\Http\Resources\Dashboard\FacilityBranchResource;
use App\Http\Resources\Dashboard\FacilityResource;
use App\Http\Resources\Dashboard\GovernorateResource;
use App\Models\City;
use App\Models\Facility;
use App\Models\FacilityBranch;
use App\Models\Governorate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FacilityBranchController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $branches = FacilityBranch::query()
            ->with(['facility.media', 'governorate', 'city', 'media'])
            ->when($search, fn ($q) => $q->where('slug', 'like', "%{$search}%"))
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($branch) => FacilityBranchResource::make($branch)->resolve($request));

        return Inertia::render('dashboard/facility-branches/index', [
            'branches' => $branches,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('dashboard/facility-branches/create', [
            'facilities' => $this->facilityOptions($request),
            'governorates' => $this->governorateOptions($request),
            'cities' => $this->cityOptions($request),
        ]);
    }

    public function store(FacilityBranchRequest $request): RedirectResponse
    {
        $branch = FacilityBranch::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.facility-branches.edit',
            'dashboard.facility-branches.index',
            $branch,
        );
    }

    public function edit(Request $request, FacilityBranch $facilityBranch): Response
    {
        $facilityBranch->load(['media', 'governorate', 'city']);

        return Inertia::render('dashboard/facility-branches/edit', [
            'branch' => FacilityBranchResource::make($facilityBranch)->resolve($request),
            'facilities' => $this->facilityOptions($request),
            'governorates' => $this->governorateOptions($request),
            'cities' => $this->cityOptions($request),
        ]);
    }

    public function update(FacilityBranchRequest $request, FacilityBranch $facilityBranch): RedirectResponse
    {
        $facilityBranch->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.facility-branches.edit',
            'dashboard.facility-branches.index',
            $facilityBranch,
        );
    }

    public function destroy(FacilityBranch $facilityBranch): RedirectResponse
    {
        $facilityBranch->delete();

        return to_route('dashboard.facility-branches.index');
    }

    private function facilityOptions(Request $request): array
    {
        return Facility::query()
            ->with('media')
            ->orderBy('id')
            ->get()
            ->map(fn ($facility) => FacilityResource::make($facility)->resolve($request))
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

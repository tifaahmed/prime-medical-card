<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\FacilityTypeRequest;
use App\Http\Resources\Dashboard\FacilityTypeResource;
use App\Models\FacilityType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FacilityTypeController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $facilityTypes = FacilityType::query()
            ->when($search, fn ($q) => $q->where('slug', 'like', "%{$search}%"))
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($type) => FacilityTypeResource::make($type)->resolve($request));

        return Inertia::render('dashboard/facility-types/index', [
            'facilityTypes' => $facilityTypes,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/facility-types/create');
    }

    public function store(FacilityTypeRequest $request): RedirectResponse
    {
        $facilityType = FacilityType::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.facility-types.edit',
            'dashboard.facility-types.index',
            $facilityType,
        );
    }

    public function edit(Request $request, FacilityType $facilityType): Response
    {
        return Inertia::render('dashboard/facility-types/edit', [
            'facilityType' => FacilityTypeResource::make($facilityType)->resolve($request),
        ]);
    }

    public function update(FacilityTypeRequest $request, FacilityType $facilityType): RedirectResponse
    {
        $facilityType->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.facility-types.edit',
            'dashboard.facility-types.index',
            $facilityType,
        );
    }

    public function destroy(FacilityType $facilityType): RedirectResponse
    {
        $facilityType->delete();

        return to_route('dashboard.facility-types.index');
    }
}

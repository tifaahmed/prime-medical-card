<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\FacilityTypeRequest;
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
            ->through(fn ($t) => [
                'id' => $t->id,
                'slug' => $t->slug,
                'name' => [
                    'en' => $t->getTranslation('name', 'en', false),
                    'ar' => $t->getTranslation('name', 'ar', false),
                ],
                'created_at' => $t->created_at?->toDateTimeString(),
            ]);

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
        FacilityType::create($request->validated());

        return to_route('dashboard.facility-types.index');
    }

    public function edit(FacilityType $facilityType): Response
    {
        return Inertia::render('dashboard/facility-types/edit', [
            'facilityType' => [
                'id' => $facilityType->id,
                'slug' => $facilityType->slug,
                'name' => [
                    'en' => $facilityType->getTranslation('name', 'en', false),
                    'ar' => $facilityType->getTranslation('name', 'ar', false),
                ],
            ],
        ]);
    }

    public function update(FacilityTypeRequest $request, FacilityType $facilityType): RedirectResponse
    {
        $facilityType->update($request->validated());

        return to_route('dashboard.facility-types.index');
    }

    public function destroy(FacilityType $facilityType): RedirectResponse
    {
        $facilityType->delete();

        return to_route('dashboard.facility-types.index');
    }
}

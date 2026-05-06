<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\FacilityBranchRequest;
use App\Models\Facility;
use App\Models\FacilityBranch;
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
            ->with('facility')
            ->when($search, fn ($q) => $q->where('slug', 'like', "%{$search}%"))
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($b) => [
                'id' => $b->id,
                'slug' => $b->slug,
                'facility_id' => $b->facility_id,
                'facility' => $b->facility ? [
                    'id' => $b->facility->id,
                    'name' => [
                        'en' => $b->facility->getTranslation('name', 'en', false),
                        'ar' => $b->facility->getTranslation('name', 'ar', false),
                    ],
                ] : null,
                'name' => [
                    'en' => $b->getTranslation('name', 'en', false),
                    'ar' => $b->getTranslation('name', 'ar', false),
                ],
                'address' => [
                    'en' => $b->getTranslation('address', 'en', false),
                    'ar' => $b->getTranslation('address', 'ar', false),
                ],
                'phone' => $b->phone ?? [],
            ]);

        return Inertia::render('dashboard/facility-branches/index', [
            'branches' => $branches,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/facility-branches/create', [
            'facilities' => $this->facilityOptions(),
        ]);
    }

    public function store(FacilityBranchRequest $request): RedirectResponse
    {
        FacilityBranch::create($request->validated());

        return to_route('dashboard.facility-branches.index');
    }

    public function edit(FacilityBranch $facilityBranch): Response
    {
        return Inertia::render('dashboard/facility-branches/edit', [
            'branch' => [
                'id' => $facilityBranch->id,
                'slug' => $facilityBranch->slug,
                'facility_id' => $facilityBranch->facility_id,
                'name' => [
                    'en' => $facilityBranch->getTranslation('name', 'en', false),
                    'ar' => $facilityBranch->getTranslation('name', 'ar', false),
                ],
                'address' => [
                    'en' => $facilityBranch->getTranslation('address', 'en', false),
                    'ar' => $facilityBranch->getTranslation('address', 'ar', false),
                ],
                'phone' => $facilityBranch->phone ?? [],
            ],
            'facilities' => $this->facilityOptions(),
        ]);
    }

    public function update(FacilityBranchRequest $request, FacilityBranch $facilityBranch): RedirectResponse
    {
        $facilityBranch->update($request->validated());

        return to_route('dashboard.facility-branches.index');
    }

    public function destroy(FacilityBranch $facilityBranch): RedirectResponse
    {
        $facilityBranch->delete();

        return to_route('dashboard.facility-branches.index');
    }

    private function facilityOptions(): array
    {
        return Facility::orderBy('id')->get()->map(fn ($f) => [
            'id' => $f->id,
            'name' => [
                'en' => $f->getTranslation('name', 'en', false),
                'ar' => $f->getTranslation('name', 'ar', false),
            ],
        ])->all();
    }
}

<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\GovernorateRequest;
use App\Models\Governorate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GovernorateController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $governorates = Governorate::query()
            ->when($search, fn ($q) => $q->where('slug', 'like', "%{$search}%"))
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($g) => [
                'id' => $g->id,
                'slug' => $g->slug,
                'name' => [
                    'en' => $g->getTranslation('name', 'en', false),
                    'ar' => $g->getTranslation('name', 'ar', false),
                ],
                'created_at' => $g->created_at?->toDateTimeString(),
            ]);

        return Inertia::render('dashboard/governorates/index', [
            'governorates' => $governorates,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/governorates/create');
    }

    public function store(GovernorateRequest $request): RedirectResponse
    {
        Governorate::create($request->validated());

        return to_route('dashboard.governorates.index');
    }

    public function edit(Governorate $governorate): Response
    {
        return Inertia::render('dashboard/governorates/edit', [
            'governorate' => [
                'id' => $governorate->id,
                'slug' => $governorate->slug,
                'name' => [
                    'en' => $governorate->getTranslation('name', 'en', false),
                    'ar' => $governorate->getTranslation('name', 'ar', false),
                ],
            ],
        ]);
    }

    public function update(GovernorateRequest $request, Governorate $governorate): RedirectResponse
    {
        $governorate->update($request->validated());

        return to_route('dashboard.governorates.index');
    }

    public function destroy(Governorate $governorate): RedirectResponse
    {
        $governorate->delete();

        return to_route('dashboard.governorates.index');
    }
}

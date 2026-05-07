<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\GovernorateRequest;
use App\Http\Resources\Dashboard\GovernorateResource;
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
            ->through(fn ($gov) => GovernorateResource::make($gov)->resolve($request));

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
        $governorate = Governorate::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.governorates.edit',
            'dashboard.governorates.index',
            $governorate,
        );
    }

    public function edit(Request $request, Governorate $governorate): Response
    {
        return Inertia::render('dashboard/governorates/edit', [
            'governorate' => GovernorateResource::make($governorate)->resolve($request),
        ]);
    }

    public function update(GovernorateRequest $request, Governorate $governorate): RedirectResponse
    {
        $governorate->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.governorates.edit',
            'dashboard.governorates.index',
            $governorate,
        );
    }

    public function destroy(Governorate $governorate): RedirectResponse
    {
        $governorate->delete();

        return to_route('dashboard.governorates.index');
    }
}

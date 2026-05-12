<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\HomeStepRequest;
use App\Http\Resources\Dashboard\HomeStepResource;
use App\Models\HomeStep;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeStepController extends Controller
{
    public function index(Request $request): Response
    {
        $items = HomeStep::query()
            ->orderBy('position')
            ->orderBy('id')
            ->paginate(15)
            ->through(fn ($r) => HomeStepResource::make($r)->resolve($request));

        return Inertia::render('dashboard/home-steps/index', [
            'steps' => $items,
            'filters' => ['search' => ''],
            'iconKeys' => HomeStepRequest::ICON_KEYS,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/home-steps/create', [
            'iconKeys' => HomeStepRequest::ICON_KEYS,
        ]);
    }

    public function store(HomeStepRequest $request): RedirectResponse
    {
        $row = HomeStep::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.home-steps.edit',
            'dashboard.home-steps.index',
            $row,
        );
    }

    public function edit(Request $request, HomeStep $homeStep): Response
    {
        return Inertia::render('dashboard/home-steps/edit', [
            'step' => HomeStepResource::make($homeStep)->resolve($request),
            'iconKeys' => HomeStepRequest::ICON_KEYS,
        ]);
    }

    public function update(HomeStepRequest $request, HomeStep $homeStep): RedirectResponse
    {
        $homeStep->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.home-steps.edit',
            'dashboard.home-steps.index',
            $homeStep,
        );
    }

    public function destroy(HomeStep $homeStep): RedirectResponse
    {
        $homeStep->delete();

        return to_route('dashboard.home-steps.index');
    }
}

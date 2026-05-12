<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\PricingPlanRequest;
use App\Http\Resources\Dashboard\PricingPlanResource;
use App\Models\PricingPlan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PricingPlanController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $items = PricingPlan::query()
            ->when($search, fn ($q) => $q->where('name', 'like', "%{$search}%"))
            ->orderBy('position')
            ->orderBy('id')
            ->paginate(15)
            ->withQueryString()
            ->through(fn ($r) => PricingPlanResource::make($r)->resolve($request));

        return Inertia::render('dashboard/pricing-plans/index', [
            'plans' => $items,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/pricing-plans/create');
    }

    public function store(PricingPlanRequest $request): RedirectResponse
    {
        $row = PricingPlan::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.pricing-plans.edit',
            'dashboard.pricing-plans.index',
            $row,
        );
    }

    public function edit(Request $request, PricingPlan $pricingPlan): Response
    {
        return Inertia::render('dashboard/pricing-plans/edit', [
            'plan' => PricingPlanResource::make($pricingPlan)->resolve($request),
        ]);
    }

    public function update(PricingPlanRequest $request, PricingPlan $pricingPlan): RedirectResponse
    {
        $pricingPlan->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.pricing-plans.edit',
            'dashboard.pricing-plans.index',
            $pricingPlan,
        );
    }

    public function destroy(PricingPlan $pricingPlan): RedirectResponse
    {
        $pricingPlan->delete();

        return to_route('dashboard.pricing-plans.index');
    }
}

<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\OfferRequest;
use App\Http\Resources\Dashboard\FacilityBranchResource;
use App\Http\Resources\Dashboard\FacilityResource;
use App\Http\Resources\Dashboard\OfferResource;
use App\Models\Facility;
use App\Models\FacilityBranch;
use App\Models\Offer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OfferController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $offers = Offer::query()
            ->with('offerable')
            ->when($search, fn ($q) => $q->where('slug', 'like', "%{$search}%"))
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($offer) => OfferResource::make($offer)->resolve($request));

        return Inertia::render('dashboard/offers/index', [
            'offers' => $offers,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('dashboard/offers/create', [
            'offerableTypes' => $this->offerableTypes($request),
        ]);
    }

    public function store(OfferRequest $request): RedirectResponse
    {
        $offer = Offer::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.offers.edit',
            'dashboard.offers.index',
            $offer,
        );
    }

    public function edit(Request $request, Offer $offer): Response
    {
        return Inertia::render('dashboard/offers/edit', [
            'offer' => OfferResource::make($offer)->resolve($request),
            'offerableTypes' => $this->offerableTypes($request),
        ]);
    }

    public function update(OfferRequest $request, Offer $offer): RedirectResponse
    {
        $offer->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.offers.edit',
            'dashboard.offers.index',
            $offer,
        );
    }

    public function destroy(Offer $offer): RedirectResponse
    {
        $offer->delete();

        return to_route('dashboard.offers.index');
    }

    private function offerableTypes(Request $request): array
    {
        $facilities = Facility::query()
            ->with('media')
            ->orderBy('id')
            ->get()
            ->map(fn ($facility) => FacilityResource::make($facility)->resolve($request))
            ->all();

        $branches = FacilityBranch::query()
            ->with('media')
            ->orderBy('id')
            ->get()
            ->map(fn ($branch) => FacilityBranchResource::make($branch)->resolve($request))
            ->all();

        return [
            ['type' => Facility::class, 'label' => 'Facility', 'options' => $facilities],
            ['type' => FacilityBranch::class, 'label' => 'Facility Branch', 'options' => $branches],
        ];
    }
}

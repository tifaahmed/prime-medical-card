<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\HomeFeaturedOfferRequest;
use App\Http\Resources\Dashboard\HomeFeaturedOfferResource;
use App\Models\HomeFeaturedOffer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeFeaturedOfferController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $items = HomeFeaturedOffer::query()
            ->when($search, fn ($q) => $q->where('title', 'like', "%{$search}%"))
            ->orderBy('position')
            ->orderBy('id')
            ->paginate(15)
            ->withQueryString()
            ->through(fn ($r) => HomeFeaturedOfferResource::make($r)->resolve($request));

        return Inertia::render('dashboard/home-featured-offers/index', [
            'offers' => $items,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/home-featured-offers/create');
    }

    public function store(HomeFeaturedOfferRequest $request): RedirectResponse
    {
        $row = HomeFeaturedOffer::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.home-featured-offers.edit',
            'dashboard.home-featured-offers.index',
            $row,
        );
    }

    public function edit(Request $request, HomeFeaturedOffer $homeFeaturedOffer): Response
    {
        return Inertia::render('dashboard/home-featured-offers/edit', [
            'offer' => HomeFeaturedOfferResource::make($homeFeaturedOffer)->resolve($request),
        ]);
    }

    public function update(HomeFeaturedOfferRequest $request, HomeFeaturedOffer $homeFeaturedOffer): RedirectResponse
    {
        $homeFeaturedOffer->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.home-featured-offers.edit',
            'dashboard.home-featured-offers.index',
            $homeFeaturedOffer,
        );
    }

    public function destroy(HomeFeaturedOffer $homeFeaturedOffer): RedirectResponse
    {
        $homeFeaturedOffer->delete();

        return to_route('dashboard.home-featured-offers.index');
    }
}

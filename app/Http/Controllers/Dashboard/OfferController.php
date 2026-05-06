<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\OfferRequest;
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
            ->through(function ($o) {
                $offerableName = null;
                if ($o->offerable) {
                    $offerableName = [
                        'en' => $o->offerable->getTranslation('name', 'en', false),
                        'ar' => $o->offerable->getTranslation('name', 'ar', false),
                    ];
                }

                return [
                    'id' => $o->id,
                    'slug' => $o->slug,
                    'offerable_id' => $o->offerable_id,
                    'offerable_type' => $o->offerable_type,
                    'offerable_name' => $offerableName,
                    'title' => [
                        'en' => $o->getTranslation('title', 'en', false),
                        'ar' => $o->getTranslation('title', 'ar', false),
                    ],
                    'short_description' => [
                        'en' => $o->getTranslation('short_description', 'en', false),
                        'ar' => $o->getTranslation('short_description', 'ar', false),
                    ],
                    'phone' => $o->phone,
                    'price' => $o->price,
                    'old_price' => $o->old_price,
                ];
            });

        return Inertia::render('dashboard/offers/index', [
            'offers' => $offers,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/offers/create', [
            'offerableTypes' => $this->offerableTypes(),
        ]);
    }

    public function store(OfferRequest $request): RedirectResponse
    {
        Offer::create($request->validated());

        return to_route('dashboard.offers.index');
    }

    public function edit(Offer $offer): Response
    {
        return Inertia::render('dashboard/offers/edit', [
            'offer' => [
                'id' => $offer->id,
                'slug' => $offer->slug,
                'offerable_type' => $offer->offerable_type,
                'offerable_id' => $offer->offerable_id,
                'title' => [
                    'en' => $offer->getTranslation('title', 'en', false),
                    'ar' => $offer->getTranslation('title', 'ar', false),
                ],
                'short_description' => [
                    'en' => $offer->getTranslation('short_description', 'en', false),
                    'ar' => $offer->getTranslation('short_description', 'ar', false),
                ],
                'full_description' => [
                    'en' => $offer->getTranslation('full_description', 'en', false),
                    'ar' => $offer->getTranslation('full_description', 'ar', false),
                ],
                'phone' => $offer->phone,
                'price' => $offer->price,
                'old_price' => $offer->old_price,
            ],
            'offerableTypes' => $this->offerableTypes(),
        ]);
    }

    public function update(OfferRequest $request, Offer $offer): RedirectResponse
    {
        $offer->update($request->validated());

        return to_route('dashboard.offers.index');
    }

    public function destroy(Offer $offer): RedirectResponse
    {
        $offer->delete();

        return to_route('dashboard.offers.index');
    }

    private function offerableTypes(): array
    {
        $facilities = Facility::orderBy('id')->get()->map(fn ($f) => [
            'id' => $f->id,
            'name' => [
                'en' => $f->getTranslation('name', 'en', false),
                'ar' => $f->getTranslation('name', 'ar', false),
            ],
        ])->all();

        $branches = FacilityBranch::orderBy('id')->get()->map(fn ($b) => [
            'id' => $b->id,
            'name' => [
                'en' => $b->getTranslation('name', 'en', false),
                'ar' => $b->getTranslation('name', 'ar', false),
            ],
        ])->all();

        return [
            ['type' => Facility::class, 'label' => 'Facility', 'options' => $facilities],
            ['type' => FacilityBranch::class, 'label' => 'Facility Branch', 'options' => $branches],
        ];
    }
}

<?php

namespace App\Http\Controllers\Guest;

use App\Enums\MembershipFamily\RelationshipEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\Guest\PageSeoResource;
use App\Models\AboutStat;
use App\Models\AboutTimelineEntry;
use App\Models\AboutValue;
use App\Models\ContactMessage;
use App\Models\Facility;
use App\Models\Faq;
use App\Models\HomeFeaturedOffer;
use App\Models\HomeService;
use App\Models\HomeStep;
use App\Models\Membership;
use App\Models\PageContent;
use App\Models\PageSeo;
use App\Models\PricingPlan;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GuestController extends Controller
{
    public function welcome(Request $request): Response
    {
        $publishedOrdered = fn ($query) => $query
            ->where('is_published', true)
            ->orderBy('position')
            ->orderBy('id');

        $faqs = $publishedOrdered(Faq::query())
            ->get(['id', 'question', 'answer'])
            ->map(fn (Faq $faq) => [
                'id' => $faq->id,
                'question' => $faq->question,
                'answer' => $faq->answer,
            ])
            ->all();

        $testimonials = $publishedOrdered(Testimonial::query())
            ->get(['id', 'name', 'role', 'quote', 'avatar', 'is_featured'])
            ->map(fn (Testimonial $t) => [
                'id' => $t->id,
                'name' => $t->name,
                'role' => $t->role,
                'quote' => $t->quote,
                'avatar' => $t->avatar,
                'is_featured' => $t->is_featured,
            ])
            ->all();

        $pricingPlans = $publishedOrdered(PricingPlan::query())
            ->get()
            ->map(fn (PricingPlan $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'description' => $p->description,
                'price' => $p->price,
                'period' => $p->period,
                'features' => $p->features ?? [],
                'badge' => $p->badge,
                'is_featured' => $p->is_featured,
                'cta_label' => $p->cta_label,
                'cta_variant' => $p->cta_variant,
            ])
            ->all();

        $homeServices = $publishedOrdered(HomeService::query())
            ->get(['id', 'title', 'description', 'discount', 'icon_key'])
            ->map(fn (HomeService $s) => [
                'id' => $s->id,
                'title' => $s->title,
                'description' => $s->description,
                'discount' => $s->discount,
                'icon_key' => $s->icon_key,
            ])
            ->all();

        $homeSteps = $publishedOrdered(HomeStep::query())
            ->get(['id', 'title', 'description', 'icon_key'])
            ->map(fn (HomeStep $s) => [
                'id' => $s->id,
                'title' => $s->title,
                'description' => $s->description,
                'icon_key' => $s->icon_key,
            ])
            ->all();

        $featuredOffers = $publishedOrdered(HomeFeaturedOffer::query())
            ->get()
            ->map(fn (HomeFeaturedOffer $o) => [
                'id' => $o->id,
                'title' => $o->title,
                'partner' => $o->partner,
                'description' => $o->description,
                'discount' => $o->discount,
                'expires_text' => $o->expires_text,
                'tag' => $o->tag,
                'accent_color' => $o->accent_color,
            ])
            ->all();

        return Inertia::render('guest/welcome', [
            'seo' => $this->seoFor('home', $request),
            'faqs' => $faqs,
            'testimonials' => $testimonials,
            'pricingPlans' => $pricingPlans,
            'homeServices' => $homeServices,
            'homeSteps' => $homeSteps,
            'featuredOffers' => $featuredOffers,
            'pageContents' => PageContent::mapFor('home'),
        ]);
    }

    public function about(Request $request): Response
    {
        $published = fn ($query) => $query
            ->where('is_published', true)
            ->orderBy('position')
            ->orderBy('id');

        return Inertia::render('guest/about', [
            'seo' => $this->seoFor('about', $request),
            'aboutStats' => $published(AboutStat::query())
                ->get(['id', 'value', 'label'])
                ->all(),
            'aboutValues' => $published(AboutValue::query())
                ->get(['id', 'title', 'description', 'icon_key'])
                ->all(),
            'aboutTimeline' => $published(AboutTimelineEntry::query())
                ->get(['id', 'year', 'title', 'description'])
                ->all(),
            'pageContents' => PageContent::mapFor('about'),
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('guest/services');
    }

    public function serviceDetail(string $id): Response
    {
        return Inertia::render('guest/service-detail', ['id' => $id]);
    }

    public function partners(Request $request): Response
    {
        $facilities = Facility::with([
            'facilityType',
            'branches.governorate',
            'branches.city',
        ])
            ->orderBy('id')
            ->get()
            ->map(fn (Facility $facility) => $this->facilityToArray($facility))
            ->values()
            ->all();

        return Inertia::render('guest/partners', [
            'seo' => $this->seoFor('partners', $request),
            'facilities' => $facilities,
            'pageContents' => PageContent::mapFor('partners'),
        ]);
    }

    public function partnerDetail(string $slug): Response
    {
        $facility = Facility::with([
            'facilityType',
            'branches.governorate',
            'branches.city',
        ])
            ->where('slug', $slug)
            ->first();

        return Inertia::render('guest/partner-detail', [
            'slug' => $slug,
            'facility' => $facility ? $this->facilityToArray($facility) : null,
        ]);
    }

    private function facilityToArray(Facility $facility): array
    {
        $branches = $facility->branches->map(function ($branch) {
            return [
                'id' => $branch->id,
                'name' => $branch->getTranslation('name', 'ar', false)
                    ?: $branch->getTranslation('name', 'en', false),
                'address' => $branch->getTranslation('address', 'ar', false)
                    ?: $branch->getTranslation('address', 'en', false),
                'phone' => is_array($branch->phone) ? $branch->phone : (array) ($branch->phone ?? []),
                'latitude' => $branch->latitude,
                'longitude' => $branch->longitude,
                'governorate' => $branch->governorate ? [
                    'id' => $branch->governorate->id,
                    'name' => $branch->governorate->getTranslation('name', 'ar', false)
                        ?: $branch->governorate->getTranslation('name', 'en', false),
                ] : null,
                'city' => $branch->city ? [
                    'id' => $branch->city->id,
                    'name' => $branch->city->getTranslation('name', 'ar', false)
                        ?: $branch->city->getTranslation('name', 'en', false),
                ] : null,
            ];
        })->values()->all();

        return [
            'id' => $facility->id,
            'slug' => $facility->slug,
            'name' => $facility->getTranslation('name', 'ar', false)
                ?: $facility->getTranslation('name', 'en', false),
            'phone' => $facility->phone,
            'logo_url' => $facility->logo ?: null,
            'facility_type' => $facility->facilityType ? [
                'id' => $facility->facilityType->id,
                'name' => $facility->facilityType->getTranslation('name', 'ar', false)
                    ?: $facility->facilityType->getTranslation('name', 'en', false),
            ] : null,
            'branches' => $branches,
        ];
    }

    public function contact(Request $request): Response
    {
        return Inertia::render('guest/contact', [
            'seo' => $this->seoFor('contact', $request),
            'pageContents' => PageContent::mapFor('contact'),
        ]);
    }

    public function submitContact(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'subject' => ['required', 'string', 'max:5000'],
        ]);

        ContactMessage::create($data);

        return back()->with('contact_submitted', true);
    }

    public function memberCard(string $number): Response
    {
        $membership = Membership::with([
            'user',
            'media',
            'family' => fn ($q) => $q->orderBy('id'),
            'family.media',
        ])
            ->where('membership_number', $number)
            ->orWhere(function ($q) use ($number) {
                $q->whereRaw("REPLACE(membership_number, '-', '') = ?", [$number]);
            })
            ->first();

        if (! $membership) {
            return Inertia::render('guest/member-card', [
                'number' => $number,
                'membership' => null,
            ]);
        }

        return Inertia::render('guest/member-card', [
            'number' => $number,
            'membership' => [
                'id' => $membership->id,
                'membership_number' => $membership->membership_number,
                'registration_date' => $membership->registration_date?->toDateString(),
                'expiration_date' => $membership->expiration_date?->toDateString(),
                'is_active' => (bool) $membership->is_active,
                'is_visible' => (bool) $membership->is_visible,
                'job_title_ar' => $membership->getTranslation('job_title', 'ar', false),
                'photo_url' => $membership->photo ?: null,
                'holder_name' => $membership->user?->name,
                'family' => $membership->family
                    ->map(function ($m) {
                        $rel = $m->relationship instanceof RelationshipEnum ? $m->relationship : null;

                        return [
                            'id' => $m->id,
                            'name' => $m->name,
                            'relationship_ar' => $rel?->labels()['ar'],
                            'date_of_birth' => $m->date_of_birth?->toDateString(),
                            'phone' => $m->phone,
                            'email' => $m->email,
                            'is_active' => (bool) $m->is_active,
                            'photo_url' => $m->photo ?: null,
                        ];
                    })
                    ->values()
                    ->all(),
            ],
        ]);
    }

    private function seoFor(string $key, Request $request): ?array
    {
        $row = PageSeo::with('media')->where('page_key', $key)->first();

        return $row ? PageSeoResource::make($row)->resolve($request) : null;
    }
}

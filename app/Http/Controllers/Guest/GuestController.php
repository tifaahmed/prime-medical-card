<?php

namespace App\Http\Controllers\Guest;

use App\Enums\MembershipFamily\RelationshipEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\Guest\PageSeoResource;
use App\Models\Membership;
use App\Models\PageSeo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GuestController extends Controller
{
    public function welcome(Request $request): Response
    {
        return Inertia::render('guest/welcome', [
            'seo' => $this->seoFor('home', $request),
        ]);
    }

    public function about(Request $request): Response
    {
        return Inertia::render('guest/about', [
            'seo' => $this->seoFor('about', $request),
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
        return Inertia::render('guest/partners', [
            'seo' => $this->seoFor('partners', $request),
        ]);
    }

    public function partnerDetail(string $id): Response
    {
        return Inertia::render('guest/partner-detail', ['id' => $id]);
    }

    public function contact(Request $request): Response
    {
        return Inertia::render('guest/contact', [
            'seo' => $this->seoFor('contact', $request),
        ]);
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

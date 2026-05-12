<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MembershipResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at?->toDateTimeString(),
            'slug' => $this->slug,
            'membership_number' => $this->membership_number,
            'registration_date' => $this->registration_date?->toDateString(),
            'expiration_date' => $this->expiration_date?->toDateString(),
            'is_active' => (bool) $this->is_active,
            'is_visible' => (bool) $this->is_visible,
            'job_title' => [
                'en' => $this->getTranslation('job_title', 'en', false),
                'ar' => $this->getTranslation('job_title', 'ar', false),
            ],
            'company_name' => $this->company_name,
            'photo_url' => $this->photo ?: null,
            'holder_name' => $this->whenLoaded('user', fn () => $this->user?->name),
            'family_count' => $this->whenCounted('family'),
            'family' => $this->whenLoaded(
                'family',
                fn () => $this->family
                    ->map(fn ($member) => MembershipFamilyResource::make($member)->resolve($request))
                    ->all(),
            ),
        ];
    }
}

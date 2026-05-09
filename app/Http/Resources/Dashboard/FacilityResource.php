<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FacilityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'facility_type_id' => $this->facility_type_id,
            'name' => [
                'en' => $this->getTranslation('name', 'en', false),
                'ar' => $this->getTranslation('name', 'ar', false),
            ],
            'phone' => $this->phone,
            'logo_url' => $this->logo ?: null,
            'created_at' => $this->created_at?->toDateTimeString(),
            'facility_type' => $this->whenLoaded(
                'facilityType',
                fn () => $this->facilityType
                    ? FacilityTypeResource::make($this->facilityType)->resolve($request)
                    : null,
            ),
            'branches' => $this->whenLoaded(
                'branches',
                fn () => $this->branches
                    ->map(fn ($branch) => FacilityBranchResource::make($branch)->resolve($request))
                    ->all(),
            ),
            'offers' => $this->whenLoaded(
                'offers',
                fn () => $this->offers
                    ->map(fn ($offer) => OfferResource::make($offer)->resolve($request))
                    ->all(),
            ),
        ];
    }
}

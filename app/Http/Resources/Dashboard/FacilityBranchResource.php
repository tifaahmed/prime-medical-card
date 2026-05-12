<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FacilityBranchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at?->toDateTimeString(),
            'slug' => $this->slug,
            'facility_id' => $this->facility_id,
            'governorate_id' => $this->governorate_id,
            'city_id' => $this->city_id,
            'name' => [
                'en' => $this->getTranslation('name', 'en', false),
                'ar' => $this->getTranslation('name', 'ar', false),
            ],
            'address' => [
                'en' => $this->getTranslation('address', 'en', false),
                'ar' => $this->getTranslation('address', 'ar', false),
            ],
            'phone' => $this->phone ?? [],
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'header_url' => $this->header ?: null,
            'gallery' => $this->gallery,
            'facility' => $this->whenLoaded(
                'facility',
                fn () => FacilityResource::make($this->facility)->resolve($request),
            ),
            'governorate' => $this->whenLoaded(
                'governorate',
                fn () => $this->governorate
                    ? GovernorateResource::make($this->governorate)->resolve($request)
                    : null,
            ),
            'city' => $this->whenLoaded(
                'city',
                fn () => $this->city
                    ? CityResource::make($this->city)->resolve($request)
                    : null,
            ),
        ];
    }
}

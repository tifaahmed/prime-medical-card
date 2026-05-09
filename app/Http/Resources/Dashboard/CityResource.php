<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'governorate_id' => $this->governorate_id,
            'name' => [
                'en' => $this->getTranslation('name', 'en', false),
                'ar' => $this->getTranslation('name', 'ar', false),
            ],
            'created_at' => $this->created_at?->toDateTimeString(),
            'governorate' => $this->whenLoaded(
                'governorate',
                fn () => $this->governorate
                    ? GovernorateResource::make($this->governorate)->resolve($request)
                    : null,
            ),
        ];
    }
}

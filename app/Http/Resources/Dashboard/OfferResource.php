<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at?->toDateTimeString(),
            'slug' => $this->slug,
            'offerable_id' => $this->offerable_id,
            'offerable_type' => $this->offerable_type,
            'title' => [
                'en' => $this->getTranslation('title', 'en', false),
                'ar' => $this->getTranslation('title', 'ar', false),
            ],
            'short_description' => [
                'en' => $this->getTranslation('short_description', 'en', false),
                'ar' => $this->getTranslation('short_description', 'ar', false),
            ],
            'full_description' => [
                'en' => $this->getTranslation('full_description', 'en', false),
                'ar' => $this->getTranslation('full_description', 'ar', false),
            ],
            'phone' => $this->phone,
            'price' => $this->price,
            'old_price' => $this->old_price,
            'offerable_name' => $this->whenLoaded(
                'offerable',
                fn () => $this->offerable ? [
                    'en' => $this->offerable->getTranslation('name', 'en', false),
                    'ar' => $this->offerable->getTranslation('name', 'ar', false),
                ] : null,
            ),
        ];
    }
}

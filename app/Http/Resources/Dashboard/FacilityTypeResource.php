<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FacilityTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => [
                'en' => $this->getTranslation('name', 'en', false),
                'ar' => $this->getTranslation('name', 'ar', false),
            ],
            'created_at' => $this->created_at?->toDateTimeString(),
        ];
    }
}

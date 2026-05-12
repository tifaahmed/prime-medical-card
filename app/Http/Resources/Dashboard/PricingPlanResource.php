<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PricingPlanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at?->toDateTimeString(),
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'period' => $this->period,
            'features' => $this->features ?? [],
            'badge' => $this->badge,
            'is_featured' => $this->is_featured,
            'cta_label' => $this->cta_label,
            'cta_variant' => $this->cta_variant,
            'is_published' => $this->is_published,
            'position' => $this->position,
        ];
    }
}

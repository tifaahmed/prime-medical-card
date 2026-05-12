<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HomeFeaturedOfferResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at?->toDateTimeString(),
            'title' => $this->title,
            'partner' => $this->partner,
            'description' => $this->description,
            'discount' => $this->discount,
            'expires_text' => $this->expires_text,
            'tag' => $this->tag,
            'accent_color' => $this->accent_color,
            'is_published' => $this->is_published,
            'position' => $this->position,
        ];
    }
}

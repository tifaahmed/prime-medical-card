<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CardTemplateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'layout' => $this->layout,
            'is_default' => $this->is_default,
            'front_empty_url' => $this->frontEmptyUrl(),
            'front_example_url' => $this->frontExampleUrl(),
            'back_url' => $this->backUrl(),
            'created_at' => $this->created_at?->toDateTimeString(),
        ];
    }
}

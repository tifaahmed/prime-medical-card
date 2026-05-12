<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'quote' => $this->quote,
            'avatar' => $this->avatar,
            'is_featured' => $this->is_featured,
            'is_published' => $this->is_published,
            'position' => $this->position,
        ];
    }
}

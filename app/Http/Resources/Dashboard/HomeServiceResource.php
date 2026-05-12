<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HomeServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'discount' => $this->discount,
            'icon_key' => $this->icon_key,
            'is_published' => $this->is_published,
            'position' => $this->position,
        ];
    }
}

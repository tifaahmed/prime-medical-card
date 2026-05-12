<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageContentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at?->toDateTimeString(),
            'page' => $this->page,
            'section' => $this->section,
            'key' => $this->key,
            'value' => $this->value,
            'is_rich' => $this->is_rich,
        ];
    }
}

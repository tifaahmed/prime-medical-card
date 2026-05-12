<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AboutTimelineEntryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'year' => $this->year,
            'title' => $this->title,
            'description' => $this->description,
            'is_published' => $this->is_published,
            'position' => $this->position,
        ];
    }
}

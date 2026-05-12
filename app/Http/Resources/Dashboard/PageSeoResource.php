<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageSeoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at?->toDateTimeString(),
            'page_key' => $this->page_key,
            'title' => [
                'en' => $this->getTranslation('title', 'en', false),
                'ar' => $this->getTranslation('title', 'ar', false),
            ],
            'description' => [
                'en' => $this->getTranslation('description', 'en', false),
                'ar' => $this->getTranslation('description', 'ar', false),
            ],
            'keywords' => $this->keywords ?? [],
            'noindex' => (bool) $this->noindex,
            'og_image_url' => $this->image ?: null,
        ];
    }
}

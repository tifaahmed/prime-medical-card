<?php

namespace App\Http\Resources\Guest;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageSeoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();
        $fallback = config('app.fallback_locale', 'en');

        $title = $this->getTranslation('title', $locale, false)
            ?: $this->getTranslation('title', $fallback, false);
        $description = $this->getTranslation('description', $locale, false)
            ?: $this->getTranslation('description', $fallback, false);

        return [
            'page_key' => $this->page_key,
            'title' => $title ?: null,
            'description' => $description ?: null,
            'keywords' => $this->keywords ?: [],
            'noindex' => (bool) $this->noindex,
            'og_image_url' => $this->image ?: null,
        ];
    }
}

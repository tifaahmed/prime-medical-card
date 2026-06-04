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
            'layout' => $this->coerceLayoutNumbers($this->layout),
            'is_default' => $this->is_default,
            'front_empty_url' => $this->frontEmptyUrl(),
            'front_example_url' => $this->frontExampleUrl(),
            'back_url' => $this->backUrl(),
            'created_at' => $this->created_at?->toDateTimeString(),
        ];
    }

    private function coerceLayoutNumbers(?array $layout): ?array
    {
        if ($layout === null) {
            return null;
        }

        $booleanKeys = ['hidden', 'rounded'];

        return collect($layout)
            ->map(fn ($section) => collect((array) $section)
                ->map(fn ($v, $k) => in_array($k, $booleanKeys, true)
                    ? filter_var($v, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false
                    : (is_numeric($v) ? (float) $v : $v))
                ->all())
            ->all();
    }
}

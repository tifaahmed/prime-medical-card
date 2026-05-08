<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class PageSeoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title.en' => ['nullable', 'string', 'max:255'],
            'title.ar' => ['nullable', 'string', 'max:255'],
            'description.en' => ['nullable', 'string', 'max:1000'],
            'description.ar' => ['nullable', 'string', 'max:1000'],
            'keywords' => ['nullable', 'array'],
            'keywords.*' => ['nullable', 'string', 'max:100'],
            'noindex' => ['nullable', 'boolean'],
            'og_image' => ['nullable', 'image', 'max:4096'],
            'og_image_remove' => ['nullable', 'boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        foreach (['noindex', 'og_image_remove'] as $key) {
            if ($this->has($key)) {
                $this->merge([$key => filter_var($this->input($key), FILTER_VALIDATE_BOOL)]);
            }
        }

        $keywords = $this->input('keywords');
        if (is_array($keywords)) {
            $this->merge([
                'keywords' => array_values(array_filter(
                    array_map(fn ($k) => is_string($k) ? trim($k) : '', $keywords),
                    fn ($k) => $k !== '',
                )),
            ]);
        }
    }
}

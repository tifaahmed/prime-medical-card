<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class PricingPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
            'price' => ['required', 'string', 'max:50'],
            'period' => ['nullable', 'string', 'max:255'],
            'features' => ['nullable', 'array'],
            'features.*' => ['required', 'string', 'max:500'],
            'badge' => ['nullable', 'string', 'max:100'],
            'is_featured' => ['nullable', 'boolean'],
            'cta_label' => ['required', 'string', 'max:100'],
            'cta_variant' => ['required', 'in:ghost,amber,primary'],
            'is_published' => ['nullable', 'boolean'],
            'position' => ['nullable', 'integer', 'min:0', 'max:9999'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'position' => $this->input('position') ?? 0,
            'is_featured' => $this->boolean('is_featured'),
            'is_published' => $this->boolean('is_published'),
            'features' => array_values(array_filter(
                (array) $this->input('features', []),
                fn ($v) => is_string($v) && trim($v) !== '',
            )),
        ]);
    }
}

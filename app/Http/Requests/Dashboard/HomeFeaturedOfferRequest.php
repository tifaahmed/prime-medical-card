<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class HomeFeaturedOfferRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'partner' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'discount' => ['nullable', 'string', 'max:50'],
            'expires_text' => ['nullable', 'string', 'max:100'],
            'tag' => ['nullable', 'string', 'max:100'],
            'accent_color' => ['nullable', 'string', 'max:20'],
            'is_published' => ['nullable', 'boolean'],
            'position' => ['nullable', 'integer', 'min:0', 'max:9999'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'position' => $this->input('position') ?? 0,
            'is_published' => $this->boolean('is_published'),
        ]);
    }
}

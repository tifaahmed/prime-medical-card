<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class TestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:500'],
            'quote' => ['required', 'string', 'max:5000'],
            'avatar' => ['nullable', 'string', 'max:10'],
            'is_featured' => ['nullable', 'boolean'],
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
        ]);
    }
}

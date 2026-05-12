<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class AboutValueRequest extends FormRequest
{
    public const ICON_KEYS = ['shield', 'clock', 'chat', 'wallet'];

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'icon_key' => ['required', 'in:'.implode(',', self::ICON_KEYS)],
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

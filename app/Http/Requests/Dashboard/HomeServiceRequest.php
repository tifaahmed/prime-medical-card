<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class HomeServiceRequest extends FormRequest
{
    public const ICON_KEYS = [
        'clinics', 'pharmacy', 'labs', 'imaging', 'dental',
        'optical', 'mental', 'physio',
    ];

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
            'discount' => ['nullable', 'string', 'max:50'],
            'icon_key' => ['required', 'string', 'in:'.implode(',', self::ICON_KEYS)],
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

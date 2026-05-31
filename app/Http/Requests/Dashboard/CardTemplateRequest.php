<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class CardTemplateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'is_default' => ['nullable', 'boolean'],
            'layout' => ['nullable', 'array'],
            'layout.*.top' => ['nullable', 'numeric'],
            'layout.*.left' => ['nullable', 'numeric'],
            'layout.*.fontSize' => ['nullable', 'numeric'],
            'layout.*.width' => ['nullable', 'numeric'],
            'layout.*.height' => ['nullable', 'numeric'],
            'layout.*.rounded' => ['nullable', 'boolean'],
            'front_empty' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'front_example' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'back' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'front_empty_remove' => ['nullable', 'boolean'],
            'front_example_remove' => ['nullable', 'boolean'],
            'back_remove' => ['nullable', 'boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_default' => $this->boolean('is_default'),
            'front_empty_remove' => $this->boolean('front_empty_remove'),
            'front_example_remove' => $this->boolean('front_example_remove'),
            'back_remove' => $this->boolean('back_remove'),
        ]);

        if ($this->has('layout')) {
            $layout = $this->input('layout');
            array_walk_recursive($layout, function (&$v) {
                if ($v === 'true') $v = true;
                elseif ($v === 'false') $v = false;
            });
            $this->merge(['layout' => $layout]);
        }
    }
}

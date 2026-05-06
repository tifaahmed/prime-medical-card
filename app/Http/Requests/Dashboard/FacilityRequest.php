<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class FacilityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name.en' => ['required', 'string', 'max:255'],
            'name.ar' => ['required', 'string', 'max:255'],
            'facility_type_id' => ['required', 'integer', 'exists:facility_types,id'],
            'governorate_id' => ['required', 'integer', 'exists:governorates,id'],
            'phone' => ['nullable', 'string', 'max:50'],
            'logo' => ['nullable', 'image', 'max:4096'],
            'logo_remove' => ['nullable', 'boolean'],

            'branches' => ['nullable', 'array'],
            'branches.*.id' => ['nullable', 'integer'],
            'branches.*._delete' => ['nullable', 'boolean'],
            'branches.*.name.en' => ['nullable', 'string', 'max:255'],
            'branches.*.name.ar' => ['nullable', 'string', 'max:255'],
            'branches.*.address.en' => ['nullable', 'string', 'max:500'],
            'branches.*.address.ar' => ['nullable', 'string', 'max:500'],
            'branches.*.phone' => ['nullable', 'array'],
            'branches.*.phone.*' => ['nullable', 'string', 'max:50'],
            'branches.*.latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'branches.*.longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'branches.*.header' => ['nullable', 'image', 'max:6144'],
            'branches.*.header_remove' => ['nullable', 'boolean'],
            'branches.*.gallery_files' => ['nullable', 'array'],
            'branches.*.gallery_files.*' => ['nullable', 'image', 'max:6144'],
            'branches.*.gallery_remove' => ['nullable', 'array'],
            'branches.*.gallery_remove.*' => ['nullable', 'integer'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $branches = $this->input('branches', []);
        if (! is_array($branches)) {
            return;
        }

        $cleaned = [];
        foreach ($branches as $branch) {
            if (! is_array($branch)) {
                continue;
            }

            $phone = $branch['phone'] ?? [];
            if (is_string($phone)) {
                $phone = array_values(array_filter(array_map('trim', explode(',', $phone))));
            } elseif (is_array($phone)) {
                $phone = array_values(array_filter(array_map(fn ($p) => is_string($p) ? trim($p) : '', $phone)));
            } else {
                $phone = [];
            }

            $branch['phone'] = $phone;
            $cleaned[] = $branch;
        }

        $this->merge(['branches' => $cleaned]);
    }
}

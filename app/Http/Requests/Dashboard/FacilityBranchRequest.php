<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class FacilityBranchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'facility_id' => ['required', 'integer', 'exists:facilities,id'],
            'name.en' => ['nullable', 'string', 'max:255'],
            'name.ar' => ['nullable', 'string', 'max:255'],
            'address.en' => ['nullable', 'string', 'max:500'],
            'address.ar' => ['nullable', 'string', 'max:500'],
            'phone' => ['nullable', 'array'],
            'phone.*' => ['nullable', 'string', 'max:50'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $phone = $this->input('phone');
        if (is_string($phone)) {
            $phones = array_values(array_filter(array_map('trim', explode(',', $phone))));
            $this->merge(['phone' => $phones]);
        }
    }
}

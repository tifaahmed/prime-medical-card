<?php

namespace App\Http\Requests\Dashboard;

use App\Models\Facility;
use App\Models\FacilityBranch;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OfferRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'offerable_type' => ['required', 'string', Rule::in([Facility::class, FacilityBranch::class])],
            'offerable_id' => ['required', 'integer'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'title.ar' => ['required', 'string', 'max:255'],
            'short_description.en' => ['nullable', 'string', 'max:500'],
            'short_description.ar' => ['nullable', 'string', 'max:500'],
            'full_description.en' => ['nullable', 'string'],
            'full_description.ar' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:50'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'old_price' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}

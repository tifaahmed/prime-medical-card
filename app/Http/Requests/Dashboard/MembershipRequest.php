<?php

namespace App\Http\Requests\Dashboard;

use App\Enums\MembershipFamily\RelationshipEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MembershipRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $membershipId = $this->route('membership')?->id;

        return [
            'membership_number' => [
                'required',
                'string',
                'max:255',
                Rule::unique('memberships', 'membership_number')->ignore($membershipId),
            ],
            'first_name' => ['required', 'string', 'max:255'],
            'second_name' => ['nullable', 'string', 'max:255'],
            'third_name' => ['nullable', 'string', 'max:255'],
            'fourth_name' => ['nullable', 'string', 'max:255'],
            'registration_date' => ['required', 'date'],
            'expiration_date' => ['required', 'date', 'after_or_equal:registration_date'],
            'is_active' => ['nullable', 'boolean'],
            'is_visible' => ['nullable', 'boolean'],
            'job_title.en' => ['nullable', 'string', 'max:255'],
            'job_title.ar' => ['nullable', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'mimes:jpeg,png,jpg,gif,webp,avif', 'max:4096'],
            'photo_remove' => ['nullable', 'boolean'],

            'family' => ['nullable', 'array'],
            'family.*.id' => ['nullable', 'integer'],
            'family.*._delete' => ['nullable', 'boolean'],
            'family.*.name' => ['nullable', 'string', 'max:255'],
            'family.*.relationship' => ['nullable', Rule::in(RelationshipEnum::values())],
            'family.*.date_of_birth' => ['nullable', 'date'],
            'family.*.phone' => ['nullable', 'string', 'max:50'],
            'family.*.email' => ['nullable', 'email', 'max:255'],
            'family.*.is_active' => ['nullable', 'boolean'],
            'family.*.photo' => ['nullable', 'mimes:jpeg,png,jpg,gif,webp,avif', 'max:4096'],
            'family.*.photo_remove' => ['nullable', 'boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        foreach (['is_active', 'is_visible', 'photo_remove'] as $key) {
            if ($this->has($key)) {
                $this->merge([$key => filter_var($this->input($key), FILTER_VALIDATE_BOOL)]);
            }
        }

        $family = $this->input('family');
        if (! is_array($family)) {
            return;
        }

        $cleaned = [];
        foreach ($family as $entry) {
            if (! is_array($entry)) {
                continue;
            }

            foreach (['_delete', 'is_active', 'photo_remove'] as $key) {
                if (array_key_exists($key, $entry)) {
                    $entry[$key] = filter_var($entry[$key], FILTER_VALIDATE_BOOL);
                }
            }

            $cleaned[] = $entry;
        }

        $this->merge(['family' => $cleaned]);
    }
}

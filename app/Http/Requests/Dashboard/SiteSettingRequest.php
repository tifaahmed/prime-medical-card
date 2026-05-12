<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class SiteSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'contact_phone' => ['nullable', 'string', 'max:50'],
            'contact_phone_display' => ['nullable', 'string', 'max:100'],
            'contact_whatsapp' => ['nullable', 'string', 'max:50'],
            'contact_email' => ['nullable', 'string', 'email', 'max:255'],
            'contact_address' => ['nullable', 'string', 'max:500'],
            'business_hours' => ['nullable', 'string', 'max:255'],
            'support_hours_note' => ['nullable', 'string', 'max:255'],

            'hotline_number' => ['nullable', 'string', 'max:50'],
            'hotline_caption' => ['nullable', 'string', 'max:255'],

            'map_latitude' => ['nullable', 'string', 'max:50'],
            'map_longitude' => ['nullable', 'string', 'max:50'],

            'facebook_url' => ['nullable', 'string', 'url', 'max:500'],
            'instagram_url' => ['nullable', 'string', 'url', 'max:500'],
            'twitter_url' => ['nullable', 'string', 'url', 'max:500'],
            'youtube_url' => ['nullable', 'string', 'url', 'max:500'],

            'announce_enabled' => ['nullable', 'boolean'],
            'announce_lead' => ['nullable', 'string', 'max:255'],
            'announce_body' => ['nullable', 'string', 'max:500'],
            'announce_tail' => ['nullable', 'string', 'max:255'],

            'stat1_value' => ['nullable', 'string', 'max:50'],
            'stat1_label' => ['nullable', 'string', 'max:150'],
            'stat2_value' => ['nullable', 'string', 'max:50'],
            'stat2_label' => ['nullable', 'string', 'max:150'],
            'stat3_value' => ['nullable', 'string', 'max:50'],
            'stat3_label' => ['nullable', 'string', 'max:150'],

            'footer_description' => ['nullable', 'string', 'max:2000'],
            'copyright_text' => ['nullable', 'string', 'max:255'],
            'made_in_text' => ['nullable', 'string', 'max:100'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'announce_enabled' => $this->boolean('announce_enabled'),
        ]);
    }
}

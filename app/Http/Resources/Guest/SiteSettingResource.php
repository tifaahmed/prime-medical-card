<?php

namespace App\Http\Resources\Guest;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SiteSettingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'contact_phone' => $this->contact_phone,
            'contact_phone_display' => $this->contact_phone_display,
            'contact_whatsapp' => $this->contact_whatsapp,
            'contact_email' => $this->contact_email,
            'contact_address' => $this->contact_address,
            'business_hours' => $this->business_hours,
            'support_hours_note' => $this->support_hours_note,
            'hotline_number' => $this->hotline_number,
            'hotline_caption' => $this->hotline_caption,
            'map_latitude' => $this->map_latitude,
            'map_longitude' => $this->map_longitude,
            'facebook_url' => $this->facebook_url,
            'instagram_url' => $this->instagram_url,
            'twitter_url' => $this->twitter_url,
            'youtube_url' => $this->youtube_url,
            'announce_enabled' => (bool) $this->announce_enabled,
            'announce_lead' => $this->announce_lead,
            'announce_body' => $this->announce_body,
            'announce_tail' => $this->announce_tail,
            'hero_stats' => [
                ['value' => $this->stat1_value, 'label' => $this->stat1_label],
                ['value' => $this->stat2_value, 'label' => $this->stat2_label],
                ['value' => $this->stat3_value, 'label' => $this->stat3_label],
            ],
            'footer_description' => $this->footer_description,
            'copyright_text' => $this->copyright_text,
            'made_in_text' => $this->made_in_text,
        ];
    }
}

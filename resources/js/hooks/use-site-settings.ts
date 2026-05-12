import { usePage } from '@inertiajs/react';

export type HeroStat = {
    value: string | null;
    label: string | null;
};

export type SiteSettings = {
    contact_phone: string | null;
    contact_phone_display: string | null;
    contact_whatsapp: string | null;
    contact_email: string | null;
    contact_address: string | null;
    business_hours: string | null;
    support_hours_note: string | null;
    hotline_number: string | null;
    hotline_caption: string | null;
    map_latitude: string | null;
    map_longitude: string | null;
    facebook_url: string | null;
    instagram_url: string | null;
    twitter_url: string | null;
    youtube_url: string | null;
    announce_enabled: boolean;
    announce_lead: string | null;
    announce_body: string | null;
    announce_tail: string | null;
    hero_stats: HeroStat[];
    footer_description: string | null;
    copyright_text: string | null;
    made_in_text: string | null;
};

export function useSiteSettings(): SiteSettings {
    const page = usePage<{ siteSettings?: SiteSettings }>();
    return (
        page.props.siteSettings ?? {
            contact_phone: null,
            contact_phone_display: null,
            contact_whatsapp: null,
            contact_email: null,
            contact_address: null,
            business_hours: null,
            support_hours_note: null,
            hotline_number: null,
            hotline_caption: null,
            map_latitude: null,
            map_longitude: null,
            facebook_url: null,
            instagram_url: null,
            twitter_url: null,
            youtube_url: null,
            announce_enabled: true,
            announce_lead: null,
            announce_body: null,
            announce_tail: null,
            hero_stats: [],
            footer_description: null,
            copyright_text: null,
            made_in_text: null,
        }
    );
}

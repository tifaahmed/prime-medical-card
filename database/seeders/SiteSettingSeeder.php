<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        SiteSetting::updateOrCreate(['id' => 1], [
            'contact_phone' => '+201234567890',
            'contact_phone_display' => '+20 123 456 7890',
            'contact_whatsapp' => '201234567890',
            'contact_email' => 'info@primemedicalcard.com',
            'contact_address' => 'القاهرة، جمهورية مصر العربية',
            'business_hours' => 'السبت – الخميس، ٩ صباحاً – ٦ مساءً',
            'support_hours_note' => 'خط ساخن للأعضاء على مدار الأسبوع',

            'hotline_number' => '16 777',
            'hotline_caption' => '٢٤ ساعة يومياً — مكالمة مجانية',

            'map_latitude' => '30.0444',
            'map_longitude' => '31.2357',

            'facebook_url' => null,
            'instagram_url' => null,
            'twitter_url' => null,
            'youtube_url' => null,

            'announce_enabled' => true,
            'announce_lead' => '🎉 عرض حصري',
            'announce_body' => 'اشترك الآن واحصل على شهرين مجاناً مع الباقة العائلية',
            'announce_tail' => 'ينتهي العرض خلال ٣ أيام',

            'stat1_value' => '+١٢٠ ألف',
            'stat1_label' => 'عضو نشط',
            'stat2_value' => '+٣٠٠٠',
            'stat2_label' => 'جهة طبية معتمدة',
            'stat3_value' => '٤.٩/٥',
            'stat3_label' => 'تقييم الأعضاء',

            'footer_description' => 'بطاقة الخصومات الطبية الأولى في مصر. نعمل منذ ٢٠٢٠ على جعل الرعاية الصحية في متناول كل أسرة مصرية من خلال شبكة تضم أكبر الجهات الطبية المعتمدة.',
            'copyright_text' => '© ٢٠٢٦ برايم ميديكال كارد. جميع الحقوق محفوظة.',
            'made_in_text' => 'صُنع بـ ♥ في مصر',
        ]);
    }
}

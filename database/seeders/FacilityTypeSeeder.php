<?php

namespace Database\Seeders;

use App\Models\FacilityType;
use Illuminate\Database\Seeder;

class FacilityTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['slug' => 'clinics', 'en' => 'Clinics & Hospitals', 'ar' => 'العيادات والمستشفيات'],
            ['slug' => 'pharmacy', 'en' => 'Pharmacies', 'ar' => 'الصيدليات'],
            ['slug' => 'labs', 'en' => 'Laboratories', 'ar' => 'معامل التحاليل'],
            ['slug' => 'radiology', 'en' => 'Radiology & Imaging', 'ar' => 'الأشعة والتصوير'],
            ['slug' => 'dental', 'en' => 'Dental', 'ar' => 'الأسنان'],
            ['slug' => 'optics', 'en' => 'Optics', 'ar' => 'البصريات'],
            ['slug' => 'mental', 'en' => 'Mental Health', 'ar' => 'الصحة النفسية'],
            ['slug' => 'physio', 'en' => 'Physiotherapy', 'ar' => 'العلاج الطبيعي'],
            ['slug' => 'maternity', 'en' => 'Maternity & OB-GYN', 'ar' => 'النساء والتوليد'],
            ['slug' => 'pediatrics', 'en' => 'Pediatrics', 'ar' => 'طب الأطفال'],
            ['slug' => 'cardiology', 'en' => 'Cardiology', 'ar' => 'القلب والأوعية'],
            ['slug' => 'dermatology', 'en' => 'Dermatology', 'ar' => 'الجلدية'],
            ['slug' => 'orthopedics', 'en' => 'Orthopedics', 'ar' => 'العظام'],
            ['slug' => 'ent', 'en' => 'ENT', 'ar' => 'الأنف والأذن والحنجرة'],
            ['slug' => 'ophthalmology', 'en' => 'Ophthalmology', 'ar' => 'طب وجراحة العيون'],
            ['slug' => 'nutrition', 'en' => 'Nutrition & Dietetics', 'ar' => 'التغذية العلاجية'],
            ['slug' => 'home-care', 'en' => 'Home Care', 'ar' => 'الرعاية المنزلية'],
            ['slug' => 'emergency', 'en' => 'Emergency Care', 'ar' => 'الطوارئ'],
        ];

        foreach ($types as $type) {
            FacilityType::firstOrCreate(
                ['slug' => $type['slug']],
                ['name' => ['en' => $type['en'], 'ar' => $type['ar']]],
            );
        }
    }
}

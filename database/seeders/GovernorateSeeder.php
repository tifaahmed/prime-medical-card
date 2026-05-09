<?php

namespace Database\Seeders;

use App\Models\Governorate;
use Illuminate\Database\Seeder;

class GovernorateSeeder extends Seeder
{
    public function run(): void
    {
        $governorates = [
            ['en' => 'Cairo', 'ar' => 'القاهرة'],
            ['en' => 'Giza', 'ar' => 'الجيزة'],
            ['en' => 'Alexandria', 'ar' => 'الإسكندرية'],
            ['en' => 'Qalyubia', 'ar' => 'القليوبية'],
            ['en' => 'Sharqia', 'ar' => 'الشرقية'],
            ['en' => 'Dakahlia', 'ar' => 'الدقهلية'],
            ['en' => 'Beheira', 'ar' => 'البحيرة'],
            ['en' => 'Minya', 'ar' => 'المنيا'],
            ['en' => 'Sohag', 'ar' => 'سوهاج'],
            ['en' => 'Asyut', 'ar' => 'أسيوط'],
            ['en' => 'Monufia', 'ar' => 'المنوفية'],
            ['en' => 'Gharbia', 'ar' => 'الغربية'],
            ['en' => 'Kafr El Sheikh', 'ar' => 'كفر الشيخ'],
            ['en' => 'Faiyum', 'ar' => 'الفيوم'],
            ['en' => 'Beni Suef', 'ar' => 'بني سويف'],
            ['en' => 'Qena', 'ar' => 'قنا'],
            ['en' => 'Aswan', 'ar' => 'أسوان'],
            ['en' => 'Luxor', 'ar' => 'الأقصر'],
            ['en' => 'Damietta', 'ar' => 'دمياط'],
            ['en' => 'Ismailia', 'ar' => 'الإسماعيلية'],
            ['en' => 'Port Said', 'ar' => 'بورسعيد'],
            ['en' => 'Suez', 'ar' => 'السويس'],
            ['en' => 'North Sinai', 'ar' => 'شمال سيناء'],
            ['en' => 'South Sinai', 'ar' => 'جنوب سيناء'],
            ['en' => 'Red Sea', 'ar' => 'البحر الأحمر'],
            ['en' => 'New Valley', 'ar' => 'الوادي الجديد'],
            ['en' => 'Matrouh', 'ar' => 'مطروح'],
        ];

        foreach ($governorates as $gov) {
            Governorate::firstOrCreate(
                ['slug' => str($gov['en'])->slug()->toString()],
                ['name' => $gov],
            );
        }
    }
}

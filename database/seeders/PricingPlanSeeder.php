<?php

namespace Database\Seeders;

use App\Models\PricingPlan;
use Illuminate\Database\Seeder;

class PricingPlanSeeder extends Seeder
{
    public function run(): void
    {
        if (PricingPlan::query()->exists()) {
            return;
        }

        $items = [
            [
                'name' => 'الباقة الفردية',
                'description' => 'مثالية للأفراد الذين يبحثون عن تغطية شاملة',
                'price' => '٢٩٩',
                'period' => 'سنوياً / لشخص واحد',
                'features' => [
                    'خصومات على جميع الخدمات الطبية',
                    'الوصول إلى +٣٠٠٠ جهة طبية',
                    'بطاقة رقمية على التطبيق',
                    'دعم فني ٧ أيام في الأسبوع',
                ],
                'badge' => null,
                'is_featured' => false,
                'cta_label' => 'اشترك الآن',
                'cta_variant' => 'ghost',
            ],
            [
                'name' => 'الباقة العائلية',
                'description' => 'لك ولأفراد عائلتك حتى ٥ أشخاص',
                'price' => '٥٩٩',
                'period' => 'سنوياً / للعائلة كاملة',
                'features' => [
                    'كل مميزات الباقة الفردية',
                    'تغطية حتى ٥ أفراد من الأسرة',
                    'بطاقة لكل فرد من العائلة',
                    'خصومات إضافية ١٠٪ على الأطفال',
                    'استشارات طبية مجانية عن بُعد',
                ],
                'badge' => 'الأكثر شعبية',
                'is_featured' => true,
                'cta_label' => 'اشترك الآن',
                'cta_variant' => 'amber',
            ],
            [
                'name' => 'الباقة المميزة',
                'description' => 'تجربة VIP مع خصومات حصرية وخدمات إضافية',
                'price' => '٩٩٩',
                'period' => 'سنوياً / للعائلة كاملة',
                'features' => [
                    'كل مميزات الباقة العائلية',
                    'تغطية حتى ٨ أفراد',
                    'خصومات VIP حتى ٧٠٪',
                    'حجز موعد مع طبيبك بأولوية',
                    'مدير حساب شخصي',
                ],
                'badge' => null,
                'is_featured' => false,
                'cta_label' => 'اشترك الآن',
                'cta_variant' => 'primary',
            ],
        ];

        foreach ($items as $i => $data) {
            PricingPlan::create([
                ...$data,
                'position' => $i,
                'is_published' => true,
            ]);
        }
    }
}

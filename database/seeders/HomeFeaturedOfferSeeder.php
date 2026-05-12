<?php

namespace Database\Seeders;

use App\Models\HomeFeaturedOffer;
use Illuminate\Database\Seeder;

class HomeFeaturedOfferSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeFeaturedOffer::query()->exists()) {
            return;
        }

        $items = [
            ['title' => 'فحص شامل للقلب', 'partner' => 'مستشفى السلام الدولي', 'description' => 'باقة فحوصات قلب كاملة تشمل تخطيط القلب وأشعة الإيكو وتحاليل الدم.', 'discount' => '٦٥٪', 'expires_text' => 'حتى ٣٠ مايو', 'tag' => 'الأكثر طلباً', 'accent_color' => '#0b2e2c'],
            ['title' => 'تنظيف وتلميع الأسنان', 'partner' => 'مراكز سمايل لطب الأسنان', 'description' => 'جلسة تنظيف وتلميع كاملة مع فحص مجاني للأسنان والفم لجميع أفراد العائلة.', 'discount' => '٧٠٪', 'expires_text' => 'لفترة محدودة', 'tag' => 'حصري', 'accent_color' => '#236b64'],
            ['title' => 'باقة تحاليل دورية', 'partner' => 'معامل البرج', 'description' => 'صورة دم كاملة، وظائف الكبد والكلى، والسكر التراكمي مع سحب عينة منزلي مجاناً.', 'discount' => '٥٥٪', 'expires_text' => 'حتى نهاية الشهر', 'tag' => 'جديد', 'accent_color' => '#d68228'],
            ['title' => 'استشارة جلدية أونلاين', 'partner' => 'عيادات ديرما كير', 'description' => 'استشارة طبية مع أخصائي جلدية عبر الفيديو خلال ٣٠ دقيقة من الحجز.', 'discount' => '٥٠٪', 'expires_text' => 'متاح يومياً', 'tag' => 'سريع', 'accent_color' => '#1a544f'],
        ];

        foreach ($items as $i => $data) {
            HomeFeaturedOffer::create([...$data, 'position' => $i, 'is_published' => true]);
        }
    }
}

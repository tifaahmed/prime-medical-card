<?php

namespace Database\Seeders;

use App\Models\AboutStat;
use App\Models\AboutTimelineEntry;
use App\Models\AboutValue;
use Illuminate\Database\Seeder;

class AboutContentSeeder extends Seeder
{
    public function run(): void
    {
        if (! AboutStat::query()->exists()) {
            $stats = [
                ['value' => '٢٠٢٠', 'label' => 'تأسست الشركة'],
                ['value' => '+٣٠٠٠', 'label' => 'شريك طبي معتمد'],
                ['value' => '+٢٥٠ ألف', 'label' => 'عضو مسجّل'],
                ['value' => '+٢٧', 'label' => 'محافظة مغطاة'],
            ];
            foreach ($stats as $i => $data) {
                AboutStat::create([...$data, 'position' => $i, 'is_published' => true]);
            }
        }

        if (! AboutValue::query()->exists()) {
            $values = [
                ['title' => 'الجودة الطبية', 'description' => 'نتعامل فقط مع جهات طبية معتمدة وذات سمعة موثوقة لضمان أفضل تجربة لأعضائنا.', 'icon_key' => 'shield'],
                ['title' => 'الشفافية', 'description' => 'نعرض الخصومات والشروط بوضوح، بدون رسوم خفية أو مفاجآت في الفاتورة.', 'icon_key' => 'clock'],
                ['title' => 'في خدمتك دائماً', 'description' => 'فريق دعم متاح طوال الأسبوع للرد على استفساراتك ومساعدتك في الحجوزات.', 'icon_key' => 'chat'],
                ['title' => 'سعر يناسب الجميع', 'description' => 'باقات بأسعار اقتصادية تتيح لكل أسرة مصرية الوصول إلى رعاية صحية أفضل.', 'icon_key' => 'wallet'],
            ];
            foreach ($values as $i => $data) {
                AboutValue::create([...$data, 'position' => $i, 'is_published' => true]);
            }
        }

        if (! AboutTimelineEntry::query()->exists()) {
            $timeline = [
                ['year' => '٢٠٢٠', 'title' => 'انطلاق الفكرة', 'description' => 'بدأ المؤسسون رحلتهم برؤية لتقديم رعاية صحية ميسّرة لكل أسرة.'],
                ['year' => '٢٠٢١', 'title' => 'أول ١٠٠ شريك', 'description' => 'وصلنا لأول ١٠٠ شريك طبي وبدأنا تقديم الخدمة في القاهرة الكبرى.'],
                ['year' => '٢٠٢٣', 'title' => 'توسع وطني', 'description' => 'تغطية كاملة لجميع المحافظات المصرية وتجاوز ١٠٠٠ شريك معتمد.'],
                ['year' => '٢٠٢٦', 'title' => 'منصة متكاملة', 'description' => 'إطلاق المنصة الرقمية ونسخة جديدة من البطاقة وعروض حصرية للأعضاء.'],
            ];
            foreach ($timeline as $i => $data) {
                AboutTimelineEntry::create([...$data, 'position' => $i, 'is_published' => true]);
            }
        }
    }
}

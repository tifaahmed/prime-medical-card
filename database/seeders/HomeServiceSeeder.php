<?php

namespace Database\Seeders;

use App\Models\HomeService;
use Illuminate\Database\Seeder;

class HomeServiceSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeService::query()->exists()) {
            return;
        }

        $items = [
            ['title' => 'العيادات والمستشفيات', 'description' => 'كشف طبي وعمليات وإقامة في أفضل المستشفيات والعيادات التخصصية', 'discount' => 'حتى ٦٠٪ خصم', 'icon_key' => 'clinics'],
            ['title' => 'الصيدليات', 'description' => 'خصومات على الأدوية والمستلزمات الطبية في أكبر شبكات الصيدليات', 'discount' => 'حتى ٤٠٪ خصم', 'icon_key' => 'pharmacy'],
            ['title' => 'معامل التحاليل', 'description' => 'جميع أنواع التحاليل الطبية والفحوصات المخبرية بأسعار مخفضة', 'discount' => 'حتى ٥٠٪ خصم', 'icon_key' => 'labs'],
            ['title' => 'الأشعة والتصوير', 'description' => 'أشعة عادية ومقطعية ورنين مغناطيسي وسونار في أحدث المراكز', 'discount' => 'حتى ٥٥٪ خصم', 'icon_key' => 'imaging'],
            ['title' => 'الأسنان', 'description' => 'تنظيف وحشو وزراعة وتقويم في أفضل مراكز الأسنان المتخصصة', 'discount' => 'حتى ٧٠٪ خصم', 'icon_key' => 'dental'],
            ['title' => 'البصريات', 'description' => 'فحص نظر ونظارات وعدسات لاصقة وعمليات تصحيح الإبصار', 'discount' => 'حتى ٤٥٪ خصم', 'icon_key' => 'optical'],
            ['title' => 'الصحة النفسية', 'description' => 'جلسات علاج نفسي واستشارات مع أفضل الأطباء والمعالجين', 'discount' => 'حتى ٤٠٪ خصم', 'icon_key' => 'mental'],
            ['title' => 'العلاج الطبيعي', 'description' => 'جلسات علاج طبيعي وإعادة تأهيل في أحدث المراكز المتخصصة', 'discount' => 'حتى ٥٠٪ خصم', 'icon_key' => 'physio'],
        ];

        foreach ($items as $i => $data) {
            HomeService::create([...$data, 'position' => $i, 'is_published' => true]);
        }
    }
}

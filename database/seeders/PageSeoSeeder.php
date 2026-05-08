<?php

namespace Database\Seeders;

use App\Models\PageSeo;
use Illuminate\Database\Seeder;

class PageSeoSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            [
                'page_key' => 'home',
                'title' => [
                    'en' => 'Prime Medical Card — The Leading Medical Discount Card',
                    'ar' => 'برايم ميديكال كارد — بطاقة الخصومات الطبية الأولى',
                ],
                'description' => [
                    'en' => 'Get up to 70% off across more than 3,000 clinics, pharmacies, and labs. One card for the whole family across every governorate in Egypt.',
                    'ar' => 'احصل على خصومات تصل إلى 70% في أكثر من 3000 عيادة وصيدلية ومعمل تحاليل. بطاقة واحدة لكل العائلة في كل محافظات مصر.',
                ],
                'keywords' => [
                    'برايم ميديكال كارد',
                    'بطاقة طبية',
                    'خصومات طبية',
                    'تأمين طبي',
                    'صيدليات',
                ],
            ],
            [
                'page_key' => 'about',
                'title' => [
                    'en' => 'About Us — Prime Medical Card',
                    'ar' => 'من نحن — برايم ميديكال كارد',
                ],
                'description' => [
                    'en' => 'Learn about Prime Medical Card, our mission, and our network of medical partners across Egypt.',
                    'ar' => 'تعرف على برايم ميديكال كارد، رسالتنا، وشبكتنا من الشركاء الطبيين في كل أنحاء مصر.',
                ],
                'keywords' => [],
            ],
            [
                'page_key' => 'partners',
                'title' => [
                    'en' => 'Our Partners — Prime Medical Card',
                    'ar' => 'شركاؤنا — برايم ميديكال كارد',
                ],
                'description' => [
                    'en' => 'Browse our network of clinics, hospitals, pharmacies, labs, and more — all offering exclusive discounts to cardholders.',
                    'ar' => 'تصفح شبكتنا من العيادات والمستشفيات والصيدليات والمعامل وغيرها — جميعها تقدم خصومات حصرية لحاملي البطاقة.',
                ],
                'keywords' => [],
            ],
            [
                'page_key' => 'contact',
                'title' => [
                    'en' => 'Contact Us — Prime Medical Card',
                    'ar' => 'تواصل معنا — برايم ميديكال كارد',
                ],
                'description' => [
                    'en' => 'Get in touch with the Prime Medical Card team for support, partnership inquiries, or any questions.',
                    'ar' => 'تواصل مع فريق برايم ميديكال كارد للدعم أو الاستفسارات أو الشراكات.',
                ],
                'keywords' => [],
            ],
        ];

        foreach ($rows as $row) {
            PageSeo::updateOrCreate(
                ['page_key' => $row['page_key']],
                $row,
            );
        }
    }
}

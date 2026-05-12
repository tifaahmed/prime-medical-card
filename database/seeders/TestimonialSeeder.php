<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        if (Testimonial::query()->exists()) {
            return;
        }

        $items = [
            [
                'is_featured' => true,
                'avatar' => 'أم',
                'quote' => 'اشتركت في الباقة العائلية من سنتين والصراحة ما ندمتش. وفرت على عائلتي آلاف الجنيهات في العلاج والتحاليل والأدوية. خصوصاً لما بنتي محتاجة كشف أسنان، الخصم كان هائل. أفضل استثمار ممكن تعمله لصحة أسرتك.',
                'name' => 'أحمد مصطفى',
                'role' => 'القاهرة الجديدة — عضو منذ ٢٠٢٣',
            ],
            [
                'avatar' => 'فس',
                'quote' => 'التطبيق سهل جداً وشبكة الأطباء ضخمة. في أي مكان بروح البطاقة مقبولة بدون مشاكل. الخصومات حقيقية مش زي شركات تانية.',
                'name' => 'فاطمة السيد',
                'role' => 'الجيزة',
            ],
            [
                'avatar' => 'مع',
                'quote' => 'كعائلة فيها ٤ أطفال، الباقة العائلية غيرت حياتنا. الصيدلية عند البيت بيقبلوها والتحاليل بنص التمن. الدعم الفني محترم جداً.',
                'name' => 'محمد عبدالله',
                'role' => 'الإسكندرية',
            ],
        ];

        foreach ($items as $i => $data) {
            Testimonial::create([
                ...$data,
                'is_featured' => $data['is_featured'] ?? false,
                'position' => $i,
                'is_published' => true,
            ]);
        }
    }
}

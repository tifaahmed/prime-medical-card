<?php

namespace Database\Seeders;

use App\Models\HomeStep;
use Illuminate\Database\Seeder;

class HomeStepSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeStep::query()->exists()) {
            return;
        }

        $items = [
            ['title' => 'اختر باقتك', 'description' => 'فردية أو عائلية أو مميزة — اختر ما يناسب احتياجك واشترك في دقائق من موقعنا', 'icon_key' => 'user'],
            ['title' => 'استلم بطاقتك', 'description' => 'بطاقة رقمية فوراً على هاتفك، وبطاقة فعلية تصلك خلال ٤٨ ساعة أينما كنت', 'icon_key' => 'card'],
            ['title' => 'استمتع بالخصم', 'description' => 'اعرض بطاقتك في أي جهة من شبكتنا واحصل على خصم فوري يصل إلى ٧٠٪ على كل الخدمات', 'icon_key' => 'heart'],
        ];

        foreach ($items as $i => $data) {
            HomeStep::create([...$data, 'position' => $i, 'is_published' => true]);
        }
    }
}

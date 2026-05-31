<?php

namespace Database\Seeders;

use App\Models\CardTemplate;
use Illuminate\Database\Seeder;

class CardTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $layout = [
            'first_name' => ['top' => 32, 'left' => 8, 'fontSize' => 4.5],
            'full_name' => ['top' => 41, 'left' => 8, 'fontSize' => 2.6],
            'work_place' => ['top' => 50.17, 'left' => 24.07, 'fontSize' => 2.2],
            'company' => ['top' => 60, 'left' => 8, 'fontSize' => 2.4],
            'date' => ['top' => 77, 'left' => 11, 'fontSize' => 2.8],
            'membership_number' => ['top' => 85, 'left' => 11, 'fontSize' => 2.0],
            'photo' => ['top' => 22, 'left' => 74.2, 'width' => 18.4, 'height' => 36.5],
            'qr' => ['top' => 70.74, 'left' => 76.68, 'width' => 13.22, 'height' => 19.58],
        ];

        $card1 = CardTemplate::create([
            'name' => 'البطاقة الأساسية',
            'layout' => $layout,
            'is_default' => true,
        ]);

        if (file_exists(public_path('images/card/front-empty.jpeg'))) {
            $card1->addMedia(public_path('images/card/front-empty.jpeg'))
                ->preservingOriginal()->toMediaCollection('front_empty');
        }
        if (file_exists(public_path('images/card/front-example.jpeg'))) {
            $card1->addMedia(public_path('images/card/front-example.jpeg'))
                ->preservingOriginal()->toMediaCollection('front_example');
        }
        if (file_exists(public_path('images/card/back.jpeg'))) {
            $card1->addMedia(public_path('images/card/back.jpeg'))
                ->preservingOriginal()->toMediaCollection('back');
        }

        $card2 = CardTemplate::create([
            'name' => 'البطاقة الجديدة',
            'layout' => [
                'first_name' => ['top' => 40.012747552925106, 'left' => 53.13677811550152, 'fontSize' => 2.3],
                'full_name' => ['top' => 40.051100424942014, 'left' => 69.06981670811457, 'fontSize' => 2.3],
                'work_place' => ['top' => 49.35219819400237, 'left' => 54.312700561849496, 'fontSize' => 2.5],
                'company' => ['top' => 59.71250436295459, 'left' => 53.744680851063826, 'fontSize' => 2.5],
                'date' => ['top' => 68.74444191516807, 'left' => 54.161094224924014, 'fontSize' => 2.5],
                'membership_number' => ['top' => 85, 'left' => 54, 'fontSize' => 2.0],
                'photo' => ['top' => 20.735347142616483, 'left' => 2.796757852077002, 'width' => 27, 'height' => 48, 'rounded' => true],
                'qr' => ['top' => 81.48176276571527, 'left' => 88.85279174725984, 'width' => 8.72, 'height' => 14.58],
            ],
            'is_default' => false,
        ]);

        if (file_exists(public_path('images/card-new/front-empty.png'))) {
            $card2->addMedia(public_path('images/card-new/front-empty.png'))
                ->preservingOriginal()->toMediaCollection('front_empty');
        }
        if (file_exists(public_path('images/card-new/front-example.png'))) {
            $card2->addMedia(public_path('images/card-new/front-example.png'))
                ->preservingOriginal()->toMediaCollection('front_example');
        }
        if (file_exists(public_path('images/card-new/back.png'))) {
            $card2->addMedia(public_path('images/card-new/back.png'))
                ->preservingOriginal()->toMediaCollection('back');
        }
    }
}

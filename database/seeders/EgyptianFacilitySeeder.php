<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Facility;
use App\Models\FacilityType;
use App\Models\Governorate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EgyptianFacilitySeeder extends Seeder
{
    /**
     * Seed real-world Egyptian medical facilities with their branches.
     *
     * Governorate / city slugs follow the convention used by
     * GovernorateSeeder + CitySeeder (e.g. "cairo", "cairo-nasr-city").
     */
    public function run(): void
    {
        $facilities = [
            [
                'slug' => 'salam-international',
                'type' => 'clinics',
                'name' => ['en' => 'Salam International Hospital', 'ar' => 'مستشفى السلام الدولي'],
                'phone' => '19885',
                'branches' => [
                    [
                        'gov' => 'giza',
                        'city' => 'mohandessin',
                        'name' => ['en' => 'Mohandessin Branch', 'ar' => 'فرع المهندسين'],
                        'address' => ['en' => 'Corniche El Nil, Mohandessin', 'ar' => 'كورنيش النيل، المهندسين، الجيزة'],
                        'phone' => ['19885', '+20235240077'],
                        'lat' => 30.0626, 'lng' => 31.2098,
                    ],
                    [
                        'gov' => 'cairo',
                        'city' => 'maadi',
                        'name' => ['en' => 'Maadi Branch', 'ar' => 'فرع المعادي'],
                        'address' => ['en' => '3 Misr Helwan El-Zyrae Road, Maadi', 'ar' => '٣ طريق مصر حلوان الزراعي، المعادي'],
                        'phone' => ['+20225240077'],
                        'lat' => 29.9602, 'lng' => 31.2570,
                    ],
                ],
            ],
            [
                'slug' => 'dar-al-fouad',
                'type' => 'clinics',
                'name' => ['en' => 'Dar Al Fouad Hospital', 'ar' => 'مستشفى دار الفؤاد'],
                'phone' => '16259',
                'branches' => [
                    [
                        'gov' => 'giza',
                        'city' => '6th-of-october',
                        'name' => ['en' => '6th of October Branch', 'ar' => 'فرع السادس من أكتوبر'],
                        'address' => ['en' => '26th of July Corridor, 6th of October City', 'ar' => 'محور 26 يوليو، السادس من أكتوبر، الجيزة'],
                        'phone' => ['16259', '+20238356000'],
                        'lat' => 30.0244, 'lng' => 31.0143,
                    ],
                    [
                        'gov' => 'cairo',
                        'city' => 'nasr-city',
                        'name' => ['en' => 'Nasr City Branch', 'ar' => 'فرع مدينة نصر'],
                        'address' => ['en' => 'Mostafa El Nahas St., Nasr City', 'ar' => 'شارع مصطفى النحاس، مدينة نصر'],
                        'phone' => ['16259'],
                        'lat' => 30.0578, 'lng' => 31.3438,
                    ],
                ],
            ],
            [
                'slug' => 'cleopatra-hospital',
                'type' => 'clinics',
                'name' => ['en' => 'Cleopatra Hospital', 'ar' => 'مستشفى كليوباترا'],
                'phone' => '16660',
                'branches' => [
                    [
                        'gov' => 'cairo',
                        'city' => 'heliopolis',
                        'name' => ['en' => 'Heliopolis Branch', 'ar' => 'فرع مصر الجديدة'],
                        'address' => ['en' => '39 Cleopatra St., Heliopolis', 'ar' => '٣٩ شارع كليوباترا، مصر الجديدة'],
                        'phone' => ['16660', '+20224144500'],
                        'lat' => 30.0986, 'lng' => 31.3373,
                    ],
                    [
                        'gov' => 'cairo',
                        'city' => 'new-cairo',
                        'name' => ['en' => 'New Cairo Branch', 'ar' => 'فرع التجمع الخامس'],
                        'address' => ['en' => '90th Street, Fifth Settlement, New Cairo', 'ar' => 'التسعين الشمالي، التجمع الخامس، القاهرة الجديدة'],
                        'phone' => ['16660'],
                        'lat' => 30.0244, 'lng' => 31.4906,
                    ],
                ],
            ],
            [
                'slug' => 'andalusia-hospital',
                'type' => 'clinics',
                'name' => ['en' => 'Andalusia Hospital', 'ar' => 'مستشفى الأندلسية'],
                'phone' => '19550',
                'branches' => [
                    [
                        'gov' => 'alexandria',
                        'city' => 'smouha',
                        'name' => ['en' => 'Smouha Branch', 'ar' => 'فرع سموحة'],
                        'address' => ['en' => 'Victor Emanuel Square, Smouha', 'ar' => 'ميدان فيكتور عمانويل، سموحة، الإسكندرية'],
                        'phone' => ['19550'],
                        'lat' => 31.2167, 'lng' => 29.9510,
                    ],
                ],
            ],
            [
                'slug' => 'el-ezaby-pharmacy',
                'type' => 'pharmacy',
                'name' => ['en' => 'El Ezaby Pharmacy', 'ar' => 'صيدلية العزبي'],
                'phone' => '19600',
                'branches' => [
                    [
                        'gov' => 'cairo',
                        'city' => 'nasr-city',
                        'name' => ['en' => 'Makram Ebeid', 'ar' => 'فرع مكرم عبيد'],
                        'address' => ['en' => '23 Makram Ebeid St., Nasr City', 'ar' => '٢٣ شارع مكرم عبيد، مدينة نصر'],
                        'phone' => ['19600'],
                        'lat' => 30.0594, 'lng' => 31.3410,
                    ],
                    [
                        'gov' => 'cairo',
                        'city' => 'maadi',
                        'name' => ['en' => 'Maadi Branch', 'ar' => 'فرع المعادي'],
                        'address' => ['en' => 'Road 9, Maadi', 'ar' => 'شارع ٩، المعادي'],
                        'phone' => ['19600'],
                        'lat' => 29.9627, 'lng' => 31.2562,
                    ],
                    [
                        'gov' => 'cairo',
                        'city' => 'heliopolis',
                        'name' => ['en' => 'El Merghany', 'ar' => 'فرع الميرغني'],
                        'address' => ['en' => 'El Merghany St., Heliopolis', 'ar' => 'شارع الميرغني، مصر الجديدة'],
                        'phone' => ['19600'],
                        'lat' => 30.0900, 'lng' => 31.3220,
                    ],
                    [
                        'gov' => 'giza',
                        'city' => 'dokki',
                        'name' => ['en' => 'Dokki Branch', 'ar' => 'فرع الدقي'],
                        'address' => ['en' => 'Tahrir St., Dokki', 'ar' => 'شارع التحرير، الدقي'],
                        'phone' => ['19600'],
                        'lat' => 30.0395, 'lng' => 31.2123,
                    ],
                    [
                        'gov' => 'alexandria',
                        'city' => 'sidi-gaber',
                        'name' => ['en' => 'Sidi Gaber Branch', 'ar' => 'فرع سيدي جابر'],
                        'address' => ['en' => 'Port Said St., Sidi Gaber', 'ar' => 'شارع بورسعيد، سيدي جابر، الإسكندرية'],
                        'phone' => ['19600'],
                        'lat' => 31.2143, 'lng' => 29.9495,
                    ],
                ],
            ],
            [
                'slug' => 'seif-pharmacy',
                'type' => 'pharmacy',
                'name' => ['en' => 'Seif Pharmacy', 'ar' => 'صيدلية سيف'],
                'phone' => '19199',
                'branches' => [
                    [
                        'gov' => 'giza',
                        'city' => 'mohandessin',
                        'name' => ['en' => 'Mohandessin Branch', 'ar' => 'فرع المهندسين'],
                        'address' => ['en' => 'Shehab St., Mohandessin', 'ar' => 'شارع شهاب، المهندسين'],
                        'phone' => ['19199'],
                        'lat' => 30.0566, 'lng' => 31.2002,
                    ],
                    [
                        'gov' => 'giza',
                        'city' => 'haram',
                        'name' => ['en' => 'Haram Branch', 'ar' => 'فرع الهرم'],
                        'address' => ['en' => 'Al Haram St., Giza', 'ar' => 'شارع الهرم، الجيزة'],
                        'phone' => ['19199'],
                        'lat' => 29.9933, 'lng' => 31.1456,
                    ],
                    [
                        'gov' => 'cairo',
                        'city' => 'shubra',
                        'name' => ['en' => 'Shubra Branch', 'ar' => 'فرع شبرا'],
                        'address' => ['en' => 'Shubra St., Cairo', 'ar' => 'شارع شبرا، القاهرة'],
                        'phone' => ['19199'],
                        'lat' => 30.0900, 'lng' => 31.2440,
                    ],
                    [
                        'gov' => 'gharbia',
                        'city' => 'tanta',
                        'name' => ['en' => 'Tanta Branch', 'ar' => 'فرع طنطا'],
                        'address' => ['en' => 'El Bahr St., Tanta', 'ar' => 'شارع البحر، طنطا'],
                        'phone' => ['19199'],
                        'lat' => 30.7865, 'lng' => 31.0010,
                    ],
                ],
            ],
            [
                'slug' => 'al-borg-labs',
                'type' => 'labs',
                'name' => ['en' => 'Al Borg Laboratories', 'ar' => 'معامل البرج'],
                'phone' => '19911',
                'branches' => [
                    [
                        'gov' => 'giza',
                        'city' => 'mohandessin',
                        'name' => ['en' => 'Mohandessin Branch', 'ar' => 'فرع المهندسين'],
                        'address' => ['en' => 'Arab League St., Mohandessin', 'ar' => 'شارع جامعة الدول العربية، المهندسين'],
                        'phone' => ['19911'],
                        'lat' => 30.0578, 'lng' => 31.2027,
                    ],
                    [
                        'gov' => 'cairo',
                        'city' => 'heliopolis',
                        'name' => ['en' => 'Heliopolis Branch', 'ar' => 'فرع مصر الجديدة'],
                        'address' => ['en' => 'El Hegaz St., Heliopolis', 'ar' => 'شارع الحجاز، مصر الجديدة'],
                        'phone' => ['19911'],
                        'lat' => 30.0937, 'lng' => 31.3361,
                    ],
                    [
                        'gov' => 'cairo',
                        'city' => 'nasr-city',
                        'name' => ['en' => 'Nasr City Branch', 'ar' => 'فرع مدينة نصر'],
                        'address' => ['en' => 'Abbas El Akkad St., Nasr City', 'ar' => 'شارع عباس العقاد، مدينة نصر'],
                        'phone' => ['19911'],
                        'lat' => 30.0633, 'lng' => 31.3445,
                    ],
                    [
                        'gov' => 'gharbia',
                        'city' => 'tanta',
                        'name' => ['en' => 'Tanta Branch', 'ar' => 'فرع طنطا'],
                        'address' => ['en' => 'El Bahr St., Tanta', 'ar' => 'شارع البحر، طنطا'],
                        'phone' => ['19911'],
                        'lat' => 30.7905, 'lng' => 31.0015,
                    ],
                    [
                        'gov' => 'dakahlia',
                        'city' => 'mansoura',
                        'name' => ['en' => 'Mansoura Branch', 'ar' => 'فرع المنصورة'],
                        'address' => ['en' => 'Gomhoria St., Mansoura', 'ar' => 'شارع الجمهورية، المنصورة'],
                        'phone' => ['19911'],
                        'lat' => 31.0364, 'lng' => 31.3807,
                    ],
                ],
            ],
            [
                'slug' => 'al-mokhtabar',
                'type' => 'labs',
                'name' => ['en' => 'Al Mokhtabar Labs', 'ar' => 'معامل المختبر'],
                'phone' => '19014',
                'branches' => [
                    [
                        'gov' => 'cairo',
                        'city' => 'zamalek',
                        'name' => ['en' => 'Zamalek Branch', 'ar' => 'فرع الزمالك'],
                        'address' => ['en' => '26th of July St., Zamalek', 'ar' => 'شارع 26 يوليو، الزمالك'],
                        'phone' => ['19014'],
                        'lat' => 30.0596, 'lng' => 31.2230,
                    ],
                    [
                        'gov' => 'alexandria',
                        'city' => 'sidi-gaber',
                        'name' => ['en' => 'Sidi Gaber Branch', 'ar' => 'فرع سيدي جابر'],
                        'address' => ['en' => 'Corniche Road, Sidi Gaber', 'ar' => 'طريق الكورنيش، سيدي جابر، الإسكندرية'],
                        'phone' => ['19014'],
                        'lat' => 31.2143, 'lng' => 29.9495,
                    ],
                    [
                        'gov' => 'giza',
                        'city' => 'dokki',
                        'name' => ['en' => 'Dokki Branch', 'ar' => 'فرع الدقي'],
                        'address' => ['en' => 'Wadi El Nil St., Dokki', 'ar' => 'شارع وادي النيل، الدقي'],
                        'phone' => ['19014'],
                        'lat' => 30.0467, 'lng' => 31.2108,
                    ],
                    [
                        'gov' => 'sharqia',
                        'city' => 'zagazig',
                        'name' => ['en' => 'Zagazig Branch', 'ar' => 'فرع الزقازيق'],
                        'address' => ['en' => 'Saad Zaghloul St., Zagazig', 'ar' => 'شارع سعد زغلول، الزقازيق'],
                        'phone' => ['19014'],
                        'lat' => 30.5877, 'lng' => 31.5022,
                    ],
                ],
            ],
            [
                'slug' => 'alfa-labs',
                'type' => 'labs',
                'name' => ['en' => 'Alfa Laboratories', 'ar' => 'معامل ألفا'],
                'phone' => '16191',
                'branches' => [
                    [
                        'gov' => 'cairo',
                        'city' => 'new-cairo',
                        'name' => ['en' => 'Fifth Settlement', 'ar' => 'فرع التجمع الخامس'],
                        'address' => ['en' => 'North 90 St., New Cairo', 'ar' => 'التسعين الشمالي، التجمع الخامس'],
                        'phone' => ['16191'],
                        'lat' => 30.0277, 'lng' => 31.4915,
                    ],
                    [
                        'gov' => 'giza',
                        'city' => 'sheikh-zayed',
                        'name' => ['en' => 'Sheikh Zayed', 'ar' => 'فرع الشيخ زايد'],
                        'address' => ['en' => 'El Tahrir Axis, Sheikh Zayed', 'ar' => 'محور التحرير، الشيخ زايد'],
                        'phone' => ['16191'],
                        'lat' => 30.0750, 'lng' => 30.9750,
                    ],
                    [
                        'gov' => 'beheira',
                        'city' => 'damanhur',
                        'name' => ['en' => 'Damanhur Branch', 'ar' => 'فرع دمنهور'],
                        'address' => ['en' => 'El Gomhoria St., Damanhur', 'ar' => 'شارع الجمهورية، دمنهور'],
                        'phone' => ['16191'],
                        'lat' => 31.0341, 'lng' => 30.4682,
                    ],
                ],
            ],
            [
                'slug' => 'golden-radiology',
                'type' => 'radiology',
                'name' => ['en' => 'Golden Radiology Center', 'ar' => 'مركز الجولدن للأشعة'],
                'phone' => '16662',
                'branches' => [
                    [
                        'gov' => 'cairo',
                        'city' => 'nasr-city',
                        'name' => ['en' => 'Nasr City Branch', 'ar' => 'فرع مدينة نصر'],
                        'address' => ['en' => '78 Abbas El Akkad St., Nasr City', 'ar' => '٧٨ شارع عباس العقاد، مدينة نصر'],
                        'phone' => ['16662'],
                        'lat' => 30.0633, 'lng' => 31.3445,
                    ],
                    [
                        'gov' => 'giza',
                        'city' => 'mohandessin',
                        'name' => ['en' => 'Mohandessin Branch', 'ar' => 'فرع المهندسين'],
                        'address' => ['en' => 'Gameat El Dewal St., Mohandessin', 'ar' => 'شارع جامعة الدول العربية، المهندسين'],
                        'phone' => ['16662'],
                        'lat' => 30.0570, 'lng' => 31.2050,
                    ],
                ],
            ],
            [
                'slug' => 'diagnostic-imaging',
                'type' => 'radiology',
                'name' => ['en' => 'Diagnostic Imaging Center', 'ar' => 'مركز التشخيص بالأشعة'],
                'phone' => '+20223456789',
                'branches' => [
                    [
                        'gov' => 'cairo',
                        'city' => 'maadi',
                        'name' => ['en' => 'Maadi Branch', 'ar' => 'فرع المعادي'],
                        'address' => ['en' => 'Road 9, Maadi', 'ar' => 'شارع ٩، المعادي'],
                        'phone' => ['+20223456789'],
                        'lat' => 29.9620, 'lng' => 31.2580,
                    ],
                    [
                        'gov' => 'gharbia',
                        'city' => 'el-mahalla-el-kubra',
                        'name' => ['en' => 'Mahalla Branch', 'ar' => 'فرع المحلة'],
                        'address' => ['en' => 'El Bahr St., El Mahalla El Kubra', 'ar' => 'شارع البحر، المحلة الكبرى'],
                        'phone' => ['+20402244000'],
                        'lat' => 30.9691, 'lng' => 31.1640,
                    ],
                ],
            ],
            [
                'slug' => 'smile-dental',
                'type' => 'dental',
                'name' => ['en' => 'Smile Dental Center', 'ar' => 'مركز سمايل لطب الأسنان'],
                'phone' => '+20237600000',
                'branches' => [
                    [
                        'gov' => 'giza',
                        'city' => 'dokki',
                        'name' => ['en' => 'Dokki Branch', 'ar' => 'فرع الدقي'],
                        'address' => ['en' => '5 Wadi El Nil St., Dokki', 'ar' => '٥ شارع وادي النيل، الدقي'],
                        'phone' => ['+20237600000'],
                        'lat' => 30.0467, 'lng' => 31.2108,
                    ],
                    [
                        'gov' => 'cairo',
                        'city' => 'maadi',
                        'name' => ['en' => 'Maadi Branch', 'ar' => 'فرع المعادي'],
                        'address' => ['en' => 'Road 9, Maadi', 'ar' => 'شارع ٩، المعادي'],
                        'phone' => ['+20227501010'],
                        'lat' => 29.9618, 'lng' => 31.2570,
                    ],
                    [
                        'gov' => 'cairo',
                        'city' => 'heliopolis',
                        'name' => ['en' => 'Heliopolis Branch', 'ar' => 'فرع مصر الجديدة'],
                        'address' => ['en' => 'El Higaz St., Heliopolis', 'ar' => 'شارع الحجاز، مصر الجديدة'],
                        'phone' => ['+20226907777'],
                        'lat' => 30.0937, 'lng' => 31.3361,
                    ],
                ],
            ],
            [
                'slug' => 'white-line-dental',
                'type' => 'dental',
                'name' => ['en' => 'White Line Dental', 'ar' => 'وايت لاين لطب الأسنان'],
                'phone' => '+20226709090',
                'branches' => [
                    [
                        'gov' => 'cairo',
                        'city' => 'new-cairo',
                        'name' => ['en' => 'New Cairo Branch', 'ar' => 'فرع التجمع الخامس'],
                        'address' => ['en' => 'South 90 St., New Cairo', 'ar' => 'التسعين الجنوبي، التجمع الخامس'],
                        'phone' => ['+20226709090'],
                        'lat' => 30.0277, 'lng' => 31.4915,
                    ],
                ],
            ],
            [
                'slug' => 'magrabi-eye',
                'type' => 'ophthalmology',
                'name' => ['en' => 'Magrabi Eye Hospital', 'ar' => 'مستشفى مغربي للعيون'],
                'phone' => '19191',
                'branches' => [
                    [
                        'gov' => 'cairo',
                        'city' => 'heliopolis',
                        'name' => ['en' => 'Roxy Branch', 'ar' => 'فرع روكسي'],
                        'address' => ['en' => 'El Merghany St., Heliopolis', 'ar' => 'شارع الميرغني، مصر الجديدة'],
                        'phone' => ['19191'],
                        'lat' => 30.0879, 'lng' => 31.3324,
                    ],
                    [
                        'gov' => 'giza',
                        'city' => 'mohandessin',
                        'name' => ['en' => 'Mohandessin Branch', 'ar' => 'فرع المهندسين'],
                        'address' => ['en' => 'Arab League St., Mohandessin', 'ar' => 'شارع جامعة الدول العربية، المهندسين'],
                        'phone' => ['19191'],
                        'lat' => 30.0598, 'lng' => 31.2078,
                    ],
                    [
                        'gov' => 'alexandria',
                        'city' => 'smouha',
                        'name' => ['en' => 'Alexandria Branch', 'ar' => 'فرع الإسكندرية'],
                        'address' => ['en' => '14th of May St., Smouha', 'ar' => 'شارع 14 مايو، سموحة'],
                        'phone' => ['19191'],
                        'lat' => 31.2167, 'lng' => 29.9510,
                    ],
                    [
                        'gov' => 'red-sea',
                        'city' => 'hurghada',
                        'name' => ['en' => 'Hurghada Branch', 'ar' => 'فرع الغردقة'],
                        'address' => ['en' => 'Sheraton Road, Hurghada', 'ar' => 'طريق الشيراتون، الغردقة'],
                        'phone' => ['+20653000000'],
                        'lat' => 27.2579, 'lng' => 33.8116,
                    ],
                ],
            ],
            [
                'slug' => 'el-mohandes-eye',
                'type' => 'ophthalmology',
                'name' => ['en' => 'El Mohandes Eye Center', 'ar' => 'مركز المهندس للعيون'],
                'phone' => '+20233003000',
                'branches' => [
                    [
                        'gov' => 'giza',
                        'city' => 'mohandessin',
                        'name' => ['en' => 'Mohandessin Branch', 'ar' => 'فرع المهندسين'],
                        'address' => ['en' => 'Ahmed Abdel Aziz St., Mohandessin', 'ar' => 'شارع البطل أحمد عبد العزيز، المهندسين'],
                        'phone' => ['+20233003000'],
                        'lat' => 30.0617, 'lng' => 31.2018,
                    ],
                ],
            ],
            [
                'slug' => 'physio-care',
                'type' => 'physio',
                'name' => ['en' => 'PhysioCare Center', 'ar' => 'مركز فيزيو كير للعلاج الطبيعي'],
                'phone' => '+20226721234',
                'branches' => [
                    [
                        'gov' => 'cairo',
                        'city' => 'nasr-city',
                        'name' => ['en' => 'Nasr City Branch', 'ar' => 'فرع مدينة نصر'],
                        'address' => ['en' => 'Mostafa El Nahas St., Nasr City', 'ar' => 'شارع مصطفى النحاس، مدينة نصر'],
                        'phone' => ['+20226721234'],
                        'lat' => 30.0667, 'lng' => 31.3438,
                    ],
                    [
                        'gov' => 'cairo',
                        'city' => 'heliopolis',
                        'name' => ['en' => 'Heliopolis Branch', 'ar' => 'فرع مصر الجديدة'],
                        'address' => ['en' => 'El Higaz St., Heliopolis', 'ar' => 'شارع الحجاز، مصر الجديدة'],
                        'phone' => ['+20224151515'],
                        'lat' => 30.0908, 'lng' => 31.3380,
                    ],
                ],
            ],
            [
                'slug' => 'rehab-plus',
                'type' => 'physio',
                'name' => ['en' => 'Rehab Plus', 'ar' => 'مركز ريهاب بلس'],
                'phone' => '+20227562020',
                'branches' => [
                    [
                        'gov' => 'cairo',
                        'city' => 'maadi',
                        'name' => ['en' => 'Maadi Branch', 'ar' => 'فرع المعادي'],
                        'address' => ['en' => 'Road 9, Maadi', 'ar' => 'شارع ٩، المعادي'],
                        'phone' => ['+20227562020'],
                        'lat' => 29.9620, 'lng' => 31.2580,
                    ],
                ],
            ],
            [
                'slug' => 'as-salam-international',
                'type' => 'maternity',
                'name' => ['en' => 'As-Salam Maternity Center', 'ar' => 'مركز السلام للنساء والتوليد'],
                'phone' => '+20226001500',
                'branches' => [
                    [
                        'gov' => 'cairo',
                        'city' => 'new-cairo',
                        'name' => ['en' => 'New Cairo Branch', 'ar' => 'فرع التجمع الخامس'],
                        'address' => ['en' => 'South Teseen St., New Cairo', 'ar' => 'التسعين الجنوبي، التجمع الخامس'],
                        'phone' => ['+20226001500'],
                        'lat' => 30.0244, 'lng' => 31.4906,
                    ],
                ],
            ],
            [
                'slug' => 'cairo-children-clinic',
                'type' => 'pediatrics',
                'name' => ['en' => 'Cairo Children Clinic', 'ar' => 'عيادة القاهرة لطب الأطفال'],
                'phone' => '+20226907000',
                'branches' => [
                    [
                        'gov' => 'cairo',
                        'city' => 'heliopolis',
                        'name' => ['en' => 'Heliopolis Branch', 'ar' => 'فرع مصر الجديدة'],
                        'address' => ['en' => 'El Hegaz St., Heliopolis', 'ar' => 'شارع الحجاز، مصر الجديدة'],
                        'phone' => ['+20226907000'],
                        'lat' => 30.0937, 'lng' => 31.3361,
                    ],
                    [
                        'gov' => 'giza',
                        'city' => '6th-of-october',
                        'name' => ['en' => '6th of October Branch', 'ar' => 'فرع السادس من أكتوبر'],
                        'address' => ['en' => 'Central Axis, 6th of October', 'ar' => 'المحور المركزي، السادس من أكتوبر'],
                        'phone' => ['+20238370000'],
                        'lat' => 30.0244, 'lng' => 31.0143,
                    ],
                ],
            ],
        ];

        foreach ($facilities as $payload) {
            $type = FacilityType::query()->where('slug', $payload['type'])->first();
            if (! $type) {
                continue;
            }

            $facility = Facility::query()->where('slug', $payload['slug'])->first();
            $isNew = false;
            if (! $facility) {
                $facility = new Facility([
                    'name' => $payload['name'],
                    'phone' => $payload['phone'],
                    'facility_type_id' => $type->id,
                ]);
                $facility->slug = $payload['slug'];
                $facility->save();
                $isNew = true;
            }

            if (! $isNew) {
                continue;
            }

            foreach ($payload['branches'] as $branch) {
                $gov = Governorate::query()->where('slug', $branch['gov'])->first();
                $citySlug = Str::slug($branch['gov'].'-'.$branch['city']);
                $city = City::query()->where('slug', $citySlug)->first();

                $facility->branches()->create([
                    'governorate_id' => $gov?->id,
                    'city_id' => $city?->id,
                    'name' => $branch['name'],
                    'address' => $branch['address'],
                    'phone' => $branch['phone'],
                    'latitude' => $branch['lat'],
                    'longitude' => $branch['lng'],
                ]);
            }
        }
    }
}

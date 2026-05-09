<?php

namespace Database\Seeders;

use App\Models\Facility;
use App\Models\Offer;
use Illuminate\Database\Seeder;

class OfferSeeder extends Seeder
{
    /**
     * Seed offers — some scoped to a whole facility (chain-wide),
     * some pinned to a single branch (branch-only promotions).
     *
     * Idempotent: each offer is `firstOrCreate`d by slug, so re-running
     * the seeder won't produce duplicates.
     */
    public function run(): void
    {
        $facilityOffers = [
            'salam-international' => [
                [
                    'slug' => 'salam-checkup-package',
                    'title' => ['en' => 'Comprehensive Checkup Package', 'ar' => 'باقة الفحص الشامل'],
                    'short' => [
                        'en' => 'Full body checkup with 25% off for Prime cardholders.',
                        'ar' => 'فحص شامل للجسم بخصم 25% لحاملي بطاقة برايم.',
                    ],
                    'full' => [
                        'en' => 'Includes ECG, full blood panel, abdominal ultrasound and a consultation with an internal medicine specialist.',
                        'ar' => 'تشمل تخطيط القلب، صورة دم كاملة، أشعة موجات صوتية على البطن، واستشارة طبيب باطنة.',
                    ],
                    'price' => 1499.00,
                    'old_price' => 1999.00,
                    'phone' => '19885',
                ],
                [
                    'slug' => 'salam-maternity-bundle',
                    'title' => ['en' => 'Maternity Care Bundle', 'ar' => 'باقة رعاية الأمومة'],
                    'short' => [
                        'en' => 'Pregnancy follow-up plus delivery package — save 30%.',
                        'ar' => 'متابعة الحمل وباقة الولادة بخصم 30%.',
                    ],
                    'full' => [
                        'en' => 'Six prenatal visits, two ultrasounds and a hospital delivery suite at preferred rates.',
                        'ar' => 'ست زيارات قبل الولادة، أشعتان موجات صوتية، وغرفة ولادة بأسعار مميزة.',
                    ],
                    'price' => 18000.00,
                    'old_price' => 26000.00,
                    'phone' => '19885',
                ],
            ],
            'dar-al-fouad' => [
                [
                    'slug' => 'dar-al-fouad-cardio-screening',
                    'title' => ['en' => 'Cardiac Screening Day', 'ar' => 'يوم فحص القلب'],
                    'short' => [
                        'en' => 'Heart screening with stress test and consultation.',
                        'ar' => 'فحص القلب يشمل اختبار الإجهاد والاستشارة.',
                    ],
                    'full' => [
                        'en' => 'ECG, echo, treadmill stress test and a consultation with a cardiology consultant.',
                        'ar' => 'تخطيط القلب، إيكو، اختبار جهاز المشي، واستشارة استشاري قلب.',
                    ],
                    'price' => 1250.00,
                    'old_price' => 1800.00,
                    'phone' => '16259',
                ],
            ],
            'cleopatra-hospital' => [
                [
                    'slug' => 'cleopatra-pediatric-vaccine',
                    'title' => ['en' => 'Pediatric Vaccination Plan', 'ar' => 'خطة تطعيمات الأطفال'],
                    'short' => [
                        'en' => 'Yearly vaccination schedule for kids under 5.',
                        'ar' => 'جدول تطعيمات سنوي للأطفال أقل من 5 سنوات.',
                    ],
                    'full' => [
                        'en' => 'All recommended vaccines for the first five years bundled with a pediatrician follow-up.',
                        'ar' => 'كل التطعيمات الموصى بها خلال أول خمس سنوات مع متابعة طبيب أطفال.',
                    ],
                    'price' => 2200.00,
                    'old_price' => 3000.00,
                    'phone' => '16660',
                ],
            ],
            'el-ezaby-pharmacy' => [
                [
                    'slug' => 'el-ezaby-vitamins-15',
                    'title' => ['en' => '15% off Vitamins & Supplements', 'ar' => 'خصم 15% على الفيتامينات والمكملات'],
                    'short' => [
                        'en' => 'Across all El Ezaby branches and the mobile app.',
                        'ar' => 'في جميع فروع العزبي والتطبيق.',
                    ],
                    'full' => [
                        'en' => 'Show your Prime card at checkout to get 15% off any vitamin or food supplement.',
                        'ar' => 'اعرض بطاقة برايم عند الدفع لتحصل على خصم 15% على أي فيتامين أو مكمل غذائي.',
                    ],
                    'price' => null,
                    'old_price' => null,
                    'phone' => '19600',
                ],
                [
                    'slug' => 'el-ezaby-baby-care',
                    'title' => ['en' => '20% off Baby Care', 'ar' => 'خصم 20% على منتجات العناية بالأطفال'],
                    'short' => [
                        'en' => 'Diapers, formula and skincare for babies.',
                        'ar' => 'حفاضات وألبان وعناية ببشرة الأطفال.',
                    ],
                    'full' => [
                        'en' => 'Discount applied automatically at the register on selected baby brands.',
                        'ar' => 'يُحتسب الخصم تلقائيًا عند الدفع على ماركات أطفال محددة.',
                    ],
                    'price' => null,
                    'old_price' => null,
                    'phone' => '19600',
                ],
            ],
            'seif-pharmacy' => [
                [
                    'slug' => 'seif-loyalty-discount',
                    'title' => ['en' => 'Prime Loyalty Discount', 'ar' => 'خصم برنامج الولاء برايم'],
                    'short' => [
                        'en' => 'Up to 12% off across all Seif branches.',
                        'ar' => 'حتى 12% خصم في جميع فروع سيف.',
                    ],
                    'full' => [
                        'en' => 'Stack your Seif loyalty points with a Prime card discount on every visit.',
                        'ar' => 'يمكنك جمع نقاط ولاء سيف مع خصم بطاقة برايم في كل زيارة.',
                    ],
                    'price' => null,
                    'old_price' => null,
                    'phone' => '19199',
                ],
            ],
            'al-borg-labs' => [
                [
                    'slug' => 'al-borg-cbc-package',
                    'title' => ['en' => 'CBC + Lipid Profile Package', 'ar' => 'باقة صورة الدم وتحليل الدهون'],
                    'short' => [
                        'en' => 'Complete blood count + lipid profile at half price.',
                        'ar' => 'صورة دم كاملة وتحليل الدهون بنصف السعر.',
                    ],
                    'full' => [
                        'en' => 'Includes CBC, total cholesterol, HDL, LDL and triglycerides — same-day results.',
                        'ar' => 'تشمل صورة الدم، الكوليسترول، HDL، LDL، والدهون الثلاثية — النتائج في نفس اليوم.',
                    ],
                    'price' => 199.00,
                    'old_price' => 399.00,
                    'phone' => '19911',
                ],
                [
                    'slug' => 'al-borg-diabetes-followup',
                    'title' => ['en' => 'Diabetes Follow-up Package', 'ar' => 'باقة متابعة السكري'],
                    'short' => [
                        'en' => 'Quarterly diabetes monitoring with HbA1c.',
                        'ar' => 'متابعة السكري كل ثلاثة أشهر مع تحليل السكر التراكمي.',
                    ],
                    'full' => [
                        'en' => 'HbA1c, fasting glucose, kidney profile and a urine analysis.',
                        'ar' => 'سكر تراكمي، سكر صائم، وظائف كلى، وتحليل بول.',
                    ],
                    'price' => 349.00,
                    'old_price' => 600.00,
                    'phone' => '19911',
                ],
            ],
            'al-mokhtabar' => [
                [
                    'slug' => 'al-mokhtabar-thyroid-panel',
                    'title' => ['en' => 'Thyroid Function Panel', 'ar' => 'باقة وظائف الغدة الدرقية'],
                    'short' => [
                        'en' => 'TSH + T3 + T4 with home sample collection.',
                        'ar' => 'TSH وT3 وT4 مع سحب عينة من المنزل.',
                    ],
                    'full' => [
                        'en' => 'Sample collected at home at no extra cost; results delivered via the app.',
                        'ar' => 'سحب العينة من المنزل بدون رسوم إضافية، والنتائج عبر التطبيق.',
                    ],
                    'price' => 280.00,
                    'old_price' => 420.00,
                    'phone' => '19014',
                ],
            ],
            'alfa-labs' => [
                [
                    'slug' => 'alfa-vitamin-d-test',
                    'title' => ['en' => 'Vitamin D Test', 'ar' => 'تحليل فيتامين د'],
                    'short' => [
                        'en' => '40% off Vitamin D 25-OH test.',
                        'ar' => 'خصم 40% على تحليل فيتامين د 25-OH.',
                    ],
                    'full' => [
                        'en' => 'Same-day results, available across all Alfa Labs locations.',
                        'ar' => 'النتائج في نفس اليوم، ومتاحة في جميع فروع ألفا.',
                    ],
                    'price' => 180.00,
                    'old_price' => 300.00,
                    'phone' => '16191',
                ],
            ],
            'magrabi-eye' => [
                [
                    'slug' => 'magrabi-lasik-screening',
                    'title' => ['en' => 'Free LASIK Screening', 'ar' => 'كشف الليزك مجانًا'],
                    'short' => [
                        'en' => 'Comprehensive LASIK eligibility screening at no charge.',
                        'ar' => 'كشف شامل لمعرفة مدى ملاءمتك لعملية الليزك مجانًا.',
                    ],
                    'full' => [
                        'en' => 'Full eye exam, corneal mapping and a consultation with a refractive surgeon — for free.',
                        'ar' => 'فحص شامل للعين، رسم خرائط للقرنية، واستشارة استشاري تصحيح إبصار — مجانًا.',
                    ],
                    'price' => 0.00,
                    'old_price' => 700.00,
                    'phone' => '19191',
                ],
            ],
            'physio-care' => [
                [
                    'slug' => 'physio-care-back-pain',
                    'title' => ['en' => 'Back Pain Recovery Plan', 'ar' => 'برنامج علاج آلام الظهر'],
                    'short' => [
                        'en' => '10 physiotherapy sessions with 20% off.',
                        'ar' => '10 جلسات علاج طبيعي بخصم 20%.',
                    ],
                    'full' => [
                        'en' => 'Personalized 10-session program supervised by a senior physiotherapist.',
                        'ar' => 'برنامج 10 جلسات مخصص بإشراف أخصائي علاج طبيعي.',
                    ],
                    'price' => 2000.00,
                    'old_price' => 2500.00,
                    'phone' => '+20226721234',
                ],
            ],
        ];

        $branchOffers = [
            'smile-dental' => [
                [
                    'branch_slug_contains' => 'dokki',
                    'slug' => 'smile-dokki-cleaning',
                    'title' => ['en' => 'Dokki: Free Dental Cleaning', 'ar' => 'الدقي: تنظيف أسنان مجاني'],
                    'short' => [
                        'en' => 'Free scaling & polishing with any whitening session.',
                        'ar' => 'تنظيف وتلميع أسنان مجانًا مع أي جلسة تبييض.',
                    ],
                    'full' => [
                        'en' => 'Limited to the Dokki branch; book in advance via the hotline.',
                        'ar' => 'العرض في فرع الدقي فقط؛ يُرجى الحجز مسبقًا عبر الخط الساخن.',
                    ],
                    'price' => 0.00,
                    'old_price' => 350.00,
                    'phone' => '+20237600000',
                ],
                [
                    'branch_slug_contains' => 'maadi',
                    'slug' => 'smile-maadi-whitening',
                    'title' => ['en' => 'Maadi: 30% off Teeth Whitening', 'ar' => 'المعادي: خصم 30% على تبييض الأسنان'],
                    'short' => [
                        'en' => 'In-clinic Zoom whitening session at Maadi.',
                        'ar' => 'جلسة تبييض زووم داخل عيادة المعادي.',
                    ],
                    'full' => [
                        'en' => 'Single session in-clinic Zoom whitening with a take-home kit.',
                        'ar' => 'جلسة تبييض زووم داخل العيادة مع طقم استكمال منزلي.',
                    ],
                    'price' => 2100.00,
                    'old_price' => 3000.00,
                    'phone' => '+20227501010',
                ],
            ],
            'el-ezaby-pharmacy' => [
                [
                    'branch_slug_contains' => 'sidi-gaber',
                    'slug' => 'ezaby-alex-grand-opening',
                    'title' => ['en' => 'Alexandria Sidi Gaber: Grand Opening', 'ar' => 'الإسكندرية سيدي جابر: افتتاح الفرع'],
                    'short' => [
                        'en' => 'Extra 10% off this branch for the opening month.',
                        'ar' => 'خصم إضافي 10% بمناسبة افتتاح الفرع لمدة شهر.',
                    ],
                    'full' => [
                        'en' => 'Stacks with Prime card benefits during the launch period only.',
                        'ar' => 'يمكن دمج العرض مع مزايا بطاقة برايم خلال فترة الافتتاح فقط.',
                    ],
                    'price' => null,
                    'old_price' => null,
                    'phone' => '19600',
                ],
            ],
            'al-borg-labs' => [
                [
                    'branch_slug_contains' => 'mansoura',
                    'slug' => 'al-borg-mansoura-prenatal',
                    'title' => ['en' => 'Mansoura: Prenatal Lab Bundle', 'ar' => 'المنصورة: باقة تحاليل الحمل'],
                    'short' => [
                        'en' => 'First-trimester lab bundle, 35% off.',
                        'ar' => 'باقة تحاليل أول 3 شهور حمل بخصم 35%.',
                    ],
                    'full' => [
                        'en' => 'Bundle includes blood type, CBC, glucose, urine analysis and TSH.',
                        'ar' => 'الباقة تشمل فصيلة الدم، صورة الدم، السكر، تحليل البول، وTSH.',
                    ],
                    'price' => 480.00,
                    'old_price' => 750.00,
                    'phone' => '19911',
                ],
            ],
            'magrabi-eye' => [
                [
                    'branch_slug_contains' => 'hurghada',
                    'slug' => 'magrabi-hurghada-checkup',
                    'title' => ['en' => 'Hurghada: Tourist Eye Check-up', 'ar' => 'الغردقة: كشف العيون للسائحين والمقيمين'],
                    'short' => [
                        'en' => 'Quick eye exam — 50% off in Hurghada only.',
                        'ar' => 'كشف عين سريع — خصم 50% في فرع الغردقة فقط.',
                    ],
                    'full' => [
                        'en' => 'Express eye exam ideal for travellers; results within 30 minutes.',
                        'ar' => 'كشف سريع مناسب للمسافرين؛ النتائج خلال 30 دقيقة.',
                    ],
                    'price' => 250.00,
                    'old_price' => 500.00,
                    'phone' => '+20653000000',
                ],
            ],
            'cleopatra-hospital' => [
                [
                    'branch_slug_contains' => 'new-cairo',
                    'slug' => 'cleopatra-tagamoa-derma',
                    'title' => ['en' => 'New Cairo: Dermatology Consultation', 'ar' => 'التجمع الخامس: استشارة جلدية'],
                    'short' => [
                        'en' => 'Dermatology consultation with a senior consultant for 50% off.',
                        'ar' => 'استشارة جلدية مع استشاري بخصم 50%.',
                    ],
                    'full' => [
                        'en' => 'Consultation slots are limited; available only at the New Cairo location.',
                        'ar' => 'المواعيد محدودة، والعرض متاح في فرع التجمع الخامس فقط.',
                    ],
                    'price' => 350.00,
                    'old_price' => 700.00,
                    'phone' => '16660',
                ],
            ],
        ];

        foreach ($facilityOffers as $facilitySlug => $offers) {
            $facility = Facility::query()->where('slug', $facilitySlug)->first();
            if (! $facility) {
                continue;
            }

            foreach ($offers as $data) {
                Offer::firstOrCreate(
                    ['slug' => $data['slug']],
                    [
                        'offerable_id' => $facility->id,
                        'offerable_type' => Facility::class,
                        'title' => $data['title'],
                        'short_description' => $data['short'],
                        'full_description' => $data['full'],
                        'price' => $data['price'],
                        'old_price' => $data['old_price'],
                        'phone' => $data['phone'],
                    ],
                );
            }
        }

        foreach ($branchOffers as $facilitySlug => $offers) {
            $facility = Facility::query()
                ->with('branches')
                ->where('slug', $facilitySlug)
                ->first();

            if (! $facility) {
                continue;
            }

            foreach ($offers as $data) {
                $branch = $facility->branches->first(
                    fn ($b) => str_contains($b->slug ?? '', $data['branch_slug_contains']),
                );

                if (! $branch) {
                    continue;
                }

                Offer::firstOrCreate(
                    ['slug' => $data['slug']],
                    [
                        'offerable_id' => $branch->id,
                        'offerable_type' => \App\Models\FacilityBranch::class,
                        'title' => $data['title'],
                        'short_description' => $data['short'],
                        'full_description' => $data['full'],
                        'price' => $data['price'],
                        'old_price' => $data['old_price'],
                        'phone' => $data['phone'],
                    ],
                );
            }
        }
    }
}

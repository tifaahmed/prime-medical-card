<?php

namespace Database\Seeders;

use App\Models\PageContent;
use Illuminate\Database\Seeder;

class PageContentSeeder extends Seeder
{
    public function run(): void
    {
        $entries = [
            // Home — hero
            ['home', 'hero', 'eyebrow', 'أكثر من ٣٠٠٠ جهة طبية في الشبكة'],
            ['home', 'hero', 'paragraph', 'بطاقة واحدة تفتح لك أبواب أفضل المستشفيات والعيادات والصيدليات ومعامل التحاليل في الجمهورية — بخصومات تصل إلى ٧٠٪ لك ولعائلتك طوال العام.'],
            ['home', 'hero', 'cta_primary', 'احصل على بطاقتك الآن'],
            ['home', 'hero', 'cta_secondary', 'شاهد كيف تعمل'],

            // Home — section eyebrows / intros
            ['home', 'how_header', 'eyebrow', 'كيف تعمل'],
            ['home', 'how_header', 'paragraph', 'من الاشتراك حتى استخدام البطاقة في أقرب عيادة — لا أوراق ولا انتظار ولا تعقيدات'],

            ['home', 'services_header', 'eyebrow', 'شبكة شاملة'],
            ['home', 'services_header', 'paragraph', 'من الكشف الطبي إلى الأدوية والتحاليل والأشعة — بطاقة واحدة تغطي كل احتياجات عائلتك الصحية'],

            ['home', 'pricing_header', 'eyebrow', 'باقاتنا'],
            ['home', 'pricing_header', 'paragraph', 'باقات مرنة بأسعار مناسبة — اشترك شهرياً أو سنوياً ووفر أكثر، بدون التزامات خفية'],

            ['home', 'testimonials_header', 'eyebrow', 'آراء الأعضاء'],
            ['home', 'testimonials_header', 'paragraph', 'استمع إلى تجارب أعضائنا الحقيقية — قصص نجاح من كل محافظات الجمهورية'],

            ['home', 'offers_header', 'eyebrow', 'عروض خاصة'],
            ['home', 'offers_header', 'paragraph', 'خصومات حصرية لأعضاء برايم ميديكال كارد على الباقات الأكثر طلباً من شركائنا الطبيين، صالحة لفترة محدودة.'],

            ['home', 'offers_cta', 'heading', 'احصل على كل العروض ببطاقة واحدة'],
            ['home', 'offers_cta', 'paragraph', 'اشترك اليوم واستفد فوراً من جميع الخصومات لدى أكثر من ٣٠٠٠ شريك طبي معتمد.'],

            ['home', 'cta_banner', 'paragraph', 'انضم إلى أكثر من ١٢٠ ألف عائلة مصرية تثق بنا في رحلتهم الصحية — اشتراك سريع ومباشر وبدون تعقيدات'],
            ['home', 'cta_banner', 'cta_primary', 'احصل على بطاقتك الآن'],
            ['home', 'cta_banner', 'cta_secondary', 'اعرف المزيد'],
            ['home', 'cta_banner', 'phone_label', 'أو اتصل بنا مباشرة'],

            // About
            ['about', 'hero', 'eyebrow', 'من نحن'],
            ['about', 'hero', 'paragraph', 'برايم ميديكال كارد هي بطاقة الخصومات الطبية الأولى في مصر، تأسست عام ٢٠٢٠ بهدف جعل الرعاية الصحية الجيدة في متناول كل أسرة مصرية من خلال شبكة تضم أكبر الجهات الطبية المعتمدة في الدولة.'],

            ['about', 'story', 'eyebrow', 'قصتنا'],
            ['about', 'story', 'paragraph1', 'بدأت برايم ميديكال كارد من ملاحظة بسيطة: أسعار الرعاية الصحية ترتفع، والكثير من الأسر تؤجل الكشف الطبي خوفاً من التكلفة. أردنا أن نكون الجسر بين الجهات الطبية المتميزة والأسر التي تستحق رعاية أفضل.'],
            ['about', 'story', 'paragraph2', 'بدأنا بشراكات محدودة في القاهرة، واليوم نخدم أكثر من ربع مليون عضو في كل محافظات مصر، بشبكة تضم مستشفيات، صيدليات، معامل تحاليل، مراكز أشعة، عيادات أسنان، بصريات، وأكثر.'],
            ['about', 'story', 'paragraph3', 'التزامنا واضح: خصومات حقيقية، شركاء معتمدون، وتجربة بسيطة من البداية للنهاية.'],

            ['about', 'vision', 'title', 'رؤيتنا'],
            ['about', 'vision', 'body', 'أن نكون الخيار الأول لكل أسرة مصرية تبحث عن رعاية صحية موثوقة بأسعار في متناول الجميع، من خلال أكبر شبكة شركاء طبيين في الجمهورية.'],

            ['about', 'mission', 'title', 'رسالتنا'],
            ['about', 'mission', 'body', 'تمكين كل عضو من اتخاذ قرارات صحية أفضل من خلال خصومات حقيقية، شفافية كاملة، وتجربة رقمية بسيطة تربطه بأفضل المقدمين الطبيين.'],

            ['about', 'values_header', 'eyebrow', 'قيمنا'],
            ['about', 'timeline_header', 'eyebrow', 'الرحلة'],

            // Contact
            ['contact', 'hero', 'eyebrow', 'نسعد بتواصلك معنا'],
            ['contact', 'hero', 'title', 'تواصل معنا'],
            ['contact', 'hero', 'paragraph', 'لديك سؤال عن البطاقة، الاشتراك، أو الشركاء الطبيين؟ فريقنا جاهز للرد عليك خلال ساعات العمل. اختر وسيلة التواصل الأنسب لك أو أرسل لنا رسالة مباشرة.'],

            ['contact', 'form_header', 'title', 'أرسل لنا رسالة'],
            ['contact', 'form_header', 'paragraph', 'املأ النموذج وسيقوم فريقنا بالتواصل معك في أقرب وقت. نحرص على الرد خلال ٢٤ ساعة عمل.'],

            ['contact', 'map_header', 'title', 'موقعنا على الخريطة'],

            // Partners (placeholders — adjust later)
            ['partners', 'hero', 'eyebrow', '+٣٠٠٠ شريك طبي'],
            ['partners', 'hero', 'paragraph', 'ابحث عن أقرب شريك طبي لك — مستشفيات، صيدليات، معامل وأكثر، كلها ببطاقة واحدة.'],
        ];

        foreach ($entries as [$page, $section, $key, $value]) {
            PageContent::updateOrCreate(
                ['page' => $page, 'section' => $section, 'key' => $key],
                ['value' => $value, 'is_rich' => false],
            );
        }
    }
}

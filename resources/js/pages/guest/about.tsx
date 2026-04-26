import { usePage } from '@inertiajs/react';
import FloatingActions from '@/components/floating-actions';
import FloatingLogos from '@/components/floating-logos';
import SeoHead, { breadcrumbSchema } from '@/components/seo-head';
import AnnounceBar from '@/components/home/announce-bar';
import MobileBottomNav from '@/components/home/mobile-bottom-nav';
import useRevealOnScroll from '@/components/home/reveal-on-scroll';
import SiteFooter from '@/components/home/site-footer';
import SiteNav from '@/components/home/site-nav';
import { homeStyles } from '@/components/home/styles';
import { useSubscribeModal } from '@/components/subscribe-modal';

const STATS = [
    { value: '٢٠٢٠', label: 'تأسست الشركة' },
    { value: '+٣٠٠٠', label: 'شريك طبي معتمد' },
    { value: '+٢٥٠ ألف', label: 'عضو مسجّل' },
    { value: '+٢٧', label: 'محافظة مغطاة' },
];

const VALUES = [
    {
        title: 'الجودة الطبية',
        desc: 'نتعامل فقط مع جهات طبية معتمدة وذات سمعة موثوقة لضمان أفضل تجربة لأعضائنا.',
        icon: (
            <>
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </>
        ),
    },
    {
        title: 'الشفافية',
        desc: 'نعرض الخصومات والشروط بوضوح، بدون رسوم خفية أو مفاجآت في الفاتورة.',
        icon: (
            <>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </>
        ),
    },
    {
        title: 'في خدمتك دائماً',
        desc: 'فريق دعم متاح طوال الأسبوع للرد على استفساراتك ومساعدتك في الحجوزات.',
        icon: (
            <>
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </>
        ),
    },
    {
        title: 'سعر يناسب الجميع',
        desc: 'باقات بأسعار اقتصادية تتيح لكل أسرة مصرية الوصول إلى رعاية صحية أفضل.',
        icon: (
            <>
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </>
        ),
    },
];

const TIMELINE = [
    {
        year: '٢٠٢٠',
        title: 'انطلاق الفكرة',
        desc: 'بدأ المؤسسون رحلتهم برؤية لتقديم رعاية صحية ميسّرة لكل أسرة.',
    },
    {
        year: '٢٠٢١',
        title: 'أول ١٠٠ شريك',
        desc: 'وصلنا لأول ١٠٠ شريك طبي وبدأنا تقديم الخدمة في القاهرة الكبرى.',
    },
    {
        year: '٢٠٢٣',
        title: 'توسع وطني',
        desc: 'تغطية كاملة لجميع المحافظات المصرية وتجاوز ١٠٠٠ شريك معتمد.',
    },
    {
        year: '٢٠٢٦',
        title: 'منصة متكاملة',
        desc: 'إطلاق المنصة الرقمية ونسخة جديدة من البطاقة وعروض حصرية للأعضاء.',
    },
];

export default function About() {
    const { auth, appUrl } = usePage<{
        auth: { user: { name: string } | null };
        appUrl: string;
    }>().props;
    const authUser = auth?.user ?? null;
    const { open: openSubscribe } = useSubscribeModal();

    useRevealOnScroll();

    return (
        <>
            <SeoHead
                title="عن الشركة — برايم ميديكال كارد"
                description="تعرّف على قصة برايم ميديكال كارد، رؤيتنا، قيمنا، ورحلتنا في تقديم رعاية صحية ميسّرة لأكثر من ربع مليون عضو في مصر."
                jsonLd={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'AboutPage',
                        name: 'عن برايم ميديكال كارد',
                        url: `${appUrl ?? ''}/about`,
                        inLanguage: 'ar-EG',
                    },
                    breadcrumbSchema(appUrl ?? '', [
                        { name: 'الرئيسية', path: '/' },
                        { name: 'عن الشركة', path: '/about' },
                    ]),
                ]}
            >
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&family=Tajawal:wght@300;400;500;700;800&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
            </SeoHead>
            <style dangerouslySetInnerHTML={{ __html: homeStyles }} />

            <div className="pm-home" dir="rtl" lang="ar">
                <FloatingLogos />
                <AnnounceBar />
                <SiteNav authUser={authUser} />

                <section className="relative z-[2] py-16 sm:py-24">
                    <div className="container">
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex items-center rounded-full bg-[var(--amber-100)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--amber-600)]">
                                من نحن
                            </span>
                            <h1 className="mt-4 text-4xl font-bold leading-tight text-[var(--teal-900)] sm:text-5xl lg:text-6xl">
                                نُعيد تعريف{' '}
                                <em className="font-serif text-[var(--amber-600)]">
                                    الرعاية الصحية
                                </em>{' '}
                                في مصر
                            </h1>
                            <p className="mt-5 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
                                برايم ميديكال كارد هي بطاقة الخصومات الطبية
                                الأولى في مصر، تأسست عام ٢٠٢٠ بهدف جعل الرعاية
                                الصحية الجيدة في متناول كل أسرة مصرية من خلال
                                شبكة تضم أكبر الجهات الطبية المعتمدة في الدولة.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                            {STATS.map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white p-6 text-center shadow-[0_18px_40px_-30px_rgba(11,46,44,0.5)]"
                                >
                                    <div className="text-3xl font-extrabold text-[var(--amber-600)] sm:text-4xl">
                                        {s.value}
                                    </div>
                                    <div className="mt-2 text-xs font-semibold text-[var(--ink-soft)] sm:text-sm">
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative z-[2] py-16 sm:py-20">
                    <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-600)]">
                                قصتنا
                            </span>
                            <h2 className="mt-3 text-3xl font-bold text-[var(--teal-900)] sm:text-4xl">
                                من فكرة بسيطة{' '}
                                <em className="font-serif text-[var(--amber-600)]">
                                    إلى شبكة وطنية
                                </em>
                            </h2>
                            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">
                                <p>
                                    بدأت برايم ميديكال كارد من ملاحظة بسيطة:
                                    أسعار الرعاية الصحية ترتفع، والكثير من
                                    الأسر تؤجل الكشف الطبي خوفاً من التكلفة. أردنا
                                    أن نكون الجسر بين الجهات الطبية المتميزة
                                    والأسر التي تستحق رعاية أفضل.
                                </p>
                                <p>
                                    بدأنا بشراكات محدودة في القاهرة، واليوم نخدم
                                    أكثر من ربع مليون عضو في كل محافظات مصر،
                                    بشبكة تضم مستشفيات، صيدليات، معامل تحاليل،
                                    مراكز أشعة، عيادات أسنان، بصريات، وأكثر.
                                </p>
                                <p>
                                    التزامنا واضح: خصومات حقيقية، شركاء معتمدون،
                                    وتجربة بسيطة من البداية للنهاية.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[var(--teal-700)] to-[var(--amber-500)] opacity-20 blur-2xl" />
                            <div className="rounded-[2rem] border border-[rgba(11,46,44,0.08)] bg-white p-8 shadow-[0_30px_70px_-40px_rgba(11,46,44,0.5)]">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--teal-900)] text-[var(--amber-400)]">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-6 w-6"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--teal-900)]">
                                        رؤيتنا
                                    </h3>
                                </div>
                                <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                                    أن نكون الخيار الأول لكل أسرة مصرية تبحث عن
                                    رعاية صحية موثوقة بأسعار في متناول الجميع،
                                    من خلال أكبر شبكة شركاء طبيين في الجمهورية.
                                </p>

                                <div className="mt-8 mb-6 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--amber-500)] text-[var(--teal-900)]">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-6 w-6"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <circle cx="12" cy="12" r="6" />
                                            <circle cx="12" cy="12" r="2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--teal-900)]">
                                        رسالتنا
                                    </h3>
                                </div>
                                <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                                    تمكين كل عضو من اتخاذ قرارات صحية أفضل من
                                    خلال خصومات حقيقية، شفافية كاملة، وتجربة
                                    رقمية بسيطة تربطه بأفضل المقدمين الطبيين.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative z-[2] py-16 sm:py-20">
                    <div className="container">
                        <div className="mx-auto max-w-2xl text-center">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-600)]">
                                قيمنا
                            </span>
                            <h2 className="mt-3 text-3xl font-bold text-[var(--teal-900)] sm:text-4xl">
                                ما الذي يميز{' '}
                                <em className="font-serif text-[var(--amber-600)]">
                                    برايم ميديكال كارد
                                </em>
                            </h2>
                        </div>

                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {VALUES.map((v) => (
                                <article
                                    key={v.title}
                                    className="rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_55px_-30px_rgba(11,46,44,0.5)]"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--teal-100)] text-[var(--teal-700)]">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-6 w-6"
                                        >
                                            {v.icon}
                                        </svg>
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-[var(--teal-900)]">
                                        {v.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                                        {v.desc}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative z-[2] bg-[var(--teal-900)] py-16 sm:py-20">
                    <div className="container">
                        <div className="mx-auto max-w-2xl text-center">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--amber-400)]">
                                الرحلة
                            </span>
                            <h2 className="mt-3 text-3xl font-bold text-[var(--cream)] sm:text-4xl">
                                محطات{' '}
                                <em className="font-serif text-[var(--amber-400)]">
                                    صنعت الفارق
                                </em>
                            </h2>
                        </div>

                        <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {TIMELINE.map((t) => (
                                <li
                                    key={t.year}
                                    className="relative rounded-3xl bg-[rgba(247,242,234,0.06)] p-6 backdrop-blur"
                                >
                                    <span className="inline-flex items-center rounded-full bg-[var(--amber-500)] px-3 py-1 text-xs font-bold text-[var(--teal-900)]">
                                        {t.year}
                                    </span>
                                    <h3 className="mt-3 text-lg font-bold text-[var(--cream)]">
                                        {t.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[rgba(247,242,234,0.7)]">
                                        {t.desc}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section className="relative z-[2] py-16 sm:py-20">
                    <div className="container">
                        <div className="flex flex-col items-center gap-4 rounded-[2.5rem] bg-gradient-to-br from-[var(--teal-700)] to-[var(--teal-900)] p-10 text-center sm:flex-row sm:gap-8 sm:text-start">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-[var(--cream)] sm:text-3xl">
                                    انضم إلى أكثر من ربع مليون عضو
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-[rgba(247,242,234,0.75)] sm:text-base">
                                    احصل على بطاقة العضوية اليوم واستفد من
                                    خصومات حقيقية في كل المحافظات.
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={openSubscribe}
                                    className="inline-flex items-center gap-2 rounded-full bg-[var(--amber-500)] px-6 py-3 text-sm font-semibold text-[var(--teal-900)] transition hover:bg-[var(--amber-400)]"
                                >
                                    اشترك الآن
                                </button>
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(247,242,234,0.3)] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--cream)] transition hover:bg-[rgba(247,242,234,0.08)]"
                                >
                                    تواصل معنا
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <SiteFooter />
                <MobileBottomNav />
                <FloatingActions />
            </div>
        </>
    );
}

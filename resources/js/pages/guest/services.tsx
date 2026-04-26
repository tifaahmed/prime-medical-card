import { Link, usePage } from '@inertiajs/react';
import FloatingActions from '@/components/floating-actions';
import FloatingLogos from '@/components/floating-logos';
import SeoHead, { breadcrumbSchema } from '@/components/seo-head';
import AnnounceBar from '@/components/home/announce-bar';
import MobileBottomNav from '@/components/home/mobile-bottom-nav';
import useRevealOnScroll from '@/components/home/reveal-on-scroll';
import SiteFooter from '@/components/home/site-footer';
import SiteNav from '@/components/home/site-nav';
import { homeStyles } from '@/components/home/styles';
import { SERVICES, type Service } from '@/data/services';

export default function Services() {
    const { auth, appUrl } = usePage<{
        auth: { user: { name: string } | null };
        appUrl: string;
    }>().props;
    const authUser = auth?.user ?? null;

    useRevealOnScroll();

    return (
        <>
            <SeoHead
                title="الخدمات الطبية — برايم ميديكال كارد"
                description="استكشف الخدمات الطبية لبرايم ميديكال كارد: عيادات، صيدليات، تحاليل، أشعة، أسنان، بصريات، صحة نفسية، وعلاج طبيعي بخصومات تصل إلى 70%."
                keywords={[
                    'خدمات طبية',
                    'عيادات',
                    'صيدليات',
                    'تحاليل',
                    'أشعة',
                    'أسنان',
                    'بصريات',
                    'صحة نفسية',
                    'علاج طبيعي',
                ]}
                jsonLd={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        name: 'الخدمات الطبية',
                        itemListElement: SERVICES.map((s, i) => ({
                            '@type': 'ListItem',
                            position: i + 1,
                            url: `${appUrl ?? ''}/services/${s.id}`,
                            name: s.title,
                        })),
                    },
                    breadcrumbSchema(appUrl ?? '', [
                        { name: 'الرئيسية', path: '/' },
                        { name: 'الخدمات', path: '/services' },
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

                <section className="relative z-[2] overflow-hidden bg-[var(--teal-900)] py-14 sm:py-20">
                    <div className="absolute inset-0 -z-0 opacity-30">
                        <div className="absolute -right-32 top-12 h-72 w-72 rounded-full bg-[var(--amber-500)] blur-3xl" />
                        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[var(--teal-500)] blur-3xl" />
                    </div>
                    <div className="container relative z-10">
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex items-center rounded-full bg-[rgba(247,242,234,0.08)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--amber-400)]">
                                خدماتنا الطبية
                            </span>
                            <h1 className="mt-4 text-3xl font-bold leading-tight text-[var(--cream)] sm:text-5xl">
                                كل ما تحتاجه طبياً{' '}
                                <em className="font-serif text-[var(--amber-400)]">
                                    في مكان واحد
                                </em>
                            </h1>
                            <p className="mt-4 text-sm leading-relaxed text-[rgba(247,242,234,0.75)] sm:text-base">
                                ثمانية تخصصات طبية رئيسية، آلاف نقاط الخدمة، وبطاقة
                                واحدة لكل أفراد العائلة.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="relative z-[2] py-10 sm:py-16">
                    <div className="container">
                        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                            {SERVICES.map((s) => (
                                <ServiceCard key={s.id} service={s} />
                            ))}
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

function ServiceCard({ service }: { service: Service }) {
    return (
        <Link
            href={`/services/${service.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white transition hover:-translate-y-1 hover:shadow-[0_28px_55px_-30px_rgba(11,46,44,0.5)]"
        >
            <ServiceHero service={service} />

            <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-[var(--teal-900)] sm:text-base">
                        {service.title}
                    </h3>
                    <span className="rounded-full bg-[var(--amber-100)] px-2 py-1 text-[10px] font-bold text-[var(--amber-600)] sm:text-[11px]">
                        {service.discount}
                    </span>
                </div>
                <p className="line-clamp-3 text-xs leading-relaxed text-[var(--ink-soft)] sm:text-sm">
                    {service.desc}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[var(--teal-700)] group-hover:text-[var(--teal-900)] sm:text-sm">
                    استكشف الخدمة
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </span>
            </div>
        </Link>
    );
}

function ServiceHero({ service }: { service: Service }) {
    return (
        <div
            className="relative aspect-[4/3] overflow-hidden"
            style={{
                background: `linear-gradient(135deg, ${service.accent}, ${service.accent}cc)`,
            }}
        >
            <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                        'none';
                }}
                loading="lazy"
            />
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute bottom-3 left-3 h-10 w-10 text-white/70 sm:h-12 sm:w-12"
            >
                {service.icon}
            </svg>
        </div>
    );
}

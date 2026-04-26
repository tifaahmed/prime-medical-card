import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import FloatingActions from '@/components/floating-actions';
import SeoHead, {
    breadcrumbSchema,
    serviceSchema,
} from '@/components/seo-head';
import AnnounceBar from '@/components/home/announce-bar';
import MobileBottomNav from '@/components/home/mobile-bottom-nav';
import SiteFooter from '@/components/home/site-footer';
import SiteNav from '@/components/home/site-nav';
import { homeStyles } from '@/components/home/styles';
import { findService, type Project, type Service } from '@/data/services';

export default function ServiceDetail() {
    const { auth, id, appUrl } = usePage<{
        auth: { user: { name: string } | null };
        id: string;
        appUrl: string;
    }>().props;
    const authUser = auth?.user ?? null;
    const service = findService(id);
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

    if (!service) {
        return (
            <>
                <SeoHead
                    title="خدمة غير موجودة — برايم ميديكال كارد"
                    description="الخدمة المطلوبة غير متاحة."
                    noindex
                />
                <style dangerouslySetInnerHTML={{ __html: homeStyles }} />
                <div className="pm-home" dir="rtl" lang="ar">
                    <AnnounceBar />
                    <SiteNav authUser={authUser} />
                    <section className="container py-24 text-center">
                        <h1 className="text-3xl font-bold text-[var(--teal-900)]">
                            لم نعثر على هذه الخدمة
                        </h1>
                        <Link
                            href="/services"
                            className="mt-6 inline-flex rounded-full bg-[var(--teal-900)] px-6 py-3 text-sm font-semibold text-[var(--cream)]"
                        >
                            العودة لقائمة الخدمات
                        </Link>
                    </section>
                    <SiteFooter />
                    <MobileBottomNav />
                    <FloatingActions />
                </div>
            </>
        );
    }

    return (
        <>
            <SeoHead
                title={`${service.title} — برايم ميديكال كارد`}
                description={`${service.desc} ${service.discount}`}
                image={service.image}
                keywords={[service.title, 'خدمات طبية', 'خصومات']}
                jsonLd={[
                    serviceSchema(appUrl ?? '', {
                        name: service.title,
                        description: service.longDesc,
                        path: `/services/${service.id}`,
                        image: service.image,
                    }),
                    breadcrumbSchema(appUrl ?? '', [
                        { name: 'الرئيسية', path: '/' },
                        { name: 'الخدمات', path: '/services' },
                        {
                            name: service.title,
                            path: `/services/${service.id}`,
                        },
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
                <AnnounceBar />
                <SiteNav authUser={authUser} />

                <section
                    className="relative z-[2] overflow-hidden py-14 sm:py-20"
                    style={{
                        background: `linear-gradient(135deg, ${service.accent}, ${service.accent}aa)`,
                    }}
                >
                    <div className="container relative z-10">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                            العودة للخدمات
                        </Link>

                        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[1.2fr,1fr]">
                            <div>
                                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/90">
                                    {service.discount}
                                </span>
                                <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-5xl">
                                    {service.title}
                                </h1>
                                <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
                                    {service.longDesc}
                                </p>
                            </div>

                            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white/10 shadow-xl">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    onError={(e) => {
                                        (
                                            e.currentTarget as HTMLImageElement
                                        ).style.display = 'none';
                                    }}
                                />
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="absolute bottom-4 left-4 h-14 w-14 text-white/80"
                                >
                                    {service.icon}
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative z-[2] py-12 sm:py-16">
                    <div className="container">
                        <div className="flex items-end justify-between gap-3">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--amber-600)]">
                                    أحدث المشاريع
                                </span>
                                <h2 className="mt-1 text-2xl font-bold text-[var(--teal-900)] sm:text-3xl">
                                    معرض المشاريع
                                </h2>
                            </div>
                            <span className="text-xs font-semibold text-[var(--ink-soft)]">
                                {service.projects.length} مشروع
                            </span>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                            {service.projects.map((p, i) => (
                                <ProjectThumb
                                    key={p.title}
                                    project={p}
                                    accent={service.accent}
                                    onOpen={() => setGalleryIndex(i)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <SiteFooter />
                <MobileBottomNav />
                <FloatingActions />
            </div>

            {galleryIndex !== null && (
                <ProjectGallery
                    projects={service.projects}
                    index={galleryIndex}
                    accent={service.accent}
                    onClose={() => setGalleryIndex(null)}
                    onChange={setGalleryIndex}
                />
            )}
        </>
    );
}

function ProjectThumb({
    project,
    accent,
    onOpen,
}: {
    project: Project;
    accent: string;
    onOpen: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white text-start transition hover:-translate-y-1 hover:shadow-[0_28px_55px_-30px_rgba(11,46,44,0.5)]"
        >
            <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                }}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                            'none';
                    }}
                    loading="lazy"
                />
                <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    {project.year}
                </span>
            </div>
            <div className="p-3 sm:p-4">
                <h3 className="text-xs font-bold text-[var(--teal-900)] sm:text-sm">
                    {project.title}
                </h3>
            </div>
        </button>
    );
}

function ProjectGallery({
    projects,
    index,
    accent,
    onClose,
    onChange,
}: {
    projects: Project[];
    index: number;
    accent: string;
    onClose: () => void;
    onChange: (next: number) => void;
}) {
    const current = projects[index];

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft') {
                onChange((index + 1) % projects.length);
            } else if (e.key === 'ArrowRight') {
                onChange((index - 1 + projects.length) % projects.length);
            }
        };
        window.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [index, projects.length, onClose, onChange]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={onClose}
            dir="rtl"
        >
            <button
                type="button"
                aria-label="إغلاق"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
            </button>

            <button
                type="button"
                aria-label="السابق"
                onClick={(e) => {
                    e.stopPropagation();
                    onChange((index + 1) % projects.length);
                }}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-8"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            <button
                type="button"
                aria-label="التالي"
                onClick={(e) => {
                    e.stopPropagation();
                    onChange((index - 1 + projects.length) % projects.length);
                }}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-8"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

            <div
                className="flex max-h-full w-full max-w-3xl flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl shadow-2xl"
                    style={{
                        background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                    }}
                >
                    <img
                        key={current.image}
                        src={current.image}
                        alt={current.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(e) => {
                            (
                                e.currentTarget as HTMLImageElement
                            ).style.display = 'none';
                        }}
                    />
                </div>
                <div className="text-center">
                    <h3 className="text-base font-semibold text-white sm:text-xl">
                        {current.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/60">
                        {current.year} — {index + 1} / {projects.length}
                    </p>
                </div>
            </div>
        </div>
    );
}

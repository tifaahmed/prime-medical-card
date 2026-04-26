import { Link, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import FloatingActions from '@/components/floating-actions';
import FloatingLogos from '@/components/floating-logos';
import SeoHead, { breadcrumbSchema } from '@/components/seo-head';
import AnnounceBar from '@/components/home/announce-bar';
import MobileBottomNav from '@/components/home/mobile-bottom-nav';
import useRevealOnScroll from '@/components/home/reveal-on-scroll';
import SiteFooter from '@/components/home/site-footer';
import SiteNav from '@/components/home/site-nav';
import { homeStyles } from '@/components/home/styles';
import {
    ALL,
    ALL_GOV,
    GOVERNORATES,
    PARTNERS,
    type Partner,
    type PartnerCategory,
} from '@/data/partners';

const CATEGORIES: { name: PartnerCategory; icon: React.ReactNode }[] = [
    {
        name: 'مستشفيات',
        icon: (
            <>
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
            </>
        ),
    },
    {
        name: 'صيدليات',
        icon: (
            <>
                <path d="M10.5 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6" />
                <path d="M16 19h6" />
                <path d="M19 16v6" />
            </>
        ),
    },
    {
        name: 'تحاليل',
        icon: (
            <>
                <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                <path d="M8.5 2h7" />
            </>
        ),
    },
    {
        name: 'أشعة',
        icon: (
            <>
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </>
        ),
    },
    {
        name: 'أسنان',
        icon: (
            <>
                <path d="M19 10H5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h2.5L9 21h6l1.5-7H19a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2z" />
            </>
        ),
    },
    {
        name: 'بصريات',
        icon: (
            <>
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                <circle cx="12" cy="12" r="3" />
            </>
        ),
    },
    {
        name: 'علاج طبيعي',
        icon: (
            <>
                <path d="M6 2l.01 20" />
                <path d="M18 2l.01 20" />
                <path d="M2 6h20" />
                <path d="M2 18h20" />
            </>
        ),
    },
];


export default function Partners() {
    const { auth, appUrl } = usePage<{
        auth: { user: { name: string } | null };
        appUrl: string;
    }>().props;
    const authUser = auth?.user ?? null;

    const [activeCategory, setActiveCategory] = useState<string>(ALL);
    const [activeGov, setActiveGov] = useState<string>(ALL_GOV);
    const [query, setQuery] = useState('');
    const [contactPartner, setContactPartner] = useState<Partner | null>(null);

    useRevealOnScroll();

    const filtered = useMemo(() => {
        const q = query.trim();

        return PARTNERS.filter((p) => {
            if (activeCategory !== ALL && p.category !== activeCategory) {
                return false;
            }

            if (activeGov !== ALL_GOV && p.governorate !== activeGov) {
                return false;
            }

            if (q && !p.name.includes(q) && !p.description.includes(q)) {
                return false;
            }

            return true;
        });
    }, [activeCategory, activeGov, query]);

    return (
        <>
            <SeoHead
                title="الشركاء الطبيون — برايم ميديكال كارد"
                description="استعرض شبكة الشركاء الطبيين لبرايم ميديكال كارد: مستشفيات، صيدليات، معامل تحاليل، مراكز أشعة، عيادات أسنان، بصريات، وأكثر في كل محافظات مصر."
                keywords={[
                    'شركاء طبيون',
                    'مستشفيات مصر',
                    'صيدليات',
                    'معامل تحاليل',
                    'مراكز أشعة',
                ]}
                jsonLd={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        name: 'الشركاء الطبيون',
                        numberOfItems: PARTNERS.length,
                        itemListElement: PARTNERS.map((p, i) => ({
                            '@type': 'ListItem',
                            position: i + 1,
                            url: `${appUrl ?? ''}/partners/${p.id}`,
                            name: p.name,
                        })),
                    },
                    breadcrumbSchema(appUrl ?? '', [
                        { name: 'الرئيسية', path: '/' },
                        { name: 'الشركاء', path: '/partners' },
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

                <section className="relative z-[2] overflow-hidden bg-[var(--teal-900)] py-16 sm:py-24">
                    <div className="absolute inset-0 -z-0 opacity-30">
                        <div className="absolute -right-32 top-12 h-72 w-72 rounded-full bg-[var(--amber-500)] blur-3xl" />
                        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[var(--teal-500)] blur-3xl" />
                    </div>
                    <div className="container relative z-10">
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex items-center rounded-full bg-[rgba(247,242,234,0.08)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--amber-400)]">
                                +٣٠٠٠ شريك طبي
                            </span>
                            <h1 className="mt-4 text-4xl font-bold leading-tight text-[var(--cream)] sm:text-5xl lg:text-6xl">
                                ابحث عن{' '}
                                <em className="font-serif text-[var(--amber-400)]">
                                    أقرب شريك طبي
                                </em>{' '}
                                لك
                            </h1>
                            <p className="mt-5 text-base leading-relaxed text-[rgba(247,242,234,0.75)] sm:text-lg">
                                مستشفيات، صيدليات، معامل تحاليل، مراكز أشعة،
                                عيادات أسنان، وبصريات في كل محافظات مصر — كلها
                                ببطاقة واحدة.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <div className="relative flex-1">
                                    <SearchIcon />
                                    <input
                                        type="search"
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder="ابحث باسم الشريك أو الخدمة..."
                                        className="w-full rounded-full border border-[rgba(247,242,234,0.15)] bg-[rgba(247,242,234,0.08)] py-3.5 pe-5 ps-12 text-sm text-[var(--cream)] placeholder:text-[rgba(247,242,234,0.5)] outline-none transition focus:border-[var(--amber-400)] focus:bg-[rgba(247,242,234,0.12)]"
                                    />
                                </div>
                                <select
                                    value={activeGov}
                                    onChange={(e) =>
                                        setActiveGov(e.target.value)
                                    }
                                    className="rounded-full border border-[rgba(247,242,234,0.15)] bg-[rgba(247,242,234,0.08)] px-5 py-3.5 text-sm font-semibold text-[var(--cream)] outline-none transition focus:border-[var(--amber-400)]"
                                >
                                    {GOVERNORATES.map((g) => (
                                        <option
                                            key={g}
                                            value={g}
                                            className="text-[var(--ink)]"
                                        >
                                            {g}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative z-[2] py-12 sm:py-16">
                    <div className="container">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                            <CategoryPill
                                active={activeCategory === ALL}
                                onClick={() => setActiveCategory(ALL)}
                                label={ALL}
                            />
                            {CATEGORIES.map((c) => (
                                <CategoryPill
                                    key={c.name}
                                    active={activeCategory === c.name}
                                    onClick={() => setActiveCategory(c.name)}
                                    label={c.name}
                                    icon={c.icon}
                                />
                            ))}
                        </div>

                        <div className="mt-6 flex items-center justify-between text-sm text-[var(--ink-soft)]">
                            <span>
                                <span className="font-bold text-[var(--teal-900)]">
                                    {filtered.length}
                                </span>{' '}
                                شريك متاح
                            </span>
                            {(activeCategory !== ALL ||
                                activeGov !== ALL_GOV ||
                                query) && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveCategory(ALL);
                                        setActiveGov(ALL_GOV);
                                        setQuery('');
                                    }}
                                    className="text-xs font-semibold text-[var(--teal-700)] underline-offset-4 hover:underline"
                                >
                                    مسح كل الفلاتر
                                </button>
                            )}
                        </div>

                        {filtered.length === 0 ? (
                            <div className="mt-12 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-[rgba(11,46,44,0.2)] bg-white p-12 text-center">
                                <h3 className="text-lg font-bold text-[var(--teal-900)]">
                                    لا توجد نتائج مطابقة
                                </h3>
                                <p className="text-sm text-[var(--ink-soft)]">
                                    جرّب تغيير التخصص أو المحافظة أو مسح كلمة
                                    البحث.
                                </p>
                            </div>
                        ) : (
                            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                                {filtered.map((p) => (
                                    <PartnerCard
                                        key={p.id}
                                        partner={p}
                                        onContact={() => setContactPartner(p)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <section className="relative z-[2] py-16 sm:py-20">
                    <div className="container">
                        <div className="flex flex-col items-center gap-5 rounded-[2.5rem] bg-gradient-to-br from-[var(--amber-500)] to-[var(--amber-600)] p-10 text-center sm:flex-row sm:gap-8 sm:text-start">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-[var(--teal-900)] sm:text-3xl">
                                    شريك طبي وتريد الانضمام لشبكتنا؟
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-[rgba(11,46,44,0.85)] sm:text-base">
                                    تواصل معنا اليوم لإضافة منشأتك الطبية إلى
                                    شبكة برايم ميديكال كارد والوصول لأكثر من ربع
                                    مليون عضو.
                                </p>
                            </div>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full bg-[var(--teal-900)] px-6 py-3 text-sm font-semibold text-[var(--cream)] transition hover:bg-[var(--teal-800)]"
                            >
                                اشترك كشريك
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                <SiteFooter />
                <MobileBottomNav />
                <FloatingActions />
            </div>

            {contactPartner && (
                <ContactModal
                    partner={contactPartner}
                    onClose={() => setContactPartner(null)}
                />
            )}
        </>
    );
}

function CategoryPill({
    active,
    onClick,
    label,
    icon,
}: {
    active: boolean;
    onClick: () => void;
    label: string;
    icon?: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ' +
                (active
                    ? 'border-[var(--teal-900)] bg-[var(--teal-900)] text-[var(--cream)]'
                    : 'border-[rgba(11,46,44,0.15)] bg-white text-[var(--teal-900)] hover:border-[var(--teal-700)]')
            }
        >
            {icon && (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                >
                    {icon}
                </svg>
            )}
            {label}
        </button>
    );
}

function PartnerCard({
    partner,
    onContact,
}: {
    partner: Partner;
    onContact: () => void;
}) {
    return (
        <article className="group flex h-full flex-col gap-3 rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white p-3 transition hover:-translate-y-1 hover:shadow-[0_28px_55px_-30px_rgba(11,46,44,0.5)] sm:gap-4 sm:p-6">
            <div className="flex items-start justify-between gap-2">
                <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white sm:h-14 sm:w-14 sm:text-base"
                    style={{ background: partner.accent }}
                >
                    {partner.initials}
                </div>
                <span className="rounded-full bg-[var(--amber-100)] px-2 py-1 text-[10px] font-bold text-[var(--amber-600)] sm:px-3 sm:text-[11px]">
                    {partner.discount}
                </span>
            </div>

            <div>
                <h3 className="text-base font-bold text-[var(--teal-900)]">
                    {partner.name}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--ink-soft)]">
                    <span className="inline-flex items-center gap-1 font-semibold text-[var(--teal-700)]">
                        {partner.category}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                        <PinIconSm />
                        {partner.governorate}
                    </span>
                    <span>•</span>
                    <span>{partner.branches} فرع</span>
                </div>
            </div>

            <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                {partner.description}
            </p>

            <div className="mt-auto flex items-center gap-1.5 border-t border-[rgba(11,46,44,0.08)] pt-3 sm:gap-2 sm:pt-4">
                <button
                    type="button"
                    onClick={onContact}
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-[var(--teal-900)] px-2 py-2 text-[11px] font-semibold text-[var(--cream)] transition hover:bg-[var(--teal-800)] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs"
                >
                    <PhoneIconSm />
                    اتصل
                </button>
                <Link
                    href={`/partners/${partner.id}`}
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-[rgba(11,46,44,0.15)] px-2 py-2 text-[11px] font-semibold text-[var(--teal-900)] transition hover:border-[var(--teal-700)] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs"
                >
                    تفاصيل
                </Link>
            </div>
        </article>
    );
}

function SearchIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgba(247,242,234,0.6)]"
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function PinIconSm() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
        >
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function PhoneIconSm() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
        >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
    );
}

function ContactModal({
    partner,
    onClose,
}: {
    partner: Partner;
    onClose: () => void;
}) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [onClose]);

    const subject = partner.subject ?? `${partner.category} في ${partner.governorate}`;
    const address = partner.address ?? `${partner.governorate}، مصر`;
    const whatsapp = partner.whatsapp ?? partner.phone;
    const whatsappHref = `https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={partner.name}
            className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
            >
                <button
                    type="button"
                    aria-label="إغلاق"
                    onClick={onClose}
                    className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--teal-900)] shadow transition hover:bg-white"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
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

                <div
                    className="flex h-32 items-center justify-center sm:h-40"
                    style={{
                        background: `linear-gradient(135deg, ${partner.accent}, ${partner.accent}cc)`,
                    }}
                >
                    {partner.image ? (
                        <img
                            src={partner.image}
                            alt={partner.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span className="text-3xl font-bold text-white sm:text-4xl">
                            {partner.initials}
                        </span>
                    )}
                </div>

                <div className="space-y-4 p-5 sm:p-6">
                    <div>
                        <span className="rounded-full bg-[var(--amber-100)] px-3 py-1 text-[11px] font-bold text-[var(--amber-600)]">
                            {partner.discount}
                        </span>
                        <h2 className="mt-2 text-lg font-bold text-[var(--teal-900)] sm:text-xl">
                            {partner.name}
                        </h2>
                        <p className="mt-1 text-sm text-[var(--ink-soft)]">
                            {subject}
                        </p>
                    </div>

                    <dl className="space-y-2 rounded-2xl bg-[rgba(11,46,44,0.04)] p-4 text-sm">
                        <ContactRow label="النوع" value={partner.category} />
                        <ContactRow label="المحافظة" value={partner.governorate} />
                        <ContactRow label="العنوان" value={address} />
                        <ContactRow label="الهاتف" value={partner.phone} />
                        <ContactRow label="واتساب" value={whatsapp} />
                        {partner.email && (
                            <ContactRow label="البريد" value={partner.email} />
                        )}
                    </dl>

                    <div className="grid grid-cols-3 gap-2">
                        <a
                            href={`tel:${partner.phone}`}
                            className="inline-flex items-center justify-center gap-1 rounded-full bg-[var(--teal-900)] px-3 py-2.5 text-xs font-semibold text-[var(--cream)] transition hover:bg-[var(--teal-800)]"
                        >
                            <PhoneIconSm />
                            اتصل
                        </a>
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 rounded-full bg-[#25D366] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1fb358]"
                        >
                            <WhatsappIcon />
                            واتساب
                        </a>
                        {partner.email ? (
                            <a
                                href={`mailto:${partner.email}`}
                                className="inline-flex items-center justify-center gap-1 rounded-full border border-[rgba(11,46,44,0.15)] px-3 py-2.5 text-xs font-semibold text-[var(--teal-900)] transition hover:border-[var(--teal-700)]"
                            >
                                <MailIcon />
                                بريد
                            </a>
                        ) : (
                            <span className="inline-flex items-center justify-center gap-1 rounded-full border border-[rgba(11,46,44,0.08)] px-3 py-2.5 text-xs font-semibold text-[var(--ink-soft)]">
                                —
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start justify-between gap-3">
            <dt className="shrink-0 font-semibold text-[var(--teal-900)]">
                {label}
            </dt>
            <dd className="text-end text-[var(--ink-soft)]">{value}</dd>
        </div>
    );
}

function WhatsappIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-3.5 w-3.5"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
        >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );
}

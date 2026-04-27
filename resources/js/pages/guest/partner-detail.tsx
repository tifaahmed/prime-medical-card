import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import FloatingActions from '@/components/floating-actions';
import SeoHead, {
    breadcrumbSchema,
    medicalBusinessSchema,
} from '@/components/seo-head';
import AnnounceBar from '@/components/home/announce-bar';
import MobileBottomNav from '@/components/home/mobile-bottom-nav';
import SiteFooter from '@/components/home/site-footer';
import SiteNav from '@/components/home/site-nav';
import { homeStyles } from '@/components/home/styles';
import {
    findPartner,
    getPartnerLocations,
    PARTNERS,
    type Partner,
    type PartnerBranch,
    type PartnerCategory,
} from '@/data/partners';

const CATEGORY_ICON: Record<PartnerCategory, React.ReactNode> = {
    مستشفيات: (
        <>
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
        </>
    ),
    صيدليات: (
        <>
            <path d="M10.5 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
        </>
    ),
    تحاليل: (
        <>
            <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
            <path d="M8.5 2h7" />
        </>
    ),
    أشعة: (
        <>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </>
    ),
    أسنان: (
        <path d="M19 10H5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h2.5L9 21h6l1.5-7H19a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2z" />
    ),
    بصريات: (
        <>
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
        </>
    ),
    'علاج طبيعي': (
        <>
            <path d="M6 2l.01 20" />
            <path d="M18 2l.01 20" />
            <path d="M2 6h20" />
            <path d="M2 18h20" />
        </>
    ),
};

export default function PartnerDetail() {
    const { auth, id, appUrl } = usePage<{
        auth: { user: { name: string } | null };
        id: string;
        appUrl: string;
    }>().props;
    const authUser = auth?.user ?? null;
    const partner = findPartner(id);
    const [copied, setCopied] = useState(false);
    const [saved, setSaved] = useState(false);
    const [quickPartner, setQuickPartner] = useState<Partner | null>(null);

    const handleShare = async () => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        try {
            if (navigator.share) {
                await navigator.share({ title: partner?.name, url });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
            }
        } catch {
            /* user cancelled */
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard blocked */
        }
    };

    if (!partner) {
        return (
            <>
                <SeoHead
                    title="شريك غير موجود — برايم ميديكال كارد"
                    description="الشريك المطلوب غير متاح."
                    noindex
                />
                <style dangerouslySetInnerHTML={{ __html: homeStyles }} />
                <div className="pm-home" dir="rtl" lang="ar">
                    <AnnounceBar />
                    <SiteNav authUser={authUser} />
                    <section className="container py-24 text-center">
                        <h1 className="text-3xl font-bold text-[var(--teal-900)]">
                            لم نعثر على هذا الشريك
                        </h1>
                        <p className="mt-3 text-[var(--ink-soft)]">
                            ربما تم إزالته أو غيّرت الرابط.
                        </p>
                        <Link
                            href="/partners"
                            className="mt-6 inline-flex rounded-full bg-[var(--teal-900)] px-6 py-3 text-sm font-semibold text-[var(--cream)]"
                        >
                            العودة لقائمة الشركاء
                        </Link>
                    </section>
                    <SiteFooter />
                    <MobileBottomNav />
                    <FloatingActions />
                </div>
            </>
        );
    }

    const subject =
        partner.subject ?? `${partner.category} في ${partner.governorate}`;
    const address = partner.address ?? `${partner.governorate}، مصر`;
    const whatsapp = partner.whatsapp ?? partner.phone;
    const whatsappHref = `https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`;
    const branches = getPartnerLocations(partner);

    return (
        <>
            <SeoHead
                title={`${partner.name} — ${partner.category} ${partner.discount}`}
                description={`${partner.description} ${partner.governorate}.`}
                image={partner.image}
                keywords={[
                    partner.name,
                    partner.category,
                    partner.governorate,
                    'شريك طبي',
                ]}
                jsonLd={[
                    medicalBusinessSchema(appUrl ?? '', {
                        name: partner.name,
                        category: partner.category,
                        phone: partner.phone,
                        address: partner.address,
                        governorate: partner.governorate,
                        path: `/partners/${partner.id}`,
                        image: partner.image,
                    }),
                    breadcrumbSchema(appUrl ?? '', [
                        { name: 'الرئيسية', path: '/' },
                        { name: 'الشركاء', path: '/partners' },
                        {
                            name: partner.name,
                            path: `/partners/${partner.id}`,
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

                <section className="container relative z-[2] pt-4 pb-12 sm:pt-6 sm:pb-20">
                    <Link
                        href="/partners"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--teal-700)] hover:text-[var(--teal-900)]"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                        العودة لقائمة الشركاء
                    </Link>

                    <div
                        className="mt-3 flex flex-col gap-3 overflow-hidden rounded-2xl p-3 shadow-md sm:flex-row sm:items-center sm:gap-4 sm:p-4"
                        style={{
                            background: `linear-gradient(135deg, ${partner.accent}, ${partner.accent}cc)`,
                        }}
                    >
                        {partner.image ? (
                            <img
                                src={partner.image}
                                alt={partner.name}
                                className="h-16 w-16 shrink-0 rounded-xl object-cover ring-2 ring-white/40 sm:h-20 sm:w-20"
                            />
                        ) : (
                            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-white/20 ring-2 ring-white/30 backdrop-blur-sm sm:h-20 sm:w-20">
                                <span className="text-xl font-bold text-white sm:text-2xl">
                                    {partner.initials}
                                </span>
                            </div>
                        )}

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--amber-500)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--teal-900)]">
                                    <SparkleIcon />
                                    {partner.discount}
                                </span>
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                                    {partner.category}
                                </span>
                            </div>
                            <h1 className="mt-1 text-xl font-bold leading-tight text-white sm:text-2xl">
                                {partner.name}
                            </h1>
                            <p className="text-xs text-white/80 sm:text-sm">
                                {subject}
                            </p>
                            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-white/85">
                                <span className="inline-flex items-center gap-1">
                                    <PinIcon />
                                    {partner.governorate}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <BranchIcon />
                                    {partner.branches} فرع
                                </span>
                                <a
                                    href={`tel:${partner.phone}`}
                                    className="inline-flex items-center gap-1 hover:text-white"
                                >
                                    <PhoneIcon />
                                    {partner.phone}
                                </a>
                            </div>
                        </div>

                        <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                            <a
                                href={`tel:${partner.phone}`}
                                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold text-[var(--teal-900)] shadow-sm transition hover:bg-white/90"
                            >
                                <PhoneIcon />
                                اتصل
                            </a>
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#1fb358]"
                            >
                                <WhatsAppIcon />
                                واتساب
                            </a>
                            <button
                                type="button"
                                onClick={handleShare}
                                aria-label="مشاركة"
                                className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md transition hover:bg-white/30"
                            >
                                <ShareIcon />
                            </button>
                            <button
                                type="button"
                                onClick={handleCopy}
                                aria-label={
                                    copied ? 'تم النسخ' : 'نسخ الرابط'
                                }
                                className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md transition hover:bg-white/30"
                            >
                                {copied ? <CheckIcon /> : <LinkIcon />}
                            </button>
                            <button
                                type="button"
                                onClick={() => setSaved((s) => !s)}
                                aria-label={
                                    saved ? 'إزالة من المفضلة' : 'حفظ'
                                }
                                className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md transition hover:bg-white/30"
                            >
                                <HeartIcon filled={saved} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-3 grid gap-3 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <div className="rounded-2xl border border-[rgba(11,46,44,0.08)] bg-white p-4">
                                <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                                    {partner.description}
                                </p>

                                <dl className="mt-3 grid gap-x-4 gap-y-1.5 border-t border-[rgba(11,46,44,0.08)] pt-3 text-xs sm:grid-cols-2">
                                    <CompactDetail
                                        label="المحافظة"
                                        value={partner.governorate}
                                    />
                                    <CompactDetail
                                        label="عدد الفروع"
                                        value={`${partner.branches}`}
                                    />
                                    <CompactDetail
                                        label="الهاتف"
                                        value={partner.phone}
                                    />
                                    <CompactDetail
                                        label="واتساب"
                                        value={whatsapp}
                                    />
                                    {partner.email && (
                                        <CompactDetail
                                            label="البريد"
                                            value={partner.email}
                                        />
                                    )}
                                    <CompactDetail
                                        label="العنوان"
                                        value={address}
                                    />
                                </dl>
                            </div>
                        </div>

                        {branches.length > 0 && (
                            <div className="lg:col-span-4">
                                <BranchesPreview branches={branches} />
                            </div>
                        )}

                        <div
                            className={
                                branches.length > 0
                                    ? 'lg:col-span-3'
                                    : 'lg:col-span-7'
                            }
                        >
                            <CompactMap
                                address={address}
                                name={partner.name}
                            />
                        </div>
                    </div>

                    {branches.length > 0 && (
                        <BranchesSection branches={branches} />
                    )}

                    <RelatedPartners
                        title="نفس المنشأة في محافظات أخرى"
                        emptyText="لا توجد فروع لهذه المنشأة في محافظات أخرى حالياً."
                        partners={PARTNERS.filter(
                            (p) =>
                                p.id !== partner.id &&
                                p.name === partner.name &&
                                p.governorate !== partner.governorate,
                        )}
                        onOpenPartner={setQuickPartner}
                    />

                    <RelatedPartners
                        title={`منشآت مشابهة في ${partner.governorate}`}
                        emptyText="لا توجد منشآت مشابهة في نفس المحافظة حالياً."
                        partners={PARTNERS.filter(
                            (p) =>
                                p.id !== partner.id &&
                                p.category === partner.category &&
                                p.governorate === partner.governorate,
                        )}
                        onOpenPartner={setQuickPartner}
                    />
                </section>

                {quickPartner && (
                    <PartnerQuickModal
                        partner={quickPartner}
                        onClose={() => setQuickPartner(null)}
                    />
                )}

                <SiteFooter />
                <MobileBottomNav />
                <FloatingActions />
            </div>
        </>
    );
}

function CompactDetail({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-baseline justify-between gap-2">
            <dt className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-[var(--teal-900)]">
                {label}
            </dt>
            <dd className="truncate text-end text-xs text-[var(--ink-soft)]">
                {value}
            </dd>
        </div>
    );
}

function BranchesPreview({ branches }: { branches: PartnerBranch[] }) {
    return (
        <div className="flex h-full flex-col rounded-2xl border border-[rgba(11,46,44,0.08)] bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-bold text-[var(--teal-900)]">
                    الفروع
                </h3>
                <span className="rounded-full bg-[rgba(11,46,44,0.06)] px-2 py-0.5 text-[10px] font-bold text-[var(--teal-900)]">
                    {branches.length}
                </span>
            </div>
            <ul className="hide-scroll-x flex max-h-[260px] flex-col gap-2 overflow-y-auto pr-1">
                {branches.map((b, i) => (
                    <li key={`${b.name}-${i}`}>
                        <a
                            href={
                                b.mapQuery
                                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`
                                    : '#'
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start gap-2 rounded-xl border border-[rgba(11,46,44,0.06)] p-2 transition hover:border-[var(--teal-700)] hover:bg-[rgba(11,46,44,0.03)]"
                        >
                            {b.image ? (
                                <img
                                    src={b.image}
                                    alt={b.name}
                                    loading="lazy"
                                    className="h-12 w-12 shrink-0 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[rgba(11,46,44,0.06)] text-[var(--teal-700)]">
                                    <BranchIcon />
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-xs font-bold text-[var(--teal-900)] group-hover:text-[var(--teal-800)]">
                                    {b.name}
                                </div>
                                <div className="mt-0.5 truncate text-[11px] text-[var(--ink-soft)]">
                                    {b.address}
                                </div>
                                {b.hours && (
                                    <div className="mt-0.5 truncate text-[10px] text-[var(--ink-soft)]/80">
                                        {b.hours}
                                    </div>
                                )}
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CompactMap({ address, name }: { address: string; name: string }) {
    const query = encodeURIComponent(`${name} ${address}`);
    const embedUrl = `https://maps.google.com/maps?q=${query}&hl=ar&z=15&output=embed`;
    const openUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(11,46,44,0.08)] bg-white">
            <iframe
                title={`موقع ${name} على الخريطة`}
                src={embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full lg:aspect-auto lg:flex-1"
            />
            <a
                href={openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 border-t border-[rgba(11,46,44,0.08)] py-2 text-[11px] font-semibold text-[var(--teal-900)] transition hover:bg-[rgba(11,46,44,0.04)]"
            >
                <PinIcon />
                افتح في خرائط جوجل
            </a>
        </div>
    );
}

function RelatedPartners({
    title,
    emptyText,
    partners,
    onOpenPartner,
}: {
    title: string;
    emptyText: string;
    partners: Partner[];
    onOpenPartner: (p: Partner) => void;
}) {
    return (
        <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-[var(--teal-900)] sm:text-2xl">
                {title}
            </h2>

            {partners.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[rgba(11,46,44,0.15)] bg-white px-5 py-6 text-center text-sm text-[var(--ink-soft)]">
                    {emptyText}
                </p>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {partners.map((p) => (
                        <RelatedPartnerCard
                            key={p.id}
                            partner={p}
                            onOpen={() => onOpenPartner(p)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function RelatedPartnerCard({
    partner,
    onOpen,
}: {
    partner: Partner;
    onOpen: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="group flex w-full items-center gap-3 rounded-2xl border border-[rgba(11,46,44,0.08)] bg-white p-3 text-start transition hover:-translate-y-0.5 hover:border-[var(--teal-700)] hover:shadow-md"
        >
            <div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-sm font-bold text-white"
                style={{ background: partner.accent }}
            >
                {partner.initials}
            </div>
            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-[var(--teal-900)] group-hover:text-[var(--teal-800)]">
                    {partner.name}
                </h3>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[var(--ink-soft)]">
                    <span className="inline-flex items-center gap-1">
                        <PinIcon />
                        {partner.governorate}
                    </span>
                    <span>•</span>
                    <span>{partner.branches} فروع</span>
                </div>
            </div>
            <span className="rounded-full bg-[var(--amber-100)] px-2 py-1 text-[10px] font-bold text-[var(--amber-600)]">
                {partner.discount}
            </span>
        </button>
    );
}

function BranchesSection({ branches }: { branches: PartnerBranch[] }) {
    return (
        <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-[var(--teal-900)] sm:text-2xl">
                فروعنا{' '}
                <span className="text-base font-medium text-[var(--ink-soft)]">
                    ({branches.length})
                </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {branches.map((b, i) => (
                    <BranchCard key={`${b.name}-${i}`} branch={b} />
                ))}
            </div>
        </div>
    );
}

function BranchCard({ branch }: { branch: PartnerBranch }) {
    const mapUrl = branch.mapQuery
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`
        : null;

    return (
        <article className="overflow-hidden rounded-2xl border border-[rgba(11,46,44,0.08)] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--teal-700)] hover:shadow-md">
            <div className="relative aspect-[16/10] bg-[rgba(11,46,44,0.06)]">
                {branch.image ? (
                    <img
                        src={branch.image}
                        alt={branch.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="grid h-full place-items-center text-[var(--teal-700)]/40">
                        <BranchIcon />
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-base font-bold text-[var(--teal-900)]">
                    {branch.name}
                </h3>

                <div className="mt-2 flex items-start gap-2 text-xs text-[var(--ink-soft)]">
                    <span className="mt-0.5 shrink-0 text-[var(--teal-700)]">
                        <PinIcon />
                    </span>
                    <span className="leading-relaxed">{branch.address}</span>
                </div>

                {branch.hours && (
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-[var(--ink-soft)]">
                        <span className="shrink-0 text-[var(--teal-700)]">
                            <ClockIcon />
                        </span>
                        <span>{branch.hours}</span>
                    </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                    {branch.phone && (
                        <a
                            href={`tel:${branch.phone}`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--teal-900)] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[var(--teal-800)]"
                        >
                            <PhoneIcon />
                            اتصل
                        </a>
                    )}
                    {mapUrl && (
                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(11,46,44,0.15)] px-3 py-1.5 text-xs font-semibold text-[var(--teal-900)] transition hover:border-[var(--teal-700)]"
                        >
                            <PinIcon />
                            الخريطة
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

function ClockIcon() {
    return (
        <svg {...ICON_PROPS} className="h-3.5 w-3.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function PartnerQuickModal({
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
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose]);

    const subject =
        partner.subject ?? `${partner.category} في ${partner.governorate}`;
    const address = partner.address ?? `${partner.governorate}، مصر`;
    const whatsapp = partner.whatsapp ?? partner.phone;
    const whatsappHref = `https://wa.me/${whatsapp.replace(/\D/g, '')}`;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={partner.name}
            onClick={onClose}
            className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
                className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
            >
                <button
                    type="button"
                    aria-label="إغلاق"
                    onClick={onClose}
                    className="absolute left-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[var(--teal-900)] shadow transition hover:bg-white"
                >
                    <CloseIcon />
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
                        <ContactRow
                            label="المحافظة"
                            value={partner.governorate}
                        />
                        <ContactRow label="العنوان" value={address} />
                        <ContactRow label="الهاتف" value={partner.phone} />
                        <ContactRow label="واتساب" value={whatsapp} />
                        {partner.email && (
                            <ContactRow
                                label="البريد"
                                value={partner.email}
                            />
                        )}
                    </dl>

                    <div className="grid grid-cols-3 gap-2">
                        <a
                            href={`tel:${partner.phone}`}
                            className="inline-flex items-center justify-center gap-1 rounded-full bg-[var(--teal-900)] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[var(--teal-800)]"
                        >
                            <PhoneIcon />
                            اتصل
                        </a>
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 rounded-full bg-[#25D366] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1fb358]"
                        >
                            واتساب
                        </a>
                        <Link
                            href={`/partners/${partner.id}`}
                            className="inline-flex items-center justify-center gap-1 rounded-full border border-[rgba(11,46,44,0.15)] px-3 py-2.5 text-xs font-semibold text-[var(--teal-900)] transition hover:border-[var(--teal-700)]"
                        >
                            التفاصيل
                        </Link>
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

function CloseIcon() {
    return (
        <svg {...ICON_PROPS} className="h-4 w-4" strokeWidth={2.5}>
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
    );
}

type QuickActionTone = 'teal' | 'green' | 'amber' | 'ink';

const TONE_STYLES: Record<QuickActionTone, string> = {
    teal: 'border-[rgba(11,46,44,0.1)] bg-white text-[var(--teal-800)] hover:border-[var(--teal-700)] hover:bg-[var(--teal-900)] hover:text-[var(--cream)]',
    green: 'border-[rgba(37,211,102,0.25)] bg-white text-[#1fb358] hover:border-[#25D366] hover:bg-[#25D366] hover:text-white',
    amber: 'border-[rgba(232,168,74,0.3)] bg-white text-[var(--amber-600)] hover:border-[var(--amber-500)] hover:bg-[var(--amber-500)] hover:text-[var(--teal-900)]',
    ink: 'border-[rgba(11,46,44,0.1)] bg-white text-[var(--ink-soft)] hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white',
};

function QuickAction({
    children,
    label,
    href,
    onClick,
    target,
    tone,
}: {
    children: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    target?: string;
    tone: QuickActionTone;
}) {
    const className = `group/qa flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${TONE_STYLES[tone]}`;
    const inner = (
        <>
            <span className="grid h-7 w-7 place-items-center transition-transform duration-200 group-hover/qa:scale-110">
                {children}
            </span>
            <span className="text-[11px] font-bold leading-none">{label}</span>
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                target={target}
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                className={className}
            >
                {inner}
            </a>
        );
    }

    return (
        <button type="button" onClick={onClick} className={className}>
            {inner}
        </button>
    );
}

const ICON_PROPS = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-full w-full',
};

function PhoneIcon() {
    return (
        <svg {...ICON_PROPS}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}

function WhatsAppIcon() {
    return (
        <svg {...ICON_PROPS}>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    );
}

function ShareIcon() {
    return (
        <svg {...ICON_PROPS}>
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
    );
}

function LinkIcon() {
    return (
        <svg {...ICON_PROPS}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg {...ICON_PROPS}>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function HeartIcon({ filled }: { filled: boolean }) {
    return (
        <svg
            {...ICON_PROPS}
            fill={filled ? 'currentColor' : 'none'}
            className="h-4 w-4"
        >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}

function PinIcon() {
    return (
        <svg {...ICON_PROPS} className="h-3.5 w-3.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function BranchIcon() {
    return (
        <svg {...ICON_PROPS} className="h-3.5 w-3.5">
            <path d="M3 21h18" />
            <path d="M5 21V7l8-4v18" />
            <path d="M19 21V11l-6-4" />
            <path d="M9 9v.01" />
            <path d="M9 12v.01" />
            <path d="M9 15v.01" />
        </svg>
    );
}

function TagIcon() {
    return (
        <svg {...ICON_PROPS} className="h-3.5 w-3.5">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg {...ICON_PROPS} className="h-4 w-4">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
        </svg>
    );
}

function SparkleIcon() {
    return (
        <svg {...ICON_PROPS} className="h-3.5 w-3.5">
            <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
        </svg>
    );
}

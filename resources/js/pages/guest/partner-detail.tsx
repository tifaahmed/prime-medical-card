import { Link, usePage } from '@inertiajs/react';
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
import { findPartner } from '@/data/partners';

export default function PartnerDetail() {
    const { auth, id, appUrl } = usePage<{
        auth: { user: { name: string } | null };
        id: string;
        appUrl: string;
    }>().props;
    const authUser = auth?.user ?? null;
    const partner = findPartner(id);

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

                <section className="container relative z-[2] py-8 sm:py-12">
                    <Link
                        href="/partners"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--teal-700)] hover:text-[var(--teal-900)]"
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
                        العودة لقائمة الشركاء
                    </Link>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr,2fr]">
                        <div
                            className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl shadow-lg"
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
                                <span className="text-6xl font-bold text-white sm:text-7xl">
                                    {partner.initials}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-5">
                            <div>
                                <span className="rounded-full bg-[var(--amber-100)] px-3 py-1 text-xs font-bold text-[var(--amber-600)]">
                                    {partner.discount}
                                </span>
                                <h1 className="mt-3 text-3xl font-bold text-[var(--teal-900)] sm:text-4xl">
                                    {partner.name}
                                </h1>
                                <p className="mt-2 text-base text-[var(--ink-soft)] sm:text-lg">
                                    {subject}
                                </p>
                            </div>

                            <p className="text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                                {partner.description}
                            </p>

                            <dl className="grid gap-3 rounded-2xl bg-[rgba(11,46,44,0.04)] p-5 text-sm sm:grid-cols-2">
                                <DetailRow
                                    label="النوع"
                                    value={partner.category}
                                />
                                <DetailRow
                                    label="المحافظة"
                                    value={partner.governorate}
                                />
                                <DetailRow label="العنوان" value={address} />
                                <DetailRow
                                    label="عدد الفروع"
                                    value={`${partner.branches}`}
                                />
                                <DetailRow
                                    label="الهاتف"
                                    value={partner.phone}
                                />
                                <DetailRow label="واتساب" value={whatsapp} />
                                {partner.email && (
                                    <DetailRow
                                        label="البريد"
                                        value={partner.email}
                                    />
                                )}
                            </dl>

                            <div className="flex flex-wrap gap-2">
                                <a
                                    href={`tel:${partner.phone}`}
                                    className="inline-flex items-center gap-2 rounded-full bg-[var(--teal-900)] px-5 py-3 text-sm font-semibold text-[var(--cream)] transition hover:bg-[var(--teal-800)]"
                                >
                                    اتصل الآن
                                </a>
                                <a
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1fb358]"
                                >
                                    واتساب
                                </a>
                                {partner.email && (
                                    <a
                                        href={`mailto:${partner.email}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-[rgba(11,46,44,0.15)] px-5 py-3 text-sm font-semibold text-[var(--teal-900)] transition hover:border-[var(--teal-700)]"
                                    >
                                        أرسل بريد
                                    </a>
                                )}
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

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start justify-between gap-3 border-b border-[rgba(11,46,44,0.08)] pb-2 last:border-b-0 last:pb-0 sm:border-b-0 sm:pb-0">
            <dt className="font-semibold text-[var(--teal-900)]">{label}</dt>
            <dd className="text-end text-[var(--ink-soft)]">{value}</dd>
        </div>
    );
}

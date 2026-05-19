import { Link, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import MembershipCardFront, {
    type CardLayout,
} from '@/components/membership-card-front';
import FloatingActions from '@/pages/guest/_components/floating-actions';
import SeoHead, { breadcrumbSchema } from '@/pages/guest/_components/seo-head';
import AnnounceBar from '@/pages/guest/_components/home/announce-bar';
import { ArrowLeftIcon } from '@/pages/guest/_components/home/icons';
import MobileBottomNav from '@/pages/guest/_components/home/mobile-bottom-nav';
import SiteFooter from '@/pages/guest/_components/home/site-footer';
import SiteNav from '@/pages/guest/_components/home/site-nav';
import { homeStyles } from '@/pages/guest/_components/home/styles';

type FamilyMember = {
    id: number;
    name: string;
    relationship_ar: string | null;
    date_of_birth: string | null;
    phone: string | null;
    email: string | null;
    is_active: boolean;
    photo_url: string | null;
};

type Membership = {
    id: number;
    membership_number: string;
    registration_date: string | null;
    expiration_date: string | null;
    is_active: boolean;
    is_visible: boolean;
    job_title_ar: string | null;
    job_title_en: string | null;
    company_name: string | null;
    card_first_name: string | null;
    card_full_name: string | null;
    card_layout: CardLayout;
    card_front_url: string | null;
    photo_url: string | null;
    holder_name: string | null;
    first_name: string | null;
    last_name: string | null;
    family: FamilyMember[];
};

type PageProps = {
    auth: { user: { name: string } | null };
    appUrl: string;
    number: string;
    membership: Membership | null;
};

const ACCENTS = ['#d68228', '#236b64', '#7fb3ad', '#1a544f', '#a35a2c'];

export default function MemberCard() {
    const { auth, appUrl, number, membership } = usePage<PageProps>().props;
    const authUser = auth?.user ?? null;
    const cardCaptureRef = useRef<HTMLDivElement | null>(null);
    const [downloading, setDownloading] = useState(false);
    const [flipped, setFlipped] = useState(false);

    if (!membership || !membership.is_visible) {
        return <NotFound number={number} appUrl={appUrl} authUser={authUser} />;
    }

    const familyCount = membership.family.length;
    const cardUrl = `${appUrl?.replace(/\/$/, '') ?? ''}/card/${membership.membership_number}`;

    const downloadCard = async () => {
        if (membership.card_front_url) {
            const a = document.createElement('a');
            a.href = membership.card_front_url;
            a.download = `card-${membership.membership_number}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            return;
        }
        const node = cardCaptureRef.current;
        if (!node) return;
        try {
            setDownloading(true);
            const { toPng } = await import('html-to-image');
            const dataUrl = await toPng(node, {
                cacheBust: true,
                pixelRatio: 2,
                backgroundColor: '#ffffff',
            });
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `card-${membership.membership_number}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } finally {
            setDownloading(false);
        }
    };

    const cardFront = membership.card_front_url ? (
        <div
            className="relative w-full overflow-hidden rounded-2xl border shadow-sm"
            style={{ aspectRatio: '1096 / 686' }}
        >
            <img
                src={membership.card_front_url}
                alt={`بطاقة ${membership.membership_number}`}
                className="absolute inset-0 h-full w-full object-cover"
            />
        </div>
    ) : (
        <MembershipCardFront
            firstName={
                membership.card_first_name ?? membership.first_name ?? ''
            }
            fullName={
                membership.card_full_name ?? membership.last_name ?? ''
            }
            workPlace={membership.job_title_en ?? ''}
            companyName={membership.company_name ?? ''}
            expirationDate={membership.expiration_date ?? ''}
            photoUrl={membership.photo_url}
            qrValue={cardUrl}
            layout={membership.card_layout}
        />
    );

    return (
        <>
            <SeoHead
                title={`بطاقة ${membership.membership_number} — برايم ميديكال كارد`}
                description="بيانات بطاقة العضوية، تفاصيل العضو وأفراد العائلة."
                noindex
                jsonLd={[
                    breadcrumbSchema(appUrl ?? '', [
                        { name: 'الرئيسية', path: '/' },
                        {
                            name: 'بطاقة العضوية',
                            path: `/card/${membership.membership_number}`,
                        },
                    ]),
                ]}
            >
            </SeoHead>
            <style dangerouslySetInnerHTML={{ __html: homeStyles }} />

            <div className="pm-home" dir="rtl" lang="ar">
                <AnnounceBar />
                <SiteNav authUser={authUser} />

                <section className="relative z-[2] bg-[var(--cream)] py-8 sm:py-12 lg:py-16">
                    <div className="container">
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
                            <div className="mx-auto w-full max-w-md lg:max-w-none">
                                <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
                                    <div className="size-32 rounded-full bg-white p-1 shadow-[0_18px_40px_-18px_rgba(11,46,44,0.4)]">
                                        {membership.photo_url ? (
                                            <img
                                                src={membership.photo_url}
                                                alt=""
                                                className="h-full w-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--cream-dark)] text-2xl font-bold text-[var(--teal-900)]">
                                                {initials(
                                                    membership.holder_name,
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <h1
                                        className="mt-5 text-2xl leading-tight font-bold text-[var(--teal-900)] sm:text-3xl"
                                        dir="ltr"
                                    >
                                        {membership.card_first_name ||
                                            nameFirstPart(
                                                membership.holder_name,
                                            ) ||
                                            'Prime Member'}
                                        {(membership.card_full_name ||
                                            nameRestPart(
                                                membership.holder_name,
                                            )) && (
                                            <>
                                                <br />
                                                {membership.card_full_name ||
                                                    nameRestPart(
                                                        membership.holder_name,
                                                    )}
                                            </>
                                        )}
                                    </h1>
                                </div>

                                <div className="mt-8 space-y-3">
                                    <InfoCard
                                        label="الاسم الأول"
                                        value={membership.first_name}
                                        accent="#3e7dba"
                                    />
                                    <InfoCard
                                        label="الاسم الأخير"
                                        value={membership.last_name}
                                        accent="#3e7dba"
                                    />
                                    <InfoCard
                                        label="المسمى الوظيفي"
                                        value={membership.job_title_ar}
                                        accent="#3e7dba"
                                    />
                                    <InfoCard
                                        label="رقم العضوية"
                                        value={membership.membership_number}
                                        accent="#2bb573"
                                        dir="ltr"
                                    />
                                    <InfoCard
                                        label="اسم الشركة"
                                        value={membership.company_name}
                                        accent="#e0a456"
                                    />
                                </div>
                            </div>

                            <div className="lg:sticky lg:top-6">
                                <div style={{ perspective: '1500px' }}>
                                    <div
                                        onClick={() => setFlipped((f) => !f)}
                                        className="relative w-full cursor-pointer transition-transform duration-700"
                                        style={{
                                            aspectRatio: '1096 / 686',
                                            transformStyle: 'preserve-3d',
                                            transform: flipped
                                                ? 'rotateY(180deg)'
                                                : 'rotateY(0deg)',
                                        }}
                                        title="اضغط لقلب البطاقة"
                                    >
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility:
                                                    'hidden',
                                            }}
                                        >
                                            {cardFront}
                                        </div>
                                        <div
                                            className="absolute inset-0 overflow-hidden rounded-2xl border shadow-sm"
                                            style={{
                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility:
                                                    'hidden',
                                                transform: 'rotateY(180deg)',
                                            }}
                                        >
                                            <img
                                                src="/images/card/back.jpeg"
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                                    <button
                                        type="button"
                                        onClick={downloadCard}
                                        disabled={downloading}
                                        className="inline-flex items-center gap-2 rounded-full bg-[var(--teal-900)] px-5 py-2.5 text-sm font-semibold text-[var(--cream)] transition hover:bg-[var(--teal-800)] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {downloading
                                            ? 'جارٍ التحضير…'
                                            : 'تنزيل البطاقة (PNG)'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFlipped((f) => !f)
                                        }
                                        className="inline-flex items-center gap-2 rounded-full border border-[rgba(11,46,44,0.15)] px-5 py-2.5 text-sm font-semibold text-[var(--teal-900)] transition hover:border-[var(--teal-700)]"
                                    >
                                        {flipped
                                            ? 'عرض الوجه الأمامي'
                                            : 'عرض الوجه الخلفي'}
                                    </button>
                                    <Link
                                        href="/partners"
                                        className="inline-flex items-center gap-2 rounded-full border border-[rgba(11,46,44,0.15)] px-5 py-2.5 text-sm font-semibold text-[var(--teal-900)] transition hover:border-[var(--teal-700)]"
                                    >
                                        تصفح شبكة الشركاء
                                        <ArrowLeftIcon />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    ref={cardCaptureRef}
                    aria-hidden
                    className="pointer-events-none fixed top-0 -left-[9999px] w-[1096px]"
                >
                    {cardFront}
                </div>

                {familyCount > 0 && (
                    <section className="relative z-[2] bg-[rgba(11,46,44,0.04)] py-14 sm:py-20">
                        <div className="container">
                            <div className="mx-auto max-w-2xl text-center">
                                <span className="inline-flex items-center rounded-full bg-[var(--amber-100)] px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[var(--amber-600)] uppercase">
                                    أفراد العائلة
                                </span>
                                <h2 className="mt-4 text-3xl font-bold text-[var(--teal-900)] sm:text-4xl">
                                    {familyCount}{' '}
                                    {familyCount === 1
                                        ? 'فرد مرتبط بالحساب'
                                        : 'أفراد مرتبطون بالحساب'}
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                                    كل فرد من عائلتك يستفيد من نفس الخصومات في
                                    كل الشبكة.
                                </p>
                            </div>

                            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                {membership.family.map((m, i) => (
                                    <FamilyCard
                                        key={m.id}
                                        member={m}
                                        accent={
                                            ACCENTS[i % ACCENTS.length] ??
                                            '#0b2e2c'
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <SiteFooter />
                <MobileBottomNav />
                <FloatingActions />
            </div>
        </>
    );
}

function NotFound({
    number,
    appUrl,
    authUser,
}: {
    number: string;
    appUrl: string;
    authUser: { name: string } | null;
}) {
    return (
        <>
            <SeoHead
                title="بطاقة غير موجودة — برايم ميديكال كارد"
                description="رقم البطاقة الذي أدخلته غير مسجل لدينا."
                noindex
                jsonLd={[
                    breadcrumbSchema(appUrl ?? '', [
                        { name: 'الرئيسية', path: '/' },
                        { name: 'بطاقة العضوية', path: `/card/${number}` },
                    ]),
                ]}
            >
            </SeoHead>
            <style dangerouslySetInnerHTML={{ __html: homeStyles }} />

            <div className="pm-home" dir="rtl" lang="ar">
                <AnnounceBar />
                <SiteNav authUser={authUser} />

                <section className="relative z-[2] py-20 sm:py-28">
                    <div className="container">
                        <div className="mx-auto max-w-xl rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white p-8 text-center shadow-[0_18px_40px_-30px_rgba(11,46,44,0.5)]">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fdecec] text-[#c0392b]">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-8 w-8"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                </svg>
                            </div>
                            <h1 className="mt-6 text-2xl font-bold text-[var(--teal-900)] sm:text-3xl">
                                لم نعثر على هذا الكارت
                            </h1>
                            <p className="mt-3 text-sm text-[var(--ink-soft)]">
                                الرقم{' '}
                                <span
                                    dir="ltr"
                                    className="rounded bg-[rgba(11,46,44,0.06)] px-2 py-0.5 font-mono text-[var(--teal-900)]"
                                >
                                    {number}
                                </span>{' '}
                                غير مسجل في قاعدة بياناتنا، أو قد يكون مخفياً.
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center gap-2">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 rounded-full bg-[var(--teal-900)] px-5 py-2.5 text-sm font-semibold text-[var(--cream)] transition hover:bg-[var(--teal-800)]"
                                >
                                    الرئيسية
                                    <ArrowLeftIcon />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(11,46,44,0.15)] px-5 py-2.5 text-sm font-semibold text-[var(--teal-900)] transition hover:border-[var(--teal-700)]"
                                >
                                    تواصل مع الدعم
                                </Link>
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

function MemberAvatar({
    initials,
    accent,
    size = 56,
}: {
    initials: string;
    accent: string;
    size?: number;
}) {
    return (
        <div
            className="flex shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white"
            style={{
                width: size,
                height: size,
                background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
            }}
        >
            {initials}
        </div>
    );
}

function FamilyCard({
    member,
    accent,
}: {
    member: FamilyMember;
    accent: string;
}) {
    const age = member.date_of_birth ? ageFromDob(member.date_of_birth) : null;

    return (
        <article className="group relative overflow-hidden rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white p-5 shadow-[0_18px_40px_-30px_rgba(11,46,44,0.5)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,46,44,0.6)]">
            <div
                className="pointer-events-none absolute -top-8 -left-8 h-24 w-24 rounded-full opacity-15"
                style={{ background: accent }}
            ></div>
            <div className="relative flex items-center gap-3">
                {member.photo_url ? (
                    <img
                        src={member.photo_url}
                        alt=""
                        className="size-14 shrink-0 rounded-2xl object-cover"
                    />
                ) : (
                    <MemberAvatar
                        initials={initials(member.name)}
                        accent={accent}
                        size={56}
                    />
                )}
                <div>
                    <h3 className="text-base font-bold text-[var(--teal-900)]">
                        {member.name}
                    </h3>
                    <p className="text-xs text-[var(--ink-soft)]">
                        {member.relationship_ar ?? '—'}
                        {age !== null && ` • ${age} سنة`}
                    </p>
                </div>
            </div>
            {(member.phone || member.email) && (
                <div className="mt-4 space-y-1 text-xs text-[var(--ink-soft)]">
                    {member.phone && <div dir="ltr">{member.phone}</div>}
                    {member.email && <div dir="ltr">{member.email}</div>}
                </div>
            )}
            <div className="mt-3 flex items-center justify-between text-xs">
                <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-bold ${
                        member.is_active
                            ? 'bg-[#e7f5ee] text-[#0e8a4f]'
                            : 'bg-[#fdecec] text-[#c0392b]'
                    }`}
                >
                    <span
                        className={`h-1.5 w-1.5 rounded-full ${member.is_active ? 'bg-[#0e8a4f]' : 'bg-[#c0392b]'}`}
                    ></span>
                    {member.is_active ? 'مفعّل' : 'غير مفعّل'}
                </span>
            </div>
        </article>
    );
}

function InfoCard({
    label,
    value,
    accent,
    dir,
}: {
    label: string;
    value: string | null;
    accent: string;
    dir?: 'ltr' | 'rtl';
}) {
    if (!value) {
        return null;
    }
    return (
        <div className="relative overflow-hidden rounded-2xl bg-white px-5 py-4 shadow-[0_6px_20px_-12px_rgba(11,46,44,0.25)]">
            <div
                className="absolute top-3 bottom-3 end-0 w-1.5 rounded-s-full"
                style={{ background: accent }}
            />
            <div
                className="text-sm font-bold"
                style={{ color: accent }}
            >
                {label}
            </div>
            <div className="my-2 border-b border-dashed border-[rgba(11,46,44,0.12)]" />
            <div
                className="text-base font-semibold text-[var(--teal-900)]"
                dir={dir}
                style={dir === 'ltr' ? { textAlign: 'start' } : undefined}
            >
                {value}
            </div>
        </div>
    );
}

function nameFirstPart(name: string | null): string | null {
    if (!name) return null;
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length <= 2) return parts.join(' ') || null;
    return parts.slice(0, 2).join(' ');
}

function nameRestPart(name: string | null): string | null {
    if (!name) return null;
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length <= 2) return null;
    return parts.slice(2).join(' ');
}

function ageFromDob(dob: string): number | null {
    const d = new Date(dob);
    if (isNaN(d.getTime())) {
        return null;
    }
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) {
        age--;
    }
    return age;
}

function initials(name: string | null): string {
    if (!name) {
        return '؟';
    }
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p.charAt(0))
        .join('');
}

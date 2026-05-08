import { Link, usePage } from '@inertiajs/react';
import FloatingActions from '@/pages/guest/_components/floating-actions';
import SeoHead, { breadcrumbSchema } from '@/pages/guest/_components/seo-head';
import AnnounceBar from '@/pages/guest/_components/home/announce-bar';
import {
    ArrowLeftIcon,
    CheckShieldIcon,
    HeartIcon,
    UsersIcon,
} from '@/pages/guest/_components/home/icons';
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
    photo_url: string | null;
    holder_name: string | null;
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

    if (!membership || !membership.is_visible) {
        return <NotFound number={number} appUrl={appUrl} authUser={authUser} />;
    }

    const displayNumber = formatCardDisplay(membership.membership_number);
    const maskedNumber = maskCardNumber(membership.membership_number);
    const familyCount = membership.family.length;
    const expiryShort = membership.expiration_date
        ? formatExpiryShort(membership.expiration_date)
        : '—';
    const memberSince = membership.registration_date
        ? formatRegistrationDate(membership.registration_date)
        : '—';

    const PERKS = [
        {
            icon: <CheckShieldIcon />,
            title: membership.is_active ? 'بطاقة سارية' : 'غير مفعّلة',
            sub: `حتى ${expiryShort}`,
        },
        {
            icon: <UsersIcon />,
            title: `${familyCount} ${familyCount === 1 ? 'فرد' : 'أفراد'} عائلة`,
            sub: 'مرتبطون بالحساب',
        },
        { icon: <HeartIcon />, title: 'خصم حتى ٧٠٪', sub: 'في كل الشبكة' },
    ];

    const holderShort = membership.holder_name?.split(' ')[0] ?? 'عميلنا الكريم';

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

                <section className="relative z-[2] overflow-hidden bg-gradient-to-b from-[var(--teal-900)] to-[var(--teal-800)] py-16 sm:py-20">
                    <div className="container">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <div className="text-center lg:text-start">
                                <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(247,242,234,0.1)] px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[var(--amber-400)] uppercase">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-400)]"></span>
                                    {membership.is_active
                                        ? 'مفعّلة'
                                        : 'غير مفعّلة'}
                                </span>
                                <h1 className="mt-4 text-3xl leading-tight font-bold text-[var(--cream)] sm:text-4xl lg:text-5xl">
                                    أهلاً، {holderShort}
                                    <br />
                                    <span className="text-[var(--amber-400)]">
                                        بطاقتك جاهزة للاستخدام
                                    </span>
                                </h1>
                                <p className="mt-4 text-sm leading-relaxed text-[rgba(247,242,234,0.7)] sm:text-base">
                                    هذه بطاقة عضويتك المميزة، اعرضها في أي جهة
                                    من شبكتنا لتحصل على أفضل الخصومات لك ولأفراد
                                    عائلتك.
                                </p>

                                <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                                    {PERKS.map((p) => (
                                        <div
                                            key={p.title}
                                            className="rounded-2xl bg-[rgba(247,242,234,0.06)] p-3 text-center backdrop-blur-sm sm:p-4"
                                        >
                                            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[var(--amber-400)] text-[var(--teal-900)] sm:h-10 sm:w-10">
                                                {p.icon}
                                            </div>
                                            <div className="mt-2 text-xs font-bold text-[var(--cream)] sm:text-sm">
                                                {p.title}
                                            </div>
                                            <div className="text-[10px] text-[rgba(247,242,234,0.7)] sm:text-xs">
                                                {p.sub}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative mx-auto w-full max-w-[420px]">
                                <BigMemberCard
                                    number={displayNumber}
                                    holder={
                                        membership.holder_name ||
                                        'PRIME MEMBER'
                                    }
                                    photoUrl={membership.photo_url}
                                    expiryShort={expiryShort}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative z-[2] py-14 sm:py-20">
                    <div className="container">
                        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                            <div className="rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(11,46,44,0.5)] sm:p-8">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <span className="rounded-full bg-[var(--amber-100)] px-3 py-1 text-[11px] font-semibold tracking-wider text-[var(--amber-600)] uppercase">
                                            بيانات العضو
                                        </span>
                                        <h2 className="mt-3 text-2xl font-bold text-[var(--teal-900)] sm:text-3xl">
                                            {membership.holder_name || '—'}
                                        </h2>
                                        {membership.job_title_ar && (
                                            <p className="mt-1 text-sm text-[var(--ink-soft)]">
                                                {membership.job_title_ar}
                                            </p>
                                        )}
                                    </div>
                                    {membership.photo_url ? (
                                        <img
                                            src={membership.photo_url}
                                            alt=""
                                            className="size-[72px] shrink-0 rounded-2xl object-cover shadow"
                                        />
                                    ) : (
                                        <MemberAvatar
                                            initials={initials(
                                                membership.holder_name,
                                            )}
                                            accent="#0b2e2c"
                                            size={72}
                                        />
                                    )}
                                </div>

                                <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
                                    <Field
                                        label="رقم العضوية"
                                        value={membership.membership_number}
                                        dir="ltr"
                                    />
                                    <Field
                                        label="عضو منذ"
                                        value={memberSince}
                                    />
                                    {membership.expiration_date && (
                                        <Field
                                            label="تنتهي في"
                                            value={
                                                membership.expiration_date
                                            }
                                            dir="ltr"
                                        />
                                    )}
                                    <Field
                                        label="الحالة"
                                        value={
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                                                    membership.is_active
                                                        ? 'bg-[#e7f5ee] text-[#0e8a4f]'
                                                        : 'bg-[#fdecec] text-[#c0392b]'
                                                }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${membership.is_active ? 'bg-[#0e8a4f]' : 'bg-[#c0392b]'}`}
                                                ></span>
                                                {membership.is_active
                                                    ? 'مفعّلة'
                                                    : 'غير مفعّلة'}
                                            </span>
                                        }
                                    />
                                </dl>
                            </div>

                            <div className="rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(11,46,44,0.5)] sm:p-8">
                                <span className="rounded-full bg-[var(--amber-100)] px-3 py-1 text-[11px] font-semibold tracking-wider text-[var(--amber-600)] uppercase">
                                    تفاصيل البطاقة
                                </span>
                                <h2 className="mt-3 text-2xl font-bold text-[var(--teal-900)] sm:text-3xl">
                                    رقم البطاقة
                                </h2>

                                <div
                                    className="mt-4 rounded-2xl bg-[rgba(11,46,44,0.04)] px-4 py-3 font-mono text-lg font-semibold text-[var(--teal-900)] sm:text-xl"
                                    dir="ltr"
                                >
                                    {displayNumber}
                                </div>
                                <p className="mt-2 text-xs text-[var(--ink-soft)]">
                                    يظهر مختصراً عند العرض:{' '}
                                    <span dir="ltr">{maskedNumber}</span>
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    <Link
                                        href="/partners"
                                        className="inline-flex items-center gap-2 rounded-full bg-[var(--teal-900)] px-5 py-2.5 text-sm font-semibold text-[var(--cream)] transition hover:bg-[var(--teal-800)]"
                                    >
                                        تصفح شبكة الشركاء
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
                    </div>
                </section>

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

function Field({
    label,
    value,
    dir,
}: {
    label: string;
    value: React.ReactNode;
    dir?: 'ltr' | 'rtl';
}) {
    return (
        <div>
            <dt className="text-[11px] font-semibold tracking-wider text-[var(--ink-soft)] uppercase">
                {label}
            </dt>
            <dd
                className="mt-1 font-semibold text-[var(--teal-900)]"
                dir={dir}
                style={dir === 'ltr' ? { textAlign: 'start' } : undefined}
            >
                {value}
            </dd>
        </div>
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

function BigMemberCard({
    number,
    holder,
    photoUrl,
    expiryShort,
}: {
    number: string;
    holder: string;
    photoUrl: string | null;
    expiryShort: string;
}) {
    void photoUrl;

    return (
        <div
            className="relative aspect-[1.586/1] w-full overflow-hidden rounded-[28px] p-7 text-[var(--cream)] shadow-[0_40px_80px_-30px_rgba(11,46,44,0.6)]"
            style={{
                background:
                    'linear-gradient(135deg, var(--teal-800) 0%, var(--teal-900) 60%, #082322 100%)',
            }}
        >
            <div
                className="pointer-events-none absolute -top-1/3 -right-1/4 h-[140%] w-[80%] rounded-full"
                style={{
                    background:
                        'radial-gradient(circle, rgba(232,168,74,0.22), transparent 60%)',
                }}
            ></div>
            <div
                className="pointer-events-none absolute -bottom-1/3 -left-1/4 h-[140%] w-[80%] rounded-full"
                style={{
                    background:
                        'radial-gradient(circle, rgba(255,255,255,0.08), transparent 65%)',
                }}
            ></div>

            <div className="relative flex items-start justify-between">
                <div>
                    <div className="font-display text-xl font-bold tracking-wide">
                        برايم
                    </div>
                    <div className="mt-1 text-[10px] font-medium tracking-[0.3em] text-[rgba(247,242,234,0.7)] uppercase">
                        Medical Card
                    </div>
                </div>
                <div className="h-10 w-14 rounded-md border border-white/25 bg-gradient-to-br from-white/35 to-white/10"></div>
            </div>

            <div
                className="relative mt-10 font-mono text-xl tracking-[0.18em] sm:text-2xl"
                dir="ltr"
            >
                {number}
            </div>

            <div className="relative mt-6 flex items-end justify-between">
                <div>
                    <div className="text-[9px] font-semibold tracking-[0.25em] text-[rgba(247,242,234,0.6)] uppercase">
                        Cardholder
                    </div>
                    <div className="mt-0.5 text-sm font-semibold tracking-wider uppercase sm:text-base">
                        {holder}
                    </div>
                </div>
                <div>
                    <div className="text-[9px] font-semibold tracking-[0.25em] text-[rgba(247,242,234,0.6)] uppercase">
                        Valid Thru
                    </div>
                    <div className="mt-0.5 text-sm font-semibold tracking-wider sm:text-base">
                        {expiryShort}
                    </div>
                </div>
            </div>
        </div>
    );
}

function formatCardDisplay(raw: string): string {
    return raw.replace(/(.{4})/g, '$1 ').trim();
}

function maskCardNumber(raw: string): string {
    const stripped = raw.replace(/\s/g, '');
    if (stripped.length <= 8) {
        return stripped;
    }
    const first = stripped.slice(0, 4);
    const last = stripped.slice(-4);
    return `${first} •••• •••• ${last}`;
}

function formatExpiryShort(date: string): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return date;
    }
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${month} / ${year}`;
}

function formatRegistrationDate(date: string): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return date;
    }
    const months = [
        'يناير',
        'فبراير',
        'مارس',
        'إبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر',
    ];
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
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

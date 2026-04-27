import { Link, usePage } from '@inertiajs/react';
import FloatingActions from '@/components/floating-actions';
import SeoHead, { breadcrumbSchema } from '@/components/seo-head';
import AnnounceBar from '@/components/home/announce-bar';
import {
    ArrowLeftIcon,
    CheckShieldIcon,
    HeartIcon,
    UsersIcon,
} from '@/components/home/icons';
import MobileBottomNav from '@/components/home/mobile-bottom-nav';
import SiteFooter from '@/components/home/site-footer';
import SiteNav from '@/components/home/site-nav';
import { homeStyles } from '@/components/home/styles';

type FamilyMember = {
    name: string;
    relation: string;
    age: number;
    avatar: string;
    accent: string;
    cardSuffix: string;
};

const HOLDER = {
    name: 'مصطفى حسن إبراهيم',
    nameLatin: 'MOSTAFA HASSAN',
    nationalId: '٢٩٠٠٥١٢٠١٢٣٤٥٦',
    phone: '٠١٠٠ ٢٢٣ ٤٥٦٧',
    email: 'mostafa.hassan@example.com',
    governorate: 'القاهرة',
    plan: 'الباقة العائلية المميزة',
    memberSince: 'يناير ٢٠٢٤',
    status: 'مفعّلة',
};

const FAMILY: FamilyMember[] = [
    {
        name: 'نور حسن',
        relation: 'الزوجة',
        age: 34,
        avatar: 'نح',
        accent: '#d68228',
        cardSuffix: '4263',
    },
    {
        name: 'يوسف حسن',
        relation: 'الابن',
        age: 9,
        avatar: 'يح',
        accent: '#236b64',
        cardSuffix: '8821',
    },
    {
        name: 'مريم حسن',
        relation: 'الابنة',
        age: 6,
        avatar: 'مح',
        accent: '#7fb3ad',
        cardSuffix: '5519',
    },
    {
        name: 'حسن إبراهيم',
        relation: 'الأب',
        age: 64,
        avatar: 'حإ',
        accent: '#1a544f',
        cardSuffix: '9072',
    },
];

const QR_PATTERN = [
    1, 1, 0, 1,
    0, 1, 1, 0,
    1, 0, 1, 1,
    1, 1, 0, 1,
];

const PERKS = [
    { icon: <CheckShieldIcon />, title: 'بطاقة سارية', sub: 'حتى ١٢ / ٢٠٢٨' },
    { icon: <UsersIcon />, title: '٤ أفراد عائلة', sub: 'مغطّون بالكامل' },
    { icon: <HeartIcon />, title: 'خصم حتى ٧٠٪', sub: 'في كل الشبكة' },
];

export default function MemberCard() {
    const { auth, appUrl, number } = usePage<{
        auth: { user: { name: string } | null };
        appUrl: string;
        number: string;
    }>().props;
    const authUser = auth?.user ?? null;

    const digits = (number ?? '').replace(/\D/g, '').padEnd(16, '0').slice(0, 16);
    const displayNumber = digits.replace(/(.{4})/g, '$1 ').trim();
    const maskedNumber = `${digits.slice(0, 4)} •••• •••• ${digits.slice(-4)}`;

    return (
        <>
            <SeoHead
                title="بطاقة العضوية — برايم ميديكال كارد"
                description="بيانات بطاقة العضوية، تفاصيل العضو وأفراد العائلة."
                jsonLd={[
                    breadcrumbSchema(appUrl ?? '', [
                        { name: 'الرئيسية', path: '/' },
                        { name: 'بطاقة العضوية', path: `/card/${digits}` },
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
                <meta name="robots" content="noindex" />
            </SeoHead>
            <style dangerouslySetInnerHTML={{ __html: homeStyles }} />

            <div className="pm-home" dir="rtl" lang="ar">
                <AnnounceBar />
                <SiteNav authUser={authUser} />

                <section className="relative z-[2] overflow-hidden bg-gradient-to-b from-[var(--teal-900)] to-[var(--teal-800)] py-16 sm:py-20">
                    <div className="container">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <div className="text-center lg:text-start">
                                <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(247,242,234,0.1)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--amber-400)]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-400)]"></span>
                                    {HOLDER.status}
                                </span>
                                <h1 className="mt-4 text-3xl font-bold leading-tight text-[var(--cream)] sm:text-4xl lg:text-5xl">
                                    أهلاً، {HOLDER.name.split(' ')[0]}
                                    <br />
                                    <span className="text-[var(--amber-400)]">
                                        بطاقتك جاهزة للاستخدام
                                    </span>
                                </h1>
                                <p className="mt-4 text-sm leading-relaxed text-[rgba(247,242,234,0.7)] sm:text-base">
                                    هذه بطاقة عضويتك المميزة، اعرضها في أي جهة من
                                    شبكتنا لتحصل على أفضل الخصومات لك ولأفراد عائلتك.
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
                                    holder={HOLDER.nameLatin}
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
                                        <span className="rounded-full bg-[var(--amber-100)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--amber-600)]">
                                            بيانات العضو
                                        </span>
                                        <h2 className="mt-3 text-2xl font-bold text-[var(--teal-900)] sm:text-3xl">
                                            {HOLDER.name}
                                        </h2>
                                        <p className="mt-1 text-sm text-[var(--ink-soft)]">
                                            {HOLDER.plan}
                                        </p>
                                    </div>
                                    <MemberAvatar
                                        initials="مح"
                                        accent="#0b2e2c"
                                        size={72}
                                    />
                                </div>

                                <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
                                    <Field label="الرقم القومي" value={HOLDER.nationalId} />
                                    <Field label="الهاتف" value={HOLDER.phone} dir="ltr" />
                                    <Field label="البريد" value={HOLDER.email} dir="ltr" />
                                    <Field label="المحافظة" value={HOLDER.governorate} />
                                    <Field label="عضو منذ" value={HOLDER.memberSince} />
                                    <Field
                                        label="الحالة"
                                        value={
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e7f5ee] px-2.5 py-1 text-xs font-bold text-[#0e8a4f]">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#0e8a4f]"></span>
                                                {HOLDER.status}
                                            </span>
                                        }
                                    />
                                </dl>
                            </div>

                            <div className="rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(11,46,44,0.5)] sm:p-8">
                                <span className="rounded-full bg-[var(--amber-100)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--amber-600)]">
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
                                    يظهر مختصراً عند العرض: {maskedNumber}
                                </p>

                                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                                    <Field label="نوع البطاقة" value="عائلية مميزة" />
                                    <Field label="حد الخصم" value="حتى ٧٠٪" />
                                    <Field label="إصدار" value="٠١ / ٢٠٢٤" />
                                    <Field label="انتهاء الصلاحية" value="١٢ / ٢٠٢٨" />
                                    <Field label="عدد الأفراد" value="٥ (أنت + ٤)" />
                                    <Field label="تغطية" value="جميع المحافظات" />
                                </dl>

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

                <section className="relative z-[2] bg-[rgba(11,46,44,0.04)] py-14 sm:py-20">
                    <div className="container">
                        <div className="mx-auto max-w-2xl text-center">
                            <span className="inline-flex items-center rounded-full bg-[var(--amber-100)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--amber-600)]">
                                أفراد العائلة
                            </span>
                            <h2 className="mt-4 text-3xl font-bold text-[var(--teal-900)] sm:text-4xl">
                                ٤ أفراد مغطّون بالكامل
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                                كل فرد من عائلتك له بطاقة فرعية مرتبطة بحسابك ويستفيد
                                من نفس الخصومات في كل الشبكة.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {FAMILY.map((m) => (
                                <FamilyCard
                                    key={m.name}
                                    member={m}
                                    parentSuffix={digits.slice(-4)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative z-[2] py-14 sm:py-20">
                    <div className="container">
                        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
                            <div>
                                <span className="inline-flex items-center rounded-full bg-[var(--amber-100)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--amber-600)]">
                                    شكل البطاقة
                                </span>
                                <h2 className="mt-4 text-3xl font-bold text-[var(--teal-900)] sm:text-4xl">
                                    وجهان واحد للخصم
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                                    البطاقة الرقمية تظهر على هاتفك، والبطاقة الفعلية
                                    تصلك خلال ٤٨ ساعة. كلاهما يحتويان على رقم العضوية
                                    والكود السريع للتحقق في أي جهة.
                                </p>
                                <ul className="mt-6 space-y-3 text-sm">
                                    <Bullet text="QR على الوجه الخلفي للتحقق الفوري" />
                                    <Bullet text="رقم البطاقة + اسم العضو على الوجه الأمامي" />
                                    <Bullet text="حماية بـ chip ذكي ضد التزوير" />
                                </ul>
                            </div>

                            <div className="relative grid gap-5 sm:grid-cols-2">
                                <SampleCardFront
                                    number={displayNumber}
                                    holder={HOLDER.nameLatin}
                                />
                                <SampleCardBack number={maskedNumber} />
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
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
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

function Bullet({ text }: { text: string }) {
    return (
        <li className="flex items-start gap-2 text-[var(--ink-soft)]">
            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--amber-100)] text-[var(--amber-600)]">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </span>
            {text}
        </li>
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
    parentSuffix,
}: {
    member: FamilyMember;
    parentSuffix: string;
}) {
    return (
        <article className="group relative overflow-hidden rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white p-5 shadow-[0_18px_40px_-30px_rgba(11,46,44,0.5)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,46,44,0.6)]">
            <div
                className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full opacity-15"
                style={{ background: member.accent }}
            ></div>
            <div className="relative flex items-center gap-3">
                <MemberAvatar
                    initials={member.avatar}
                    accent={member.accent}
                    size={56}
                />
                <div>
                    <h3 className="text-base font-bold text-[var(--teal-900)]">
                        {member.name}
                    </h3>
                    <p className="text-xs text-[var(--ink-soft)]">
                        {member.relation} • {member.age} سنة
                    </p>
                </div>
            </div>
            <div
                className="mt-5 rounded-2xl bg-[rgba(11,46,44,0.04)] px-3 py-2 font-mono text-xs text-[var(--teal-900)]"
                dir="ltr"
            >
                {parentSuffix} •••• •••• {member.cardSuffix}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e7f5ee] px-2.5 py-1 font-bold text-[#0e8a4f]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0e8a4f]"></span>
                    مفعّلة
                </span>
                <span className="font-semibold text-[var(--teal-700)]">
                    خصم حتى ٧٠٪
                </span>
            </div>
        </article>
    );
}

function BigMemberCard({
    number,
    holder,
}: {
    number: string;
    holder: string;
}) {
    return (
        <div
            className="relative aspect-[1.586/1] w-full overflow-hidden rounded-[28px] p-7 text-[var(--cream)] shadow-[0_40px_80px_-30px_rgba(11,46,44,0.6)]"
            style={{
                background:
                    'linear-gradient(135deg, var(--teal-800) 0%, var(--teal-900) 60%, #082322 100%)',
            }}
        >
            <div
                className="pointer-events-none absolute -right-1/4 -top-1/3 h-[140%] w-[80%] rounded-full"
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
                    <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-[rgba(247,242,234,0.7)]">
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
                    <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[rgba(247,242,234,0.6)]">
                        Cardholder
                    </div>
                    <div className="mt-0.5 text-sm font-semibold uppercase tracking-wider sm:text-base">
                        {holder}
                    </div>
                </div>
                <div>
                    <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[rgba(247,242,234,0.6)]">
                        Valid Thru
                    </div>
                    <div className="mt-0.5 text-sm font-semibold tracking-wider sm:text-base">
                        12 / 28
                    </div>
                </div>
            </div>
        </div>
    );
}

function SampleCardFront({
    number,
    holder,
}: {
    number: string;
    holder: string;
}) {
    return (
        <div
            className="relative aspect-[1.586/1] overflow-hidden rounded-3xl p-5 text-[var(--cream)] shadow-[0_24px_50px_-24px_rgba(11,46,44,0.55)]"
            style={{
                background:
                    'linear-gradient(135deg, var(--teal-800) 0%, var(--teal-900) 100%)',
            }}
        >
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-base font-bold">برايم</div>
                    <div className="text-[9px] font-medium uppercase tracking-[0.25em] text-[rgba(247,242,234,0.7)]">
                        Medical Card
                    </div>
                </div>
                <div className="h-7 w-10 rounded border border-white/25 bg-gradient-to-br from-white/35 to-white/10"></div>
            </div>
            <div
                className="mt-6 font-mono text-sm tracking-[0.15em]"
                dir="ltr"
            >
                {number}
            </div>
            <div className="mt-3 flex items-end justify-between text-[10px]">
                <div>
                    <div className="font-semibold uppercase tracking-[0.2em] text-[rgba(247,242,234,0.6)]">
                        Cardholder
                    </div>
                    <div className="mt-0.5 text-xs font-semibold uppercase tracking-wider">
                        {holder}
                    </div>
                </div>
                <div className="rounded-full bg-[var(--amber-400)] px-2 py-0.5 text-[9px] font-bold text-[var(--teal-900)]">
                    FRONT
                </div>
            </div>
        </div>
    );
}

function SampleCardBack({ number }: { number: string }) {
    return (
        <div
            className="relative aspect-[1.586/1] overflow-hidden rounded-3xl p-5 text-[var(--teal-900)] shadow-[0_24px_50px_-24px_rgba(11,46,44,0.55)]"
            style={{
                background: 'linear-gradient(135deg, #f7f1e3 0%, #efe5cd 100%)',
            }}
        >
            <div className="absolute left-0 right-0 top-5 h-7 bg-[var(--teal-900)]"></div>
            <div className="mt-14 flex items-center justify-between gap-3">
                <div className="grid h-14 w-14 shrink-0 grid-cols-4 grid-rows-4 gap-[2px] rounded bg-white p-1">
                    {QR_PATTERN.map((on, i) => (
                        <span
                            key={i}
                            className="rounded-[1px]"
                            style={{
                                background: on ? 'var(--teal-900)' : 'transparent',
                            }}
                        ></span>
                    ))}
                </div>
                <div className="flex-1">
                    <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-soft)]">
                        Card Number
                    </div>
                    <div
                        className="mt-1 font-mono text-xs tracking-[0.15em]"
                        dir="ltr"
                    >
                        {number}
                    </div>
                </div>
                <div className="rounded-full bg-[var(--teal-900)] px-2 py-0.5 text-[9px] font-bold text-[var(--amber-400)]">
                    BACK
                </div>
            </div>
            <p className="mt-4 text-[10px] leading-relaxed text-[var(--ink-soft)]">
                هذه البطاقة مخصصة للحامل المذكور وغير قابلة للتحويل. للاستفسارات
                اتصل ١٦٧٧٧.
            </p>
        </div>
    );
}

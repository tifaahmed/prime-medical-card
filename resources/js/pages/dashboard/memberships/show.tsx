import { Head, Link } from '@inertiajs/react';
import {
    CalendarIcon,
    CheckCircle2Icon,
    CreditCardIcon,
    DownloadIcon,
    EyeOffIcon,
    MailIcon,
    PencilIcon,
    PhoneIcon,
    RotateCwIcon,
    UserIcon,
    UsersIcon,
} from 'lucide-react';
import { useState } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';

interface FamilyEntry {
    id: number;
    name: string;
    relationship: string | null;
    relationship_label: { en: string; ar: string } | null;
    date_of_birth: string | null;
    phone: string | null;
    email: string | null;
    is_active: boolean;
    photo_url: string | null;
}

interface Membership {
    id: number;
    slug: string;
    membership_number: string;
    registration_date: string | null;
    expiration_date: string | null;
    is_active: boolean;
    is_visible: boolean;
    job_title: { en: string | null; ar: string | null };
    photo_url: string | null;
    card_front_url: string | null;
    holder_name: string | null;
    family: FamilyEntry[];
}

function MetaCard({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof CreditCardIcon;
    label: string;
    value: string | null | undefined;
}) {
    return (
        <div className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary-dark">
                <Icon className="size-4" />
            </div>
            <div className="space-y-0.5">
                <p className="text-[11px] font-semibold tracking-wider text-muted-foreground">
                    {label}
                </p>
                <p className="font-medium" dir="rtl">
                    {value ?? '—'}
                </p>
            </div>
        </div>
    );
}

export default function MembershipShow({
    membership,
}: {
    membership: Membership;
}) {
    const [flipped, setFlipped] = useState(false);
    return (
        <>
            <Head title={membership.membership_number} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                        {membership.photo_url ? (
                            <img
                                src={membership.photo_url}
                                alt=""
                                className="size-16 rounded-2xl border bg-card object-cover shadow-sm"
                            />
                        ) : (
                            <div className="flex size-16 items-center justify-center rounded-2xl border bg-muted text-muted-foreground">
                                <CreditCardIcon className="size-6" />
                            </div>
                        )}
                        <Heading
                            title={
                                membership.holder_name ||
                                membership.membership_number
                            }
                            description={
                                membership.holder_name
                                    ? `${membership.membership_number}${
                                          membership.job_title.ar ||
                                          membership.job_title.en
                                              ? ' • ' +
                                                (membership.job_title.ar ||
                                                    membership.job_title.en)
                                              : ''
                                      }`
                                    : membership.job_title.ar ||
                                      membership.job_title.en ||
                                      undefined
                            }
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span
                            className={cn(
                                'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium',
                                membership.is_active
                                    ? 'badge-active'
                                    : 'badge-inactive',
                            )}
                        >
                            <CheckCircle2Icon className="size-3" />
                            {membership.is_active ? 'مفعّلة' : 'غير مفعّلة'}
                        </span>
                        {!membership.is_visible && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-muted-foreground/20 bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                <EyeOffIcon className="size-3" />
                                مخفية
                            </span>
                        )}
                        <Button asChild variant="outline">
                            <Link href="/dashboard/memberships">عودة</Link>
                        </Button>
                        {membership.card_front_url && (
                            <Button asChild variant="outline" className="gap-1.5">
                                <a
                                    href={membership.card_front_url}
                                    download={`card-${membership.membership_number}.png`}
                                >
                                    <DownloadIcon className="size-4" />
                                    تنزيل البطاقة
                                </a>
                            </Button>
                        )}
                        <Button asChild className="gap-1.5">
                            <Link
                                href={`/dashboard/memberships/${membership.id}/edit`}
                            >
                                <PencilIcon className="size-4" />
                                تعديل
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <MetaCard
                        icon={CreditCardIcon}
                        label="المسمى الوظيفي"
                        value={
                            membership.job_title.ar ||
                            membership.job_title.en
                        }
                    />
                    <MetaCard
                        icon={CalendarIcon}
                        label="تاريخ التسجيل"
                        value={membership.registration_date}
                    />
                    <MetaCard
                        icon={CalendarIcon}
                        label="تاريخ الانتهاء"
                        value={membership.expiration_date}
                    />
                </div>

                {membership.card_front_url && (
                    <section className="space-y-3 rounded-3xl border bg-card p-6 shadow-sm">
                        <header className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                                    <CreditCardIcon className="size-4" />
                                </span>
                                <h3 className="font-heading text-lg font-semibold">
                                    البطاقة المحفوظة
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5"
                                    onClick={() => setFlipped((f) => !f)}
                                >
                                    <RotateCwIcon className="size-3.5" />
                                    {flipped
                                        ? 'عرض الأمام'
                                        : 'عرض الخلف'}
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5"
                                >
                                    <a
                                        href={membership.card_front_url}
                                        download={`card-${membership.membership_number}.png`}
                                    >
                                        <DownloadIcon className="size-3.5" />
                                        تنزيل
                                    </a>
                                </Button>
                            </div>
                        </header>
                        <div
                            className="mx-auto w-full max-w-sm"
                            style={{ perspective: '1500px' }}
                        >
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
                                    className="absolute inset-0 overflow-hidden rounded-2xl border bg-muted/20"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden',
                                    }}
                                >
                                    <img
                                        src={membership.card_front_url}
                                        alt={`بطاقة ${membership.membership_number}`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div
                                    className="absolute inset-0 overflow-hidden rounded-2xl border"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden',
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
                    </section>
                )}

                <section className="rounded-3xl border bg-card shadow-sm">
                    <header className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-4">
                        <div className="flex items-center gap-2">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
                                <UsersIcon className="size-4" />
                            </span>
                            <h3 className="font-heading text-lg font-semibold">
                                العائلة
                            </h3>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                {membership.family.length}
                            </span>
                        </div>
                        <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="btn-edit gap-1.5"
                        >
                            <Link
                                href={`/dashboard/memberships/${membership.id}/edit`}
                            >
                                <PencilIcon className="size-3.5" />
                                إدارة العائلة
                            </Link>
                        </Button>
                    </header>

                    {membership.family.length === 0 ? (
                        <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                            لا يوجد أفراد عائلة بعد.
                        </div>
                    ) : (
                        <ul className="divide-y">
                            {membership.family.map((m) => (
                                <li
                                    key={m.id}
                                    className="flex flex-wrap items-start gap-4 px-5 py-4"
                                >
                                    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground">
                                        {m.photo_url ? (
                                            <img
                                                src={m.photo_url}
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <UserIcon className="size-6" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1 space-y-1">
                                        <p className="font-medium" dir="rtl">
                                            {m.name}
                                        </p>
                                        {m.relationship_label && (
                                            <p
                                                className="text-xs text-muted-foreground"
                                                dir="rtl"
                                            >
                                                {m.relationship_label.ar ||
                                                    m.relationship_label.en}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                            {m.phone && (
                                                <span
                                                    className="flex items-center gap-1"
                                                    dir="ltr"
                                                >
                                                    <PhoneIcon className="size-3" />
                                                    {m.phone}
                                                </span>
                                            )}
                                            {m.email && (
                                                <span
                                                    className="flex items-center gap-1"
                                                    dir="ltr"
                                                >
                                                    <MailIcon className="size-3" />
                                                    {m.email}
                                                </span>
                                            )}
                                            {m.date_of_birth && (
                                                <span
                                                    className="flex items-center gap-1"
                                                    dir="ltr"
                                                >
                                                    <CalendarIcon className="size-3" />
                                                    {m.date_of_birth}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {!m.is_active && (
                                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                            غير مفعّل
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </>
    );
}

MembershipShow.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'العضويات', href: '/dashboard/memberships' },
        { title: 'عرض', href: '#' },
    ],
};

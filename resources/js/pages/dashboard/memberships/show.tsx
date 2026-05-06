import { Head, Link } from '@inertiajs/react';
import {
    CalendarIcon,
    CheckCircle2Icon,
    CreditCardIcon,
    EyeOffIcon,
    MailIcon,
    PencilIcon,
    PhoneIcon,
    UserIcon,
    UsersIcon,
} from 'lucide-react';
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
    family: FamilyEntry[];
}

function MetaCard({
    icon: Icon,
    label,
    value,
    valueAr,
}: {
    icon: typeof CreditCardIcon;
    label: string;
    value: string | null | undefined;
    valueAr?: string | null;
}) {
    return (
        <div className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary-dark">
                <Icon className="size-4" />
            </div>
            <div className="space-y-0.5">
                <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {label}
                </p>
                <p className="font-medium">{value ?? '—'}</p>
                {valueAr && (
                    <p className="text-sm text-muted-foreground" dir="rtl">
                        {valueAr}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function MembershipShow({
    membership,
}: {
    membership: Membership;
}) {
    return (
        <>
            <Head title={membership.membership_number} />
            <div className="w-full space-y-6 p-6">
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
                            title={membership.membership_number}
                            description={
                                membership.job_title.en ||
                                membership.job_title.ar ||
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
                            {membership.is_active ? 'Active' : 'Inactive'}
                        </span>
                        {!membership.is_visible && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-muted-foreground/20 bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                <EyeOffIcon className="size-3" />
                                Hidden
                            </span>
                        )}
                        <Button asChild variant="outline">
                            <Link href="/dashboard/memberships">Back</Link>
                        </Button>
                        <Button asChild className="gap-1.5">
                            <Link
                                href={`/dashboard/memberships/${membership.id}/edit`}
                            >
                                <PencilIcon className="size-4" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <MetaCard
                        icon={CreditCardIcon}
                        label="Job title"
                        value={membership.job_title.en}
                        valueAr={membership.job_title.ar}
                    />
                    <MetaCard
                        icon={CalendarIcon}
                        label="Registered"
                        value={membership.registration_date}
                    />
                    <MetaCard
                        icon={CalendarIcon}
                        label="Expires"
                        value={membership.expiration_date}
                    />
                </div>

                <section className="rounded-3xl border bg-card shadow-sm">
                    <header className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-4">
                        <div className="flex items-center gap-2">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
                                <UsersIcon className="size-4" />
                            </span>
                            <h3 className="font-heading text-lg font-semibold">
                                Family
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
                                Manage Family
                            </Link>
                        </Button>
                    </header>

                    {membership.family.length === 0 ? (
                        <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                            No family members yet.
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
                                        <p className="font-medium">{m.name}</p>
                                        {m.relationship_label && (
                                            <p className="text-xs text-muted-foreground">
                                                {m.relationship_label.en}
                                                <span className="mx-1">·</span>
                                                <span dir="rtl">
                                                    {m.relationship_label.ar}
                                                </span>
                                            </p>
                                        )}
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                            {m.phone && (
                                                <span className="flex items-center gap-1">
                                                    <PhoneIcon className="size-3" />
                                                    {m.phone}
                                                </span>
                                            )}
                                            {m.email && (
                                                <span className="flex items-center gap-1">
                                                    <MailIcon className="size-3" />
                                                    {m.email}
                                                </span>
                                            )}
                                            {m.date_of_birth && (
                                                <span className="flex items-center gap-1">
                                                    <CalendarIcon className="size-3" />
                                                    {m.date_of_birth}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {!m.is_active && (
                                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                            Inactive
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
        { title: 'Dashboard', href: dashboard() },
        { title: 'Memberships', href: '/dashboard/memberships' },
        { title: 'View', href: '#' },
    ],
};

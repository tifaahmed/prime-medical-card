import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    CreditCard,
    Layers,
    MapPin,
    Store,
    Tag,
} from 'lucide-react';
import Heading from '@/components/heading';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';

const resources = [
    {
        key: 'governorates',
        label: 'Governorates',
        description: 'Manage governorates (EN / AR)',
        href: '/dashboard/governorates',
        icon: MapPin,
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
        key: 'facility-types',
        label: 'Facility Types',
        description: 'Manage facility types (EN / AR)',
        href: '/dashboard/facility-types',
        icon: Layers,
        bg: 'bg-violet-50 dark:bg-violet-950/30',
        iconBg: 'bg-violet-500/10',
        iconColor: 'text-violet-600 dark:text-violet-400',
    },
    {
        key: 'facilities',
        label: 'Facilities',
        description: 'Manage facilities (EN / AR)',
        href: '/dashboard/facilities',
        icon: Building2,
        bg: 'bg-cyan-50 dark:bg-cyan-950/30',
        iconBg: 'bg-cyan-500/10',
        iconColor: 'text-cyan-600 dark:text-cyan-400',
    },
    {
        key: 'branches',
        label: 'Facility Branches',
        description: 'Manage branches (EN / AR)',
        href: '/dashboard/facility-branches',
        icon: Store,
        bg: 'bg-teal-50 dark:bg-teal-950/30',
        iconBg: 'bg-teal-500/10',
        iconColor: 'text-teal-600 dark:text-teal-400',
    },
    {
        key: 'offers',
        label: 'Offers',
        description: 'Manage offers (EN / AR)',
        href: '/dashboard/offers',
        icon: Tag,
        bg: 'bg-amber-50 dark:bg-amber-950/30',
        iconBg: 'bg-amber-500/10',
        iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
        key: 'memberships',
        label: 'Memberships',
        description: 'Members & their family',
        href: '/dashboard/memberships',
        icon: CreditCard,
        bg: 'bg-rose-50 dark:bg-rose-950/30',
        iconBg: 'bg-rose-500/10',
        iconColor: 'text-rose-600 dark:text-rose-400',
    },
] as const;

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="w-full space-y-6 p-6">
                <Heading
                    title="Dashboard"
                    description="Manage every model in English and Arabic."
                />

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {resources.map((r) => {
                        const Icon = r.icon;

                        return (
                            <Link key={r.key} href={r.href} className="block">
                                <Card
                                    className={cn(
                                        'rounded-2xl border-0 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
                                        r.bg,
                                    )}
                                >
                                    <CardContent className="flex items-center gap-3 px-4 py-3">
                                        <div
                                            className={cn(
                                                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                                                r.iconBg,
                                            )}
                                        >
                                            <Icon
                                                className={cn(
                                                    'h-4.5 w-4.5',
                                                    r.iconColor,
                                                )}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold tracking-tight text-foreground">
                                                {r.label}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {r.description}
                                            </p>
                                        </div>
                                        <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                <div className="rounded-3xl border bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary p-6 text-brand-primary-foreground shadow-sm">
                    <div className="max-w-2xl space-y-2">
                        <p className="text-sm font-semibold tracking-wider text-white/70 uppercase">
                            Bilingual content
                        </p>
                        <h3 className="font-heading text-2xl font-bold">
                            Every record carries both English and Arabic
                        </h3>
                        <p className="text-sm text-white/80">
                            Names, addresses, titles, and descriptions are
                            stored as JSON translations, so the public site
                            always picks the right language.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

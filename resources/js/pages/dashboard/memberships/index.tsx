import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle2Icon,
    CreditCardIcon,
    EyeOffIcon,
    PlusIcon,
} from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DataTable from '@/pages/dashboard/_components/data-table';
import type {
    Column,
    PaginatedData,
} from '@/pages/dashboard/_components/data-table';
import { dashboard } from '@/routes';

interface Membership {
    id: number;
    slug: string;
    membership_number: string;
    registration_date: string | null;
    expiration_date: string | null;
    is_active: boolean;
    is_visible: boolean;
    family_count: number;
    photo_url: string | null;
    job_title: { en: string | null; ar: string | null };
}

export default function MembershipsIndex({
    memberships,
    filters,
}: {
    memberships: PaginatedData<Membership>;
    filters: { search: string };
}) {
    const columns: Column<Membership>[] = [
        {
            key: 'photo',
            label: '',
            render: (r) => (
                <div className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground">
                    {r.photo_url ? (
                        <img
                            src={r.photo_url}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <CreditCardIcon className="size-5" />
                    )}
                </div>
            ),
        },
        {
            key: 'number',
            label: 'Number',
            render: (r) => (
                <span className="font-mono text-xs">{r.membership_number}</span>
            ),
        },
        {
            key: 'job_title',
            label: 'Job title',
            render: (r) =>
                r.job_title.en || r.job_title.ar ? (
                    <span>
                        {r.job_title.en ?? ''}
                        {r.job_title.ar && (
                            <span
                                className="ml-1 text-xs text-muted-foreground"
                                dir="rtl"
                            >
                                / {r.job_title.ar}
                            </span>
                        )}
                    </span>
                ) : (
                    '—'
                ),
        },
        {
            key: 'dates',
            label: 'Period',
            render: (r) => (
                <div className="text-xs">
                    <p>{r.registration_date ?? '—'}</p>
                    <p className="text-muted-foreground">
                        → {r.expiration_date ?? '—'}
                    </p>
                </div>
            ),
        },
        {
            key: 'family',
            label: 'Family',
            render: (r) => (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {r.family_count}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (r) => (
                <div className="flex flex-wrap gap-1">
                    <span
                        className={cn(
                            'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium',
                            r.is_active ? 'badge-active' : 'badge-inactive',
                        )}
                    >
                        <CheckCircle2Icon className="size-3" />
                        {r.is_active ? 'Active' : 'Inactive'}
                    </span>
                    {!r.is_visible && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-muted-foreground/20 bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                            <EyeOffIcon className="size-3" />
                            Hidden
                        </span>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Memberships" />
            <div className="w-full space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Memberships"
                        description="Manage memberships and their family members."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/memberships/create">
                            <PlusIcon className="size-4" />
                            Add Membership
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={memberships}
                    showUrl={(r) => `/dashboard/memberships/${r.id}`}
                    editUrl={(r) => `/dashboard/memberships/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/memberships/${r.id}`}
                    searchUrl="/dashboard/memberships"
                    initialSearch={filters.search}
                />
            </div>
        </>
    );
}

MembershipsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Memberships', href: '/dashboard/memberships' },
    ],
};

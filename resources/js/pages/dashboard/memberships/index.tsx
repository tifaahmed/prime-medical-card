import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle2Icon,
    CreditCardIcon,
    EyeOffIcon,
    IdCardIcon,
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
    holder_name: string | null;
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
            key: 'name',
            label: 'الاسم',
            render: (r) => (
                <div className="space-y-0.5">
                    <p dir="rtl" className="font-medium">
                        {r.holder_name ?? '—'}
                    </p>
                    <p
                        dir="ltr"
                        className="text-start font-mono text-[11px] text-muted-foreground"
                    >
                        {r.membership_number}
                    </p>
                    {(r.job_title.ar || r.job_title.en) && (
                        <p
                            dir="rtl"
                            className="text-xs text-muted-foreground"
                        >
                            {r.job_title.ar || r.job_title.en}
                        </p>
                    )}
                    <p
                        dir="ltr"
                        className="text-start text-[11px] text-muted-foreground"
                    >
                        {r.registration_date ?? '—'} →{' '}
                        {r.expiration_date ?? '—'}
                    </p>
                </div>
            ),
        },
        {
            key: 'family',
            label: 'العائلة',
            render: (r) => (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {r.family_count}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'الحالة',
            render: (r) => (
                <div className="flex flex-wrap gap-1">
                    <span
                        className={cn(
                            'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium',
                            r.is_active ? 'badge-active' : 'badge-inactive',
                        )}
                    >
                        <CheckCircle2Icon className="size-3" />
                        {r.is_active ? 'مفعّلة' : 'غير مفعّلة'}
                    </span>
                    {!r.is_visible && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-muted-foreground/20 bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                            <EyeOffIcon className="size-3" />
                            مخفية
                        </span>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="العضويات" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="العضويات"
                        description="إدارة العضويات والأفراد العائليّين."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/memberships/create">
                            <PlusIcon className="size-4" />
                            إضافة عضوية
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={memberships}
                    showUrl={(r) => `/dashboard/memberships/${r.id}`}
                    editUrl={(r) => `/dashboard/memberships/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/memberships/${r.id}`}
                    extraActions={(r) => (
                        <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="gap-1.5"
                        >
                            <Link href={`/dashboard/memberships/${r.id}/card`}>
                                <IdCardIcon className="size-3.5" />
                                البطاقة
                            </Link>
                        </Button>
                    )}
                    searchUrl="/dashboard/memberships"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث برقم العضوية…"
                />
            </div>
        </>
    );
}

MembershipsIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'العضويات', href: '/dashboard/memberships' },
    ],
};

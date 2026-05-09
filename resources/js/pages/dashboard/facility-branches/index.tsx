import { Head, Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import DataTable from '@/pages/dashboard/_components/data-table';
import type {
    Column,
    PaginatedData,
} from '@/pages/dashboard/_components/data-table';
import { dashboard } from '@/routes';

interface Branch {
    id: number;
    slug: string;
    facility: { id: number; name: { en: string; ar: string } } | null;
    governorate: { id: number; name: { en: string; ar: string } } | null;
    city: { id: number; name: { en: string; ar: string } } | null;
    name: { en: string; ar: string };
    address: { en: string; ar: string };
    phone: string[];
}

export default function BranchesIndex({
    branches,
    filters,
}: {
    branches: PaginatedData<Branch>;
    filters: { search: string };
}) {
    const columns: Column<Branch>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        {
            key: 'facility',
            label: 'المنشأة',
            render: (r) => (
                <span dir="rtl">{r.facility?.name?.ar ?? '—'}</span>
            ),
        },
        {
            key: 'name_ar',
            label: 'الفرع',
            render: (r) => <span dir="rtl">{r.name.ar ?? '—'}</span>,
        },
        {
            key: 'gov',
            label: 'المحافظة',
            render: (r) => (
                <span dir="rtl">{r.governorate?.name.ar ?? '—'}</span>
            ),
        },
        {
            key: 'city',
            label: 'المدينة',
            render: (r) => <span dir="rtl">{r.city?.name.ar ?? '—'}</span>,
        },
        {
            key: 'phone',
            label: 'الهاتف',
            render: (r) => (
                <span dir="ltr">{(r.phone ?? []).join(', ') || '—'}</span>
            ),
        },
    ];

    return (
        <>
            <Head title="فروع المنشآت" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="فروع المنشآت"
                        description="إدارة فروع المنشآت."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/facility-branches/create">
                            <PlusIcon className="size-4" />
                            إضافة فرع
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={branches}
                    editUrl={(r) => `/dashboard/facility-branches/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/facility-branches/${r.id}`}
                    searchUrl="/dashboard/facility-branches"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث بالاسم…"
                />
            </div>
        </>
    );
}

BranchesIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'فروع المنشآت', href: '/dashboard/facility-branches' },
    ],
};

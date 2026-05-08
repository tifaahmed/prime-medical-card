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

interface FacilityType {
    id: number;
    slug: string;
    name: { en: string; ar: string };
}

export default function FacilityTypesIndex({
    facilityTypes,
    filters,
}: {
    facilityTypes: PaginatedData<FacilityType>;
    filters: { search: string };
}) {
    const columns: Column<FacilityType>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        {
            key: 'name_ar',
            label: 'الاسم',
            render: (r) => <span dir="rtl">{r.name.ar ?? '—'}</span>,
        },
        {
            key: 'slug',
            label: 'المعرّف',
            render: (r) => (
                <code dir="ltr" className="text-xs text-muted-foreground">
                    {r.slug}
                </code>
            ),
        },
    ];

    return (
        <>
            <Head title="أنواع المنشآت" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="أنواع المنشآت"
                        description="إدارة أنواع المنشآت."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/facility-types/create">
                            <PlusIcon className="size-4" />
                            إضافة نوع
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={facilityTypes}
                    editUrl={(r) => `/dashboard/facility-types/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/facility-types/${r.id}`}
                    searchUrl="/dashboard/facility-types"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث بالمعرّف…"
                />
            </div>
        </>
    );
}

FacilityTypesIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'أنواع المنشآت', href: '/dashboard/facility-types' },
    ],
};

import { Head, Link } from '@inertiajs/react';
import { Building2Icon, PlusIcon } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import DataTable from '@/pages/dashboard/_components/data-table';
import type {
    Column,
    PaginatedData,
} from '@/pages/dashboard/_components/data-table';
import { dashboard } from '@/routes';

interface Facility {
    id: number;
    slug: string;
    logo_url: string | null;
    name: { en: string; ar: string };
    facility_type: { id: number; name: { en: string; ar: string } } | null;
    governorate: { id: number; name: { en: string; ar: string } } | null;
}

export default function FacilitiesIndex({
    facilities,
    filters,
}: {
    facilities: PaginatedData<Facility>;
    filters: { search: string };
}) {
    const columns: Column<Facility>[] = [
        {
            key: 'facility',
            label: 'المنشأة',
            render: (r) => (
                <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted text-muted-foreground">
                        {r.logo_url ? (
                            <img
                                src={r.logo_url}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <Building2Icon className="size-5" />
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate font-medium" dir="rtl">
                            {r.name.ar ?? '—'}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: 'type',
            label: 'النوع',
            render: (r) =>
                r.facility_type ? (
                    <span dir="rtl">{r.facility_type.name.ar ?? '—'}</span>
                ) : (
                    '—'
                ),
        },
        {
            key: 'gov',
            label: 'المحافظة',
            render: (r) =>
                r.governorate ? (
                    <span dir="rtl">{r.governorate.name.ar ?? '—'}</span>
                ) : (
                    '—'
                ),
        },
    ];

    return (
        <>
            <Head title="المنشآت" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="المنشآت"
                        description="إدارة المنشآت الطبية."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/facilities/create">
                            <PlusIcon className="size-4" />
                            إضافة منشأة
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={facilities}
                    showUrl={(r) => `/dashboard/facilities/${r.id}`}
                    editUrl={(r) => `/dashboard/facilities/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/facilities/${r.id}`}
                    searchUrl="/dashboard/facilities"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث بالاسم…"
                />
            </div>
        </>
    );
}

FacilitiesIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'المنشآت', href: '/dashboard/facilities' },
    ],
};

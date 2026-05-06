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

interface Facility {
    id: number;
    slug: string;
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
        { key: 'id', label: '#', render: (r) => r.id },
        {
            key: 'name_en',
            label: 'Name (EN)',
            render: (r) => r.name.en ?? '—',
        },
        {
            key: 'name_ar',
            label: 'الاسم (AR)',
            render: (r) => <span dir="rtl">{r.name.ar ?? '—'}</span>,
        },
        {
            key: 'type',
            label: 'Type',
            render: (r) => r.facility_type?.name?.en ?? '—',
        },
        {
            key: 'gov',
            label: 'Governorate',
            render: (r) => r.governorate?.name?.en ?? '—',
        },
    ];

    return (
        <>
            <Head title="Facilities" />
            <div className="w-full space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Facilities"
                        description="Manage facilities in English and Arabic."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/facilities/create">
                            <PlusIcon className="size-4" />
                            Add Facility
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
                />
            </div>
        </>
    );
}

FacilitiesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Facilities', href: '/dashboard/facilities' },
    ],
};

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
            label: 'Facility',
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
                        <p className="truncate font-medium">
                            {r.name.en ?? '—'}
                        </p>
                        <p
                            className="truncate text-xs text-muted-foreground"
                            dir="rtl"
                        >
                            {r.name.ar ?? '—'}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: 'type',
            label: 'Type',
            render: (r) =>
                r.facility_type ? (
                    <span>
                        {r.facility_type.name.en ?? '—'}
                        {r.facility_type.name.ar && (
                            <span
                                className="ml-1 text-xs text-muted-foreground"
                                dir="rtl"
                            >
                                / {r.facility_type.name.ar}
                            </span>
                        )}
                    </span>
                ) : (
                    '—'
                ),
        },
        {
            key: 'gov',
            label: 'Governorate',
            render: (r) =>
                r.governorate ? (
                    <span>
                        {r.governorate.name.en ?? '—'}
                        {r.governorate.name.ar && (
                            <span
                                className="ml-1 text-xs text-muted-foreground"
                                dir="rtl"
                            >
                                / {r.governorate.name.ar}
                            </span>
                        )}
                    </span>
                ) : (
                    '—'
                ),
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

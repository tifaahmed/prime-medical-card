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

interface City {
    id: number;
    slug: string;
    name: { en: string; ar: string };
    governorate?: { id: number; name: { en: string; ar: string } } | null;
}

export default function CitiesIndex({
    cities,
    filters,
}: {
    cities: PaginatedData<City>;
    filters: { search: string };
}) {
    const columns: Column<City>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        {
            key: 'name_ar',
            label: 'الاسم',
            render: (r) => <span dir="rtl">{r.name.ar ?? '—'}</span>,
        },
        {
            key: 'governorate',
            label: 'المحافظة',
            render: (r) => (
                <span dir="rtl">
                    {r.governorate?.name.ar ?? r.governorate?.name.en ?? '—'}
                </span>
            ),
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
            <Head title="المدن" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading title="المدن" description="إدارة المدن." />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/cities/create">
                            <PlusIcon className="size-4" />
                            إضافة مدينة
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={cities}
                    editUrl={(r) => `/dashboard/cities/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/cities/${r.id}`}
                    searchUrl="/dashboard/cities"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث بالمعرّف…"
                />
            </div>
        </>
    );
}

CitiesIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'المدن', href: '/dashboard/cities' },
    ],
};

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

interface Governorate {
    id: number;
    slug: string;
    name: { en: string; ar: string };
}

export default function GovernoratesIndex({
    governorates,
    filters,
}: {
    governorates: PaginatedData<Governorate>;
    filters: { search: string };
}) {
    const columns: Column<Governorate>[] = [
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
            <Head title="المحافظات" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="المحافظات"
                        description="إدارة المحافظات."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/governorates/create">
                            <PlusIcon className="size-4" />
                            إضافة محافظة
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={governorates}
                    editUrl={(r) => `/dashboard/governorates/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/governorates/${r.id}`}
                    searchUrl="/dashboard/governorates"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث بالمعرّف…"
                />
            </div>
        </>
    );
}

GovernoratesIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'المحافظات', href: '/dashboard/governorates' },
    ],
};

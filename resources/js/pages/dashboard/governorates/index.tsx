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
            key: 'slug',
            label: 'Slug',
            render: (r) => (
                <code className="text-xs text-muted-foreground">{r.slug}</code>
            ),
        },
    ];

    return (
        <>
            <Head title="Governorates" />
            <div className="w-full space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Governorates"
                        description="Manage governorates in English and Arabic."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/governorates/create">
                            <PlusIcon className="size-4" />
                            Add Governorate
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
                />
            </div>
        </>
    );
}

GovernoratesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Governorates', href: '/dashboard/governorates' },
    ],
};

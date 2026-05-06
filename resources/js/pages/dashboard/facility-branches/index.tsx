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
            label: 'Facility',
            render: (r) => r.facility?.name?.en ?? '—',
        },
        {
            key: 'name_en',
            label: 'Branch (EN)',
            render: (r) => r.name.en ?? '—',
        },
        {
            key: 'name_ar',
            label: 'الفرع (AR)',
            render: (r) => <span dir="rtl">{r.name.ar ?? '—'}</span>,
        },
        {
            key: 'phone',
            label: 'Phone',
            render: (r) => (r.phone ?? []).join(', ') || '—',
        },
    ];

    return (
        <>
            <Head title="Facility Branches" />
            <div className="w-full space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Facility Branches"
                        description="Manage facility branches in English and Arabic."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/facility-branches/create">
                            <PlusIcon className="size-4" />
                            Add Branch
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
                />
            </div>
        </>
    );
}

BranchesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Facility Branches', href: '/dashboard/facility-branches' },
    ],
};

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

interface Entry {
    id: number;
    year: string;
    title: string;
    description: string | null;
    is_published: boolean;
    position: number;
}

export default function AboutTimelineIndex({
    entries,
    filters,
}: {
    entries: PaginatedData<Entry>;
    filters: { search: string };
}) {
    const columns: Column<Entry>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        { key: 'position', label: 'الترتيب', render: (r) => r.position },
        {
            key: 'year',
            label: 'السنة',
            render: (r) => <span dir="rtl">{r.year}</span>,
        },
        {
            key: 'title',
            label: 'المحطة',
            render: (r) => <span dir="rtl">{r.title}</span>,
        },
        {
            key: 'is_published',
            label: 'الحالة',
            render: (r) =>
                r.is_published ? (
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        منشورة
                    </span>
                ) : (
                    <span className="rounded-full bg-zinc-500/15 px-2.5 py-0.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        مخفية
                    </span>
                ),
        },
    ];

    return (
        <>
            <Head title="الخط الزمني" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="الخط الزمني"
                        description="إدارة محطات قسم ”رحلتنا“ في صفحة عن الشركة."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/about-timeline/create">
                            <PlusIcon className="size-4" />
                            إضافة محطة
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={entries}
                    editUrl={(r) => `/dashboard/about-timeline/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/about-timeline/${r.id}`}
                    searchUrl="/dashboard/about-timeline"
                    initialSearch={filters.search}
                />
            </div>
        </>
    );
}

AboutTimelineIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'الخط الزمني', href: '/dashboard/about-timeline' },
    ],
};

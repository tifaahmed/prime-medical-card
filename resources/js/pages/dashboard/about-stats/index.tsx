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

interface Stat {
    id: number;
    value: string;
    label: string;
    is_published: boolean;
    position: number;
}

export default function AboutStatsIndex({
    stats,
    filters,
}: {
    stats: PaginatedData<Stat>;
    filters: { search: string };
}) {
    const columns: Column<Stat>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        { key: 'position', label: 'الترتيب', render: (r) => r.position },
        {
            key: 'value',
            label: 'القيمة',
            render: (r) => <span dir="rtl">{r.value}</span>,
        },
        {
            key: 'label',
            label: 'الوصف',
            render: (r) => <span dir="rtl">{r.label}</span>,
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
            <Head title="إحصائيات الشركة" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="إحصائيات الشركة"
                        description="إدارة الأرقام التي تظهر في صفحة ”عن الشركة“."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/about-stats/create">
                            <PlusIcon className="size-4" />
                            إضافة
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={stats}
                    editUrl={(r) => `/dashboard/about-stats/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/about-stats/${r.id}`}
                    searchUrl="/dashboard/about-stats"
                    initialSearch={filters.search}
                />
            </div>
        </>
    );
}

AboutStatsIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'إحصائيات الشركة', href: '/dashboard/about-stats' },
    ],
};

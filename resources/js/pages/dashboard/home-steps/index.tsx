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

interface Step {
    id: number;
    title: string;
    description: string | null;
    icon_key: string;
    is_published: boolean;
    position: number;
}

export default function HomeStepsIndex({
    steps,
    filters,
}: {
    steps: PaginatedData<Step>;
    filters: { search: string };
}) {
    const columns: Column<Step>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        { key: 'position', label: 'الترتيب', render: (r) => r.position },
        {
            key: 'title',
            label: 'الخطوة',
            render: (r) => <span dir="rtl">{r.title}</span>,
        },
        {
            key: 'icon_key',
            label: 'الأيقونة',
            render: (r) => <code className="text-xs">{r.icon_key}</code>,
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
            <Head title="كيف نعمل" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="كيف نعمل"
                        description="إدارة خطوات قسم ”كيف نعمل“ في الصفحة الرئيسية."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/home-steps/create">
                            <PlusIcon className="size-4" />
                            إضافة خطوة
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={steps}
                    editUrl={(r) => `/dashboard/home-steps/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/home-steps/${r.id}`}
                    searchUrl="/dashboard/home-steps"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث…"
                />
            </div>
        </>
    );
}

HomeStepsIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'كيف نعمل', href: '/dashboard/home-steps' },
    ],
};

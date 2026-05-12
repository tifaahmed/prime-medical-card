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

interface Value {
    id: number;
    title: string;
    description: string | null;
    icon_key: string;
    is_published: boolean;
    position: number;
}

export default function AboutValuesIndex({
    values,
    filters,
}: {
    values: PaginatedData<Value>;
    filters: { search: string };
}) {
    const columns: Column<Value>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        { key: 'position', label: 'الترتيب', render: (r) => r.position },
        {
            key: 'title',
            label: 'القيمة',
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
            <Head title="قيمنا" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="قيمنا"
                        description="إدارة بطاقات ”ما الذي يميز برايم ميديكال كارد“."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/about-values/create">
                            <PlusIcon className="size-4" />
                            إضافة
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={values}
                    editUrl={(r) => `/dashboard/about-values/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/about-values/${r.id}`}
                    searchUrl="/dashboard/about-values"
                    initialSearch={filters.search}
                />
            </div>
        </>
    );
}

AboutValuesIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'قيمنا', href: '/dashboard/about-values' },
    ],
};

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

interface Plan {
    id: number;
    name: string;
    price: string;
    period: string | null;
    badge: string | null;
    is_featured: boolean;
    is_published: boolean;
    position: number;
}

export default function PlansIndex({
    plans,
    filters,
}: {
    plans: PaginatedData<Plan>;
    filters: { search: string };
}) {
    const columns: Column<Plan>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        { key: 'position', label: 'الترتيب', render: (r) => r.position },
        {
            key: 'name',
            label: 'الاسم',
            render: (r) => <span dir="rtl">{r.name}</span>,
        },
        {
            key: 'price',
            label: 'السعر',
            render: (r) => <span dir="rtl">{r.price}</span>,
        },
        {
            key: 'badge',
            label: 'الشارة',
            render: (r) => <span dir="rtl">{r.badge ?? '—'}</span>,
        },
        {
            key: 'is_featured',
            label: 'مميزة',
            render: (r) => (r.is_featured ? 'نعم' : '—'),
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
            <Head title="الباقات" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="الباقات"
                        description="إدارة باقات الاشتراك التي تظهر في الصفحة الرئيسية."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/pricing-plans/create">
                            <PlusIcon className="size-4" />
                            إضافة باقة
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={plans}
                    editUrl={(r) => `/dashboard/pricing-plans/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/pricing-plans/${r.id}`}
                    searchUrl="/dashboard/pricing-plans"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث باسم الباقة…"
                />
            </div>
        </>
    );
}

PlansIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'الباقات', href: '/dashboard/pricing-plans' },
    ],
};

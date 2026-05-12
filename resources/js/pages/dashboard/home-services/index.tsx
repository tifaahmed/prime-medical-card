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

interface Service {
    id: number;
    title: string;
    discount: string | null;
    icon_key: string;
    is_published: boolean;
    position: number;
}

export default function HomeServicesIndex({
    services,
    filters,
}: {
    services: PaginatedData<Service>;
    filters: { search: string };
}) {
    const columns: Column<Service>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        { key: 'position', label: 'الترتيب', render: (r) => r.position },
        {
            key: 'title',
            label: 'الخدمة',
            render: (r) => <span dir="rtl">{r.title}</span>,
        },
        {
            key: 'discount',
            label: 'الخصم',
            render: (r) => <span dir="rtl">{r.discount ?? '—'}</span>,
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
            <Head title="خدمات الصفحة الرئيسية" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="خدمات الصفحة الرئيسية"
                        description="إدارة بطاقات الخدمات الطبية الظاهرة على الصفحة الرئيسية."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/home-services/create">
                            <PlusIcon className="size-4" />
                            إضافة خدمة
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={services}
                    editUrl={(r) => `/dashboard/home-services/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/home-services/${r.id}`}
                    searchUrl="/dashboard/home-services"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث بعنوان الخدمة…"
                />
            </div>
        </>
    );
}

HomeServicesIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        {
            title: 'خدمات الصفحة الرئيسية',
            href: '/dashboard/home-services',
        },
    ],
};

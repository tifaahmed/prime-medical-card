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

interface Testimonial {
    id: number;
    name: string;
    role: string | null;
    quote: string;
    avatar: string | null;
    is_featured: boolean;
    is_published: boolean;
    position: number;
}

export default function TestimonialsIndex({
    testimonials,
    filters,
}: {
    testimonials: PaginatedData<Testimonial>;
    filters: { search: string };
}) {
    const columns: Column<Testimonial>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        { key: 'position', label: 'الترتيب', render: (r) => r.position },
        {
            key: 'name',
            label: 'الاسم',
            render: (r) => <span dir="rtl">{r.name}</span>,
        },
        {
            key: 'role',
            label: 'الوظيفة / الموقع',
            render: (r) => <span dir="rtl">{r.role ?? '—'}</span>,
        },
        {
            key: 'is_featured',
            label: 'مميز',
            render: (r) => (r.is_featured ? 'نعم' : '—'),
        },
        {
            key: 'is_published',
            label: 'الحالة',
            render: (r) =>
                r.is_published ? (
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        منشور
                    </span>
                ) : (
                    <span className="rounded-full bg-zinc-500/15 px-2.5 py-0.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        مخفي
                    </span>
                ),
        },
    ];

    return (
        <>
            <Head title="آراء الأعضاء" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="آراء الأعضاء"
                        description="إدارة آراء الأعضاء التي تظهر في الصفحة الرئيسية."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/testimonials/create">
                            <PlusIcon className="size-4" />
                            إضافة رأي
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={testimonials}
                    editUrl={(r) => `/dashboard/testimonials/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/testimonials/${r.id}`}
                    searchUrl="/dashboard/testimonials"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث بالاسم…"
                />
            </div>
        </>
    );
}

TestimonialsIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'آراء الأعضاء', href: '/dashboard/testimonials' },
    ],
};

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

interface Offer {
    id: number;
    title: string;
    partner: string;
    discount: string | null;
    tag: string | null;
    accent_color: string | null;
    is_published: boolean;
    position: number;
}

export default function FeaturedOffersIndex({
    offers,
    filters,
}: {
    offers: PaginatedData<Offer>;
    filters: { search: string };
}) {
    const columns: Column<Offer>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        { key: 'position', label: 'الترتيب', render: (r) => r.position },
        {
            key: 'title',
            label: 'العنوان',
            render: (r) => <span dir="rtl">{r.title}</span>,
        },
        {
            key: 'partner',
            label: 'الشريك',
            render: (r) => <span dir="rtl">{r.partner}</span>,
        },
        {
            key: 'discount',
            label: 'الخصم',
            render: (r) => <span dir="rtl">{r.discount ?? '—'}</span>,
        },
        {
            key: 'tag',
            label: 'الشارة',
            render: (r) => <span dir="rtl">{r.tag ?? '—'}</span>,
        },
        {
            key: 'accent_color',
            label: 'اللون',
            render: (r) =>
                r.accent_color ? (
                    <div className="flex items-center gap-1.5">
                        <span
                            className="inline-block size-4 rounded-full border"
                            style={{ background: r.accent_color }}
                        />
                        <code className="text-xs">{r.accent_color}</code>
                    </div>
                ) : (
                    '—'
                ),
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
            <Head title="العروض المميزة" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="العروض المميزة"
                        description="إدارة بطاقات العروض الترويجية المعروضة في الصفحة الرئيسية."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/home-featured-offers/create">
                            <PlusIcon className="size-4" />
                            إضافة عرض
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={offers}
                    editUrl={(r) =>
                        `/dashboard/home-featured-offers/${r.id}/edit`
                    }
                    destroyUrl={(r) =>
                        `/dashboard/home-featured-offers/${r.id}`
                    }
                    searchUrl="/dashboard/home-featured-offers"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث بعنوان العرض…"
                />
            </div>
        </>
    );
}

FeaturedOffersIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        {
            title: 'العروض المميزة',
            href: '/dashboard/home-featured-offers',
        },
    ],
};

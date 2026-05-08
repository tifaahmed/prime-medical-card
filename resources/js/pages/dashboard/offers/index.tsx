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
    slug: string;
    offerable_type: string;
    offerable_name: { en: string; ar: string } | null;
    title: { en: string; ar: string };
    short_description: { en: string; ar: string };
    phone: string | null;
    price: number | string | null;
    old_price: number | string | null;
}

const OFFERABLE_LABELS: Record<string, string> = {
    Facility: 'منشأة',
    FacilityBranch: 'فرع',
};

export default function OffersIndex({
    offers,
    filters,
}: {
    offers: PaginatedData<Offer>;
    filters: { search: string };
}) {
    const columns: Column<Offer>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        {
            key: 'title_ar',
            label: 'العنوان',
            render: (r) => <span dir="rtl">{r.title.ar ?? '—'}</span>,
        },
        {
            key: 'offerable',
            label: 'تابع لـ',
            render: (r) => {
                const klass = r.offerable_type.split('\\').pop() ?? '';
                const label = OFFERABLE_LABELS[klass] ?? klass;

                return (
                    <span dir="rtl">
                        <span className="text-muted-foreground">{label}: </span>
                        {r.offerable_name?.ar ?? '—'}
                    </span>
                );
            },
        },
        {
            key: 'price',
            label: 'السعر',
            render: (r) =>
                r.price ? (
                    <span dir="ltr">
                        {r.price}
                        {r.old_price && (
                            <span className="mr-2 text-xs text-muted-foreground line-through">
                                {r.old_price}
                            </span>
                        )}
                    </span>
                ) : (
                    '—'
                ),
        },
    ];

    return (
        <>
            <Head title="العروض" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="العروض"
                        description="إدارة العروض والخصومات."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/offers/create">
                            <PlusIcon className="size-4" />
                            إضافة عرض
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={offers}
                    editUrl={(r) => `/dashboard/offers/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/offers/${r.id}`}
                    searchUrl="/dashboard/offers"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث بالعنوان…"
                />
            </div>
        </>
    );
}

OffersIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'العروض', href: '/dashboard/offers' },
    ],
};

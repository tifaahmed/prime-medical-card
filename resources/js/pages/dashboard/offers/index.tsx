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
            key: 'title_en',
            label: 'Title (EN)',
            render: (r) => r.title.en ?? '—',
        },
        {
            key: 'title_ar',
            label: 'العنوان (AR)',
            render: (r) => <span dir="rtl">{r.title.ar ?? '—'}</span>,
        },
        {
            key: 'offerable',
            label: 'Belongs to',
            render: (r) => {
                const label = r.offerable_type.split('\\').pop();

                return (
                    <span>
                        <span className="text-muted-foreground">{label}: </span>
                        {r.offerable_name?.en ?? '—'}
                    </span>
                );
            },
        },
        {
            key: 'price',
            label: 'Price',
            render: (r) =>
                r.price ? (
                    <span>
                        {r.price}
                        {r.old_price && (
                            <span className="ml-2 text-xs text-muted-foreground line-through">
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
            <Head title="Offers" />
            <div className="w-full space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Offers"
                        description="Manage offers in English and Arabic."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/offers/create">
                            <PlusIcon className="size-4" />
                            Add Offer
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
                />
            </div>
        </>
    );
}

OffersIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Offers', href: '/dashboard/offers' },
    ],
};

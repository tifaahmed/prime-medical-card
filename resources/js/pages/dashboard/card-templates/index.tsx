import { Head, Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DataTable from '@/pages/dashboard/_components/data-table';
import type {
    Column,
    PaginatedData,
} from '@/pages/dashboard/_components/data-table';
import { dashboard } from '@/routes';

interface CardTemplate {
    id: number;
    name: string;
    slug: string;
    is_default: boolean;
    front_empty_url: string | null;
    front_example_url: string | null;
    back_url: string | null;
    created_at: string | null;
}

export default function CardTemplatesIndex({
    templates,
    filters,
}: {
    templates: PaginatedData<CardTemplate>;
    filters: { search: string };
}) {
    const columns: Column<CardTemplate>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        {
            key: 'name',
            label: 'الاسم',
            render: (r) => (
                <span className="flex items-center gap-2">
                    {r.name}
                    {r.is_default && (
                        <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[10px] px-1.5 py-0">
                            افتراضي
                        </Badge>
                    )}
                </span>
            ),
        },
        {
            key: 'front_empty_url',
            label: 'الصور',
            render: (r) => (
                <span className="text-xs text-muted-foreground">
                    {[
                        r.front_empty_url && 'أمامي',
                        r.front_example_url && 'نموذج',
                        r.back_url && 'خلفي',
                    ]
                        .filter(Boolean)
                        .join('، ') || '—'}
                </span>
            ),
        },
        {
            key: 'created_at',
            label: 'تاريخ الإنشاء',
            render: (r) => r.created_at ?? '—',
        },
    ];

    return (
        <>
            <Head title="بطاقات العضوية" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="بطاقات العضوية"
                        description="إدارة قوالب بطاقات العضوية."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/card-templates/create">
                            <PlusIcon className="size-4" />
                            إضافة قالب
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={templates}
                    editUrl={(r) => `/dashboard/card-templates/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/card-templates/${r.id}`}
                    searchUrl="/dashboard/card-templates"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث في اسم القالب…"
                />
            </div>
        </>
    );
}

CardTemplatesIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        {
            title: 'بطاقات العضوية',
            href: '/dashboard/card-templates',
        },
    ],
};

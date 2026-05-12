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

interface Faq {
    id: number;
    question: string;
    answer: string;
    position: number;
    is_published: boolean;
}

export default function FaqsIndex({
    faqs,
    filters,
}: {
    faqs: PaginatedData<Faq>;
    filters: { search: string };
}) {
    const columns: Column<Faq>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        {
            key: 'position',
            label: 'الترتيب',
            render: (r) => r.position,
        },
        {
            key: 'question',
            label: 'السؤال',
            render: (r) => (
                <span dir="rtl" className="line-clamp-2">
                    {r.question}
                </span>
            ),
        },
        {
            key: 'is_published',
            label: 'الحالة',
            render: (r) =>
                r.is_published ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        منشور
                    </span>
                ) : (
                    <span className="inline-flex items-center rounded-full bg-zinc-500/15 px-2.5 py-0.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        مخفي
                    </span>
                ),
        },
    ];

    return (
        <>
            <Head title="الأسئلة الشائعة" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="الأسئلة الشائعة"
                        description="إدارة محتوى قسم الأسئلة الشائعة في الصفحة الرئيسية."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/faqs/create">
                            <PlusIcon className="size-4" />
                            إضافة سؤال
                        </Link>
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={faqs}
                    editUrl={(r) => `/dashboard/faqs/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/faqs/${r.id}`}
                    searchUrl="/dashboard/faqs"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث في السؤال…"
                />
            </div>
        </>
    );
}

FaqsIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'الأسئلة الشائعة', href: '/dashboard/faqs' },
    ],
};

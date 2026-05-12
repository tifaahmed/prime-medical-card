import { Head, Link, router } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import DataTable from '@/pages/dashboard/_components/data-table';
import type {
    Column,
    PaginatedData,
} from '@/pages/dashboard/_components/data-table';
import { dashboard } from '@/routes';

interface Content {
    id: number;
    page: string;
    section: string;
    key: string;
    value: string | null;
    is_rich: boolean;
}

const PAGE_LABELS: Record<string, string> = {
    home: 'الرئيسية',
    about: 'عن الشركة',
    partners: 'الشركاء',
    contact: 'تواصل معنا',
};

export default function PageContentsIndex({
    contents,
    filters,
    pages,
}: {
    contents: PaginatedData<Content>;
    filters: { search: string; page: string };
    pages: string[];
}) {
    const columns: Column<Content>[] = [
        { key: 'id', label: '#', render: (r) => r.id },
        {
            key: 'page',
            label: 'الصفحة',
            render: (r) => <span dir="rtl">{PAGE_LABELS[r.page] ?? r.page}</span>,
        },
        {
            key: 'section',
            label: 'القسم',
            render: (r) => <code className="text-xs">{r.section}</code>,
        },
        {
            key: 'key',
            label: 'المفتاح',
            render: (r) => <code className="text-xs">{r.key}</code>,
        },
        {
            key: 'value',
            label: 'القيمة',
            render: (r) => (
                <span dir="rtl" className="line-clamp-2 max-w-md text-xs">
                    {r.value ?? '—'}
                </span>
            ),
        },
    ];

    const onPageFilterChange = (v: string) => {
        router.get(
            '/dashboard/page-contents',
            { page: v === '__all' ? '' : v, search: filters.search },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <>
            <Head title="محتوى الصفحات (عام)" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="محتوى الصفحات (عام)"
                        description="إدارة العناوين والفقرات النصية الموزعة على الصفحات."
                    />
                    <Button asChild className="gap-1.5">
                        <Link href="/dashboard/page-contents/create">
                            <PlusIcon className="size-4" />
                            إضافة محتوى
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm">تصفية حسب الصفحة:</span>
                    <Select
                        value={filters.page || '__all'}
                        onValueChange={onPageFilterChange}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="__all">الكل</SelectItem>
                            {pages.map((p) => (
                                <SelectItem key={p} value={p}>
                                    {PAGE_LABELS[p] ?? p}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <DataTable
                    columns={columns}
                    data={contents}
                    editUrl={(r) => `/dashboard/page-contents/${r.id}/edit`}
                    destroyUrl={(r) => `/dashboard/page-contents/${r.id}`}
                    searchUrl="/dashboard/page-contents"
                    initialSearch={filters.search}
                    searchPlaceholder="ابحث في القسم أو المفتاح…"
                />
            </div>
        </>
    );
}

PageContentsIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'محتوى الصفحات', href: '/dashboard/page-contents' },
    ],
};

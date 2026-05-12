import { Link, router } from '@inertiajs/react';
import { EyeIcon, PencilIcon, SearchIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface Column<T> {
    key: string;
    label: string;
    render: (row: T) => ReactNode;
}

export interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    from: number | null;
    to: number | null;
    total: number;
}

interface Props<T extends { id: number }> {
    columns: Column<T>[];
    data: PaginatedData<T>;
    editUrl: (row: T) => string;
    destroyUrl: (row: T) => string;
    showUrl?: (row: T) => string;
    extraActions?: (row: T) => ReactNode;
    searchUrl: string;
    initialSearch?: string;
    emptyMessage?: string;
    searchPlaceholder?: string;
}

function getCreatedAt(row: unknown): string | null {
    if (typeof row === 'object' && row !== null && 'created_at' in row) {
        const v = (row as { created_at?: unknown }).created_at;
        return typeof v === 'string' ? v : null;
    }
    return null;
}

function formatCreatedAt(value: string | null): string {
    if (!value) {
        return '—';
    }
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) {
        return value;
    }
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

export default function DataTable<T extends { id: number }>({
    columns,
    data,
    editUrl,
    destroyUrl,
    showUrl,
    extraActions,
    searchUrl,
    initialSearch = '',
    emptyMessage = 'لا توجد سجلات.',
    searchPlaceholder = 'ابحث…',
}: Props<T>) {
    const [search, setSearch] = useState(initialSearch);
    const [pendingDelete, setPendingDelete] = useState<T | null>(null);

    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            searchUrl,
            { search },
            { preserveState: true, replace: true },
        );
    };

    const confirmDelete = () => {
        if (!pendingDelete) {
            return;
        }

        router.delete(destroyUrl(pendingDelete), {
            onFinish: () => setPendingDelete(null),
        });
    };

    const renderActions = (row: T) => (
        <>
            {extraActions?.(row)}
            {showUrl && (
                <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="btn-view gap-1.5"
                >
                    <Link href={showUrl(row)}>
                        <EyeIcon className="size-3.5" />
                        عرض
                    </Link>
                </Button>
            )}
            <Button
                asChild
                size="sm"
                variant="outline"
                className="btn-edit gap-1.5"
            >
                <Link href={editUrl(row)}>
                    <PencilIcon className="size-3.5" />
                    تعديل
                </Link>
            </Button>
            <Button
                size="sm"
                variant="outline"
                onClick={() => setPendingDelete(row)}
                className="btn-delete gap-1.5"
            >
                <TrashIcon className="size-3.5" />
                حذف
            </Button>
        </>
    );

    return (
        <div dir="rtl">
            <form
                onSubmit={submitSearch}
                className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border bg-card p-3 shadow-sm"
            >
                <div className="relative max-w-md flex-1">
                    <SearchIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pr-9"
                    />
                </div>
                <Button type="submit" variant="secondary">
                    بحث
                </Button>
                {initialSearch && (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                            setSearch('');
                            router.get(
                                searchUrl,
                                {},
                                { preserveState: true, replace: true },
                            );
                        }}
                    >
                        إلغاء
                    </Button>
                )}
            </form>

            <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-max text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                {columns.map((c) => (
                                    <th
                                        key={c.key}
                                        className="px-4 py-3 text-right font-medium whitespace-nowrap text-muted-foreground"
                                    >
                                        {c.label}
                                    </th>
                                ))}
                                <th className="px-4 py-3 text-right font-medium whitespace-nowrap text-muted-foreground">
                                    تاريخ الإنشاء
                                </th>
                                <th className="px-4 py-3 text-left font-medium whitespace-nowrap text-muted-foreground">
                                    إجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.length === 0 && (
                                <tr>
                                    <td
                                        className="px-4 py-12 text-center text-muted-foreground"
                                        colSpan={columns.length + 2}
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            )}
                            {data.data.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b transition-colors last:border-b-0 hover:bg-muted/40"
                                >
                                    {columns.map((c) => (
                                        <td
                                            key={c.key}
                                            className="px-4 py-3 align-top"
                                        >
                                            {c.render(row)}
                                        </td>
                                    ))}
                                    <td
                                        className="px-4 py-3 align-top text-xs whitespace-nowrap text-muted-foreground"
                                        dir="ltr"
                                    >
                                        {formatCreatedAt(getCreatedAt(row))}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-start gap-2 whitespace-nowrap">
                                            {renderActions(row)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {data.data.length === 0 ? (
                    <div className="px-4 py-12 text-center text-muted-foreground md:hidden">
                        {emptyMessage}
                    </div>
                ) : (
                    <ul className="divide-y md:hidden">
                        {data.data.map((row) => (
                            <li key={row.id} className="space-y-3 p-4">
                                <dl className="space-y-2">
                                    {columns.map((c) =>
                                        c.label ? (
                                            <div
                                                key={c.key}
                                                className="flex items-start justify-between gap-3"
                                            >
                                                <dt className="shrink-0 text-xs font-medium text-muted-foreground">
                                                    {c.label}
                                                </dt>
                                                <dd className="min-w-0 text-end">
                                                    {c.render(row)}
                                                </dd>
                                            </div>
                                        ) : (
                                            <div key={c.key}>
                                                {c.render(row)}
                                            </div>
                                        ),
                                    )}
                                    <div className="flex items-start justify-between gap-3">
                                        <dt className="shrink-0 text-xs font-medium text-muted-foreground">
                                            تاريخ الإنشاء
                                        </dt>
                                        <dd
                                            className="min-w-0 text-end text-xs text-muted-foreground"
                                            dir="ltr"
                                        >
                                            {formatCreatedAt(getCreatedAt(row))}
                                        </dd>
                                    </div>
                                </dl>
                                <div className="flex flex-wrap items-center gap-2 border-t pt-3">
                                    {renderActions(row)}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {data.total > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t bg-muted/30 px-4 py-3 text-sm">
                        <p className="text-muted-foreground">
                            {data.from ?? 0}–{data.to ?? 0} من {data.total}
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {data.links.map((link, i) => (
                                <Button
                                    key={i}
                                    asChild={Boolean(link.url)}
                                    disabled={!link.url}
                                    variant={
                                        link.active ? 'default' : 'outline'
                                    }
                                    size="sm"
                                    className={cn(
                                        'min-w-9 px-2',
                                        !link.url && 'opacity-40',
                                    )}
                                >
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ) : (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    )}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Dialog
                open={pendingDelete !== null}
                onOpenChange={(open) => !open && setPendingDelete(null)}
            >
                <DialogContent
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle>حذف السجل؟</DialogTitle>
                        <DialogDescription>
                            لا يمكن التراجع عن هذا الإجراء.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setPendingDelete(null)}
                        >
                            إلغاء
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            حذف
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

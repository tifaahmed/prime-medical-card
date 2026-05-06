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
    searchUrl: string;
    initialSearch?: string;
    emptyMessage?: string;
}

export default function DataTable<T extends { id: number }>({
    columns,
    data,
    editUrl,
    destroyUrl,
    showUrl,
    searchUrl,
    initialSearch = '',
    emptyMessage = 'No records found.',
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

    return (
        <>
            <form
                onSubmit={submitSearch}
                className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border bg-card p-3 shadow-sm"
            >
                <div className="relative max-w-md flex-1">
                    <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search by slug…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Button type="submit" variant="secondary">
                    Search
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
                        Clear
                    </Button>
                )}
            </form>

            <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b bg-muted/50">
                            {columns.map((c) => (
                                <th
                                    key={c.key}
                                    className="px-4 py-3 text-left font-medium text-muted-foreground"
                                >
                                    {c.label}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length === 0 && (
                            <tr>
                                <td
                                    className="px-4 py-12 text-center text-muted-foreground"
                                    colSpan={columns.length + 1}
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
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-end gap-2">
                                        {showUrl && (
                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                                className="btn-view gap-1.5"
                                            >
                                                <Link href={showUrl(row)}>
                                                    <EyeIcon className="size-3.5" />
                                                    View
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
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                setPendingDelete(row)
                                            }
                                            className="btn-delete gap-1.5"
                                        >
                                            <TrashIcon className="size-3.5" />
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {data.total > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t bg-muted/30 px-4 py-3 text-sm">
                        <p className="text-muted-foreground">
                            {data.from ?? 0}–{data.to ?? 0} of {data.total}
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
                        <DialogTitle>Delete record?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setPendingDelete(null)}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

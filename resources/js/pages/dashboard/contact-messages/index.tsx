import { Head, router } from '@inertiajs/react';
import {
    CheckCircle2Icon,
    MailIcon,
    MailOpenIcon,
    SearchIcon,
    TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
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
import type { PaginatedData } from '@/pages/dashboard/_components/data-table';
import { dashboard } from '@/routes';

interface Message {
    id: number;
    name: string;
    phone: string;
    subject: string;
    is_read: boolean;
    created_at: string | null;
}

export default function ContactMessagesIndex({
    messages,
    filters,
    unreadCount,
}: {
    messages: PaginatedData<Message>;
    filters: { search: string };
    unreadCount: number;
}) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [pendingDelete, setPendingDelete] = useState<Message | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/dashboard/contact-messages',
            { search },
            { preserveState: true, replace: true },
        );
    };

    const toggleRead = (m: Message) => {
        router.put(
            `/dashboard/contact-messages/${m.id}`,
            { is_read: !m.is_read },
            { preserveScroll: true },
        );
    };

    const confirmDelete = () => {
        if (!pendingDelete) {
            return;
        }
        router.delete(`/dashboard/contact-messages/${pendingDelete.id}`, {
            onFinish: () => setPendingDelete(null),
        });
    };

    return (
        <>
            <Head title="رسائل التواصل" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <Heading
                        title="رسائل التواصل"
                        description="الرسائل الواردة من نموذج اتصل بنا."
                    />
                    {unreadCount > 0 && (
                        <Badge variant="secondary" className="gap-1.5">
                            <MailIcon className="size-3.5" />
                            {unreadCount} غير مقروءة
                        </Badge>
                    )}
                </div>

                <form
                    onSubmit={submitSearch}
                    className="flex flex-wrap items-center gap-2 rounded-2xl border bg-card p-3 shadow-sm"
                >
                    <div className="relative max-w-md flex-1">
                        <SearchIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="ابحث بالاسم أو الهاتف أو الموضوع..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pr-9"
                        />
                    </div>
                    <Button type="submit" variant="secondary">
                        بحث
                    </Button>
                    {filters.search && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                setSearch('');
                                router.get(
                                    '/dashboard/contact-messages',
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
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                                    الحالة
                                </th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                                    الاسم
                                </th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                                    الهاتف
                                </th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                                    الموضوع
                                </th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                                    التاريخ
                                </th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                                    إجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.data.length === 0 && (
                                <tr>
                                    <td
                                        className="px-4 py-12 text-center text-muted-foreground"
                                        colSpan={6}
                                    >
                                        لا توجد رسائل.
                                    </td>
                                </tr>
                            )}
                            {messages.data.map((m) => {
                                const expanded = expandedId === m.id;
                                return (
                                    <tr
                                        key={m.id}
                                        className={
                                            'border-b transition-colors last:border-b-0 hover:bg-muted/40 ' +
                                            (m.is_read
                                                ? ''
                                                : 'bg-amber-50/40 font-medium')
                                        }
                                    >
                                        <td className="px-4 py-3 align-top">
                                            {m.is_read ? (
                                                <Badge
                                                    variant="outline"
                                                    className="gap-1"
                                                >
                                                    <MailOpenIcon className="size-3" />
                                                    مقروءة
                                                </Badge>
                                            ) : (
                                                <Badge className="gap-1">
                                                    <MailIcon className="size-3" />
                                                    جديدة
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            {m.name}
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <a
                                                href={`tel:${m.phone}`}
                                                dir="ltr"
                                                className="text-primary hover:underline"
                                            >
                                                {m.phone}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setExpandedId(
                                                        expanded ? null : m.id,
                                                    )
                                                }
                                                className="text-start"
                                            >
                                                <div
                                                    className={
                                                        expanded
                                                            ? 'whitespace-pre-wrap'
                                                            : 'line-clamp-2 max-w-md'
                                                    }
                                                >
                                                    {m.subject}
                                                </div>
                                                {!expanded &&
                                                    m.subject.length > 120 && (
                                                        <span className="mt-1 inline-block text-xs text-primary">
                                                            عرض الكامل
                                                        </span>
                                                    )}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 align-top text-xs whitespace-nowrap text-muted-foreground">
                                            {m.created_at ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <div className="flex items-center justify-start gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="gap-1.5"
                                                    onClick={() =>
                                                        toggleRead(m)
                                                    }
                                                >
                                                    {m.is_read ? (
                                                        <>
                                                            <MailIcon className="size-3.5" />
                                                            وضع كغير مقروءة
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CheckCircle2Icon className="size-3.5" />
                                                            وضع كمقروءة
                                                        </>
                                                    )}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="gap-1.5 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                                    onClick={() =>
                                                        setPendingDelete(m)
                                                    }
                                                >
                                                    <TrashIcon className="size-3.5" />
                                                    حذف
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {messages.links.length > 3 && (
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
                            <span>
                                {messages.from ?? 0}-{messages.to ?? 0} من{' '}
                                {messages.total}
                            </span>
                            <div className="flex flex-wrap gap-1">
                                {messages.links.map((link, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url &&
                                            router.get(
                                                link.url,
                                                {},
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                },
                                            )
                                        }
                                        className={
                                            'rounded-md border px-2 py-1 ' +
                                            (link.active
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : link.url
                                                  ? 'hover:bg-muted'
                                                  : 'opacity-40')
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Dialog
                open={pendingDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setPendingDelete(null);
                    }
                }}
            >
                <DialogContent dir="rtl">
                    <DialogHeader>
                        <DialogTitle>حذف الرسالة</DialogTitle>
                        <DialogDescription>
                            سيتم حذف رسالة {pendingDelete?.name} نهائياً ولا
                            يمكن التراجع.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => setPendingDelete(null)}
                        >
                            إلغاء
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                        >
                            حذف
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

ContactMessagesIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'رسائل التواصل', href: '/dashboard/contact-messages' },
    ],
};

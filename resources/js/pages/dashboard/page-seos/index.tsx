import { Head, Link } from '@inertiajs/react';
import { ExternalLinkIcon, PencilIcon } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

interface SeoSummary {
    id: number;
    page_key: string;
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    keywords: string[];
    noindex: boolean;
    og_image_url: string | null;
}

interface PageEntry {
    page_key: string;
    label: string;
    path: string;
    seo: SeoSummary | null;
}

export default function PageSeosIndex({ pages }: { pages: PageEntry[] }) {
    return (
        <>
            <Head title="SEO الصفحات" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="SEO الصفحات"
                    description="تحكم في عناوين ووصف وكلمات والصور المعروضة عند مشاركة الصفحات العامة على محركات البحث ومواقع التواصل."
                />
                <ul className="grid gap-3 md:grid-cols-2">
                    {pages.map((p) => (
                        <li
                            key={p.page_key}
                            className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm"
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                                    {p.seo?.og_image_url ? (
                                        <img
                                            src={p.seo.og_image_url}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-xs text-muted-foreground">
                                            بدون صورة
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-heading text-lg font-semibold">
                                            {p.label}
                                        </h3>
                                        <a
                                            href={p.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                                        >
                                            <code dir="ltr">{p.path}</code>
                                            <ExternalLinkIcon className="size-3" />
                                        </a>
                                    </div>
                                    <p
                                        dir="rtl"
                                        className="line-clamp-2 text-sm"
                                    >
                                        {p.seo?.title.ar || (
                                            <span className="text-muted-foreground">
                                                لم يُحدَّد عنوان
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 border-t pt-3">
                                {p.seo?.noindex && (
                                    <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-amber-600 uppercase">
                                        مخفية من البحث
                                    </span>
                                )}
                                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                    {p.seo?.keywords.length ?? 0} كلمة مفتاحية
                                </span>
                                <div className="mr-auto">
                                    {p.seo && (
                                        <Button
                                            asChild
                                            size="sm"
                                            className="gap-1.5"
                                        >
                                            <Link
                                                href={`/dashboard/page-seos/${p.seo.id}/edit`}
                                            >
                                                <PencilIcon className="size-3.5" />
                                                تعديل
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

PageSeosIndex.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'SEO الصفحات', href: '/dashboard/page-seos' },
    ],
};

import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import PageSeoForm from '@/pages/dashboard/page-seos/_form';
import { dashboard } from '@/routes';

interface PageSeo {
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
    path: string | null;
    seo: PageSeo;
}

export default function PageSeoEdit({ page }: { page: PageEntry }) {
    const { data, setData, post, processing, errors } = useForm({
        title: page.seo.title,
        description: page.seo.description,
        keywords: page.seo.keywords ?? [],
        noindex: page.seo.noindex,
        og_image: null as File | null,
        og_image_url: page.seo.og_image_url,
        og_image_remove: false,
        _method: 'put',
    });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/page-seos/${page.seo.id}?redirect=${intent}`, {
            forceFormData: true,
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل SEO — ${page.label}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title={`تعديل SEO — ${page.label}`}
                    description={page.path ? `المسار: ${page.path}` : undefined}
                />
                <PageSeoForm
                    data={data}
                    setData={setData as never}
                    submit={submit}
                    onSave={save}
                    processing={processing}
                    errors={errors as Record<string, string>}
                    cancelHref="/dashboard/page-seos"
                />
            </div>
        </>
    );
}

PageSeoEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'SEO الصفحات', href: '/dashboard/page-seos' },
        { title: 'تعديل', href: '#' },
    ],
};

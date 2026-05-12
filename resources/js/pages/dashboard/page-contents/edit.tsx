import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import PageContentForm from '@/pages/dashboard/page-contents/_form';
import type { ContentFormData } from '@/pages/dashboard/page-contents/_form';
import { dashboard } from '@/routes';

interface Content {
    id: number;
    page: string;
    section: string;
    key: string;
    value: string | null;
    is_rich: boolean;
}

export default function PageContentEdit({
    content,
    pages,
}: {
    content: Content;
    pages: string[];
}) {
    const { data, setData, put, processing, errors } = useForm<ContentFormData>({
        page: content.page,
        section: content.section,
        key: content.key,
        value: content.value ?? '',
        is_rich: content.is_rich,
    });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/page-contents/${content.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل: ${content.section}.${content.key}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="تعديل محتوى"
                    description={`${content.page} → ${content.section}.${content.key}`}
                />
                <form onSubmit={submit} className="w-full space-y-6">
                    <PageContentForm
                        data={data}
                        setData={setData}
                        errors={
                            errors as Partial<
                                Record<keyof ContentFormData | 'uniq', string>
                            >
                        }
                        processing={processing}
                        pages={pages}
                    />
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/page-contents"
                        onSave={save}
                    />
                </form>
            </div>
        </>
    );
}

PageContentEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'محتوى الصفحات', href: '/dashboard/page-contents' },
        { title: 'تعديل', href: '#' },
    ],
};

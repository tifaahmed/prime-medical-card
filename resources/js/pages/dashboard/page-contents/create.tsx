import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import PageContentForm from '@/pages/dashboard/page-contents/_form';
import type { ContentFormData } from '@/pages/dashboard/page-contents/_form';
import { dashboard } from '@/routes';

export default function PageContentCreate({ pages }: { pages: string[] }) {
    const { data, setData, post, processing, errors } =
        useForm<ContentFormData>({
            page: pages[0] ?? 'home',
            section: '',
            key: '',
            value: '',
            is_rich: false,
        });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/page-contents?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="محتوى جديد" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="محتوى جديد"
                    description="أضف نصاً قابلاً للتعديل في إحدى صفحات الموقع."
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
                        primaryLabel="إنشاء"
                    />
                </form>
            </div>
        </>
    );
}

PageContentCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'محتوى الصفحات', href: '/dashboard/page-contents' },
        { title: 'جديد', href: '/dashboard/page-contents/create' },
    ],
};

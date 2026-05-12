import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import EntryForm from '@/pages/dashboard/about-timeline/_form';
import type { EntryFormData } from '@/pages/dashboard/about-timeline/_form';
import { dashboard } from '@/routes';

export default function AboutTimelineCreate() {
    const { data, setData, post, processing, errors } = useForm<EntryFormData>({
        year: '',
        title: '',
        description: '',
        is_published: true,
        position: 0,
    });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/about-timeline?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="محطة جديدة" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading title="محطة جديدة" />
                <form onSubmit={submit} className="w-full space-y-6">
                    <EntryForm
                        data={data}
                        setData={setData}
                        errors={errors as Partial<Record<keyof EntryFormData, string>>}
                        processing={processing}
                    />
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/about-timeline"
                        onSave={save}
                        primaryLabel="إنشاء"
                    />
                </form>
            </div>
        </>
    );
}

AboutTimelineCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'الخط الزمني', href: '/dashboard/about-timeline' },
        { title: 'جديدة', href: '/dashboard/about-timeline/create' },
    ],
};

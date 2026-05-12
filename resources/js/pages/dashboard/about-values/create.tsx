import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import ValueForm from '@/pages/dashboard/about-values/_form';
import type { ValueFormData } from '@/pages/dashboard/about-values/_form';
import { dashboard } from '@/routes';

export default function AboutValueCreate({
    iconKeys,
}: {
    iconKeys: string[];
}) {
    const { data, setData, post, processing, errors } = useForm<ValueFormData>({
        title: '',
        description: '',
        icon_key: iconKeys[0] ?? '',
        is_published: true,
        position: 0,
    });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/about-values?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="قيمة جديدة" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading title="قيمة جديدة" />
                <form onSubmit={submit} className="w-full space-y-6">
                    <ValueForm
                        data={data}
                        setData={setData}
                        errors={errors as Partial<Record<keyof ValueFormData, string>>}
                        processing={processing}
                        iconKeys={iconKeys}
                    />
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/about-values"
                        onSave={save}
                        primaryLabel="إنشاء"
                    />
                </form>
            </div>
        </>
    );
}

AboutValueCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'قيمنا', href: '/dashboard/about-values' },
        { title: 'جديدة', href: '/dashboard/about-values/create' },
    ],
};

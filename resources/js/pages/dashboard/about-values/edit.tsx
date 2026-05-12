import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import ValueForm from '@/pages/dashboard/about-values/_form';
import type { ValueFormData } from '@/pages/dashboard/about-values/_form';
import { dashboard } from '@/routes';

interface Value {
    id: number;
    title: string;
    description: string | null;
    icon_key: string;
    is_published: boolean;
    position: number;
}

export default function AboutValueEdit({
    value,
    iconKeys,
}: {
    value: Value;
    iconKeys: string[];
}) {
    const { data, setData, put, processing, errors } = useForm<ValueFormData>({
        title: value.title,
        description: value.description ?? '',
        icon_key: value.icon_key,
        is_published: value.is_published,
        position: value.position,
    });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/about-values/${value.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل: ${value.title}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading title="تعديل قيمة" description={`#${value.id}`} />
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
                    />
                </form>
            </div>
        </>
    );
}

AboutValueEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'قيمنا', href: '/dashboard/about-values' },
        { title: 'تعديل', href: '#' },
    ],
};

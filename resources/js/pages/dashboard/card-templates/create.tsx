import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import CardTemplateForm from '@/pages/dashboard/card-templates/_form';
import type { CardTemplateFormData } from '@/pages/dashboard/card-templates/_form';
import type { CardLayout } from '@/components/card-preview';
import { dashboard } from '@/routes';

export default function CardTemplateCreate({
    defaultLayout,
}: {
    defaultLayout: CardLayout;
}) {
    const { data, setData, post, processing, errors } =
        useForm<CardTemplateFormData>({
            name: '',
            is_default: false,
            front_empty: null,
            front_example: null,
            back: null,
            front_empty_remove: false,
            front_example_remove: false,
            back_remove: false,
            layout: defaultLayout,
        });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/card-templates?redirect=${intent}`, {
            forceFormData: true,
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="قالب بطاقة جديد" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="قالب بطاقة جديد"
                    description="أضف قالب بطاقة عضوية جديد."
                />
                <form onSubmit={submit} className="w-full space-y-6">
                    <CardTemplateForm
                        data={data}
                        setData={setData}
                        errors={
                            errors as Partial<
                                Record<keyof CardTemplateFormData, string>
                            >
                        }
                        processing={processing}
                        defaultLayout={defaultLayout}
                    />
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/card-templates"
                        onSave={save}
                        primaryLabel="إنشاء"
                    />
                </form>
            </div>
        </>
    );
}

CardTemplateCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        {
            title: 'بطاقات العضوية',
            href: '/dashboard/card-templates',
        },
        { title: 'جديد', href: '/dashboard/card-templates/create' },
    ],
};

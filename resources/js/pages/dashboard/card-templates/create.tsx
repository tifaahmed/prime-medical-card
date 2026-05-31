import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import CardTemplateForm from '@/pages/dashboard/card-templates/_form';
import type { CardTemplateFormData } from '@/pages/dashboard/card-templates/_form';
import { dashboard } from '@/routes';

const DEFAULT_LAYOUT = {
    first_name: { top: 32, left: 8, fontSize: 4.5 },
    full_name: { top: 41, left: 8, fontSize: 2.6 },
    work_place: { top: 50.17, left: 24.07, fontSize: 2.2 },
    company: { top: 60, left: 8, fontSize: 2.4 },
    date: { top: 77, left: 11, fontSize: 2.8 },
    membership_number: { top: 85, left: 11, fontSize: 2.0 },
    photo: { top: 22, left: 74.2, width: 18.4, height: 36.5 },
    qr: { top: 70.74, left: 76.68, width: 13.22, height: 19.58 },
} satisfies CardTemplateFormData['layout'];

export default function CardTemplateCreate() {
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
            layout: DEFAULT_LAYOUT,
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

import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import TranslatableInput from '@/pages/dashboard/_components/translatable-input';
import { dashboard } from '@/routes';

export default function FacilityTypeCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: { en: '', ar: '' },
    });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/facility-types?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="نوع منشأة جديد" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="نوع منشأة جديد"
                    description="أدخل اسم النوع."
                />
                <form onSubmit={submit} className="w-full space-y-6">
                    <div className="rounded-3xl border bg-card p-6 shadow-sm">
                        <TranslatableInput
                            name="name"
                            label="الاسم"
                            values={data.name}
                            onChange={(locale, value) =>
                                setData('name', {
                                    ...data.name,
                                    [locale]: value,
                                })
                            }
                            errors={errors as Record<string, string>}
                            required
                        />
                    </div>
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/facility-types"
                        onSave={save}
                        primaryLabel="إنشاء"
                    />
                </form>
            </div>
        </>
    );
}

FacilityTypeCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'أنواع المنشآت', href: '/dashboard/facility-types' },
        { title: 'جديد', href: '/dashboard/facility-types/create' },
    ],
};

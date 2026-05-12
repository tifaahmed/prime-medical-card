import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import PlanForm from '@/pages/dashboard/pricing-plans/_form';
import type { PlanFormData } from '@/pages/dashboard/pricing-plans/_form';
import { dashboard } from '@/routes';

export default function PlanCreate() {
    const { data, setData, post, processing, errors } = useForm<PlanFormData>({
        name: '',
        description: '',
        price: '',
        period: '',
        features: [],
        badge: '',
        is_featured: false,
        cta_label: 'اشترك الآن',
        cta_variant: 'primary',
        is_published: true,
        position: 0,
    });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/pricing-plans?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="باقة جديدة" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="باقة جديدة"
                    description="أضف باقة اشتراك لتظهر في قسم الأسعار."
                />
                <form onSubmit={submit} className="w-full space-y-6">
                    <PlanForm
                        data={data}
                        setData={setData}
                        errors={errors as Record<string, string>}
                        processing={processing}
                    />
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/pricing-plans"
                        onSave={save}
                        primaryLabel="إنشاء"
                    />
                </form>
            </div>
        </>
    );
}

PlanCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'الباقات', href: '/dashboard/pricing-plans' },
        { title: 'جديدة', href: '/dashboard/pricing-plans/create' },
    ],
};

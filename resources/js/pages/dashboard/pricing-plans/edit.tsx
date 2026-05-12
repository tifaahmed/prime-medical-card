import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import PlanForm from '@/pages/dashboard/pricing-plans/_form';
import type { PlanFormData } from '@/pages/dashboard/pricing-plans/_form';
import { dashboard } from '@/routes';

interface Plan {
    id: number;
    name: string;
    description: string | null;
    price: string;
    period: string | null;
    features: string[];
    badge: string | null;
    is_featured: boolean;
    cta_label: string;
    cta_variant: 'ghost' | 'amber' | 'primary';
    is_published: boolean;
    position: number;
}

export default function PlanEdit({ plan }: { plan: Plan }) {
    const { data, setData, put, processing, errors } = useForm<PlanFormData>({
        name: plan.name,
        description: plan.description ?? '',
        price: plan.price,
        period: plan.period ?? '',
        features: plan.features ?? [],
        badge: plan.badge ?? '',
        is_featured: plan.is_featured,
        cta_label: plan.cta_label,
        cta_variant: plan.cta_variant,
        is_published: plan.is_published,
        position: plan.position,
    });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/pricing-plans/${plan.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل: ${plan.name}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading title="تعديل باقة" description={`#${plan.id}`} />
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
                    />
                </form>
            </div>
        </>
    );
}

PlanEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'الباقات', href: '/dashboard/pricing-plans' },
        { title: 'تعديل', href: '#' },
    ],
};

import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import HomeStepForm from '@/pages/dashboard/home-steps/_form';
import type { StepFormData } from '@/pages/dashboard/home-steps/_form';
import { dashboard } from '@/routes';

interface Step {
    id: number;
    title: string;
    description: string | null;
    icon_key: string;
    is_published: boolean;
    position: number;
}

export default function HomeStepEdit({
    step,
    iconKeys,
}: {
    step: Step;
    iconKeys: string[];
}) {
    const { data, setData, put, processing, errors } = useForm<StepFormData>({
        title: step.title,
        description: step.description ?? '',
        icon_key: step.icon_key,
        is_published: step.is_published,
        position: step.position,
    });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/home-steps/${step.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل: ${step.title}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading title="تعديل خطوة" description={`#${step.id}`} />
                <form onSubmit={submit} className="w-full space-y-6">
                    <HomeStepForm
                        data={data}
                        setData={setData}
                        errors={errors as Partial<Record<keyof StepFormData, string>>}
                        processing={processing}
                        iconKeys={iconKeys}
                    />
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/home-steps"
                        onSave={save}
                    />
                </form>
            </div>
        </>
    );
}

HomeStepEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'كيف نعمل', href: '/dashboard/home-steps' },
        { title: 'تعديل', href: '#' },
    ],
};

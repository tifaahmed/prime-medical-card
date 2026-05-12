import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import HomeStepForm from '@/pages/dashboard/home-steps/_form';
import type { StepFormData } from '@/pages/dashboard/home-steps/_form';
import { dashboard } from '@/routes';

export default function HomeStepCreate({ iconKeys }: { iconKeys: string[] }) {
    const { data, setData, post, processing, errors } = useForm<StepFormData>({
        title: '',
        description: '',
        icon_key: iconKeys[0] ?? '',
        is_published: true,
        position: 0,
    });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/home-steps?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="خطوة جديدة" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="خطوة جديدة"
                    description="أضف خطوة لقسم ”كيف نعمل“."
                />
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
                        primaryLabel="إنشاء"
                    />
                </form>
            </div>
        </>
    );
}

HomeStepCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'كيف نعمل', href: '/dashboard/home-steps' },
        { title: 'جديدة', href: '/dashboard/home-steps/create' },
    ],
};

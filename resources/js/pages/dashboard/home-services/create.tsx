import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import HomeServiceForm from '@/pages/dashboard/home-services/_form';
import type { ServiceFormData } from '@/pages/dashboard/home-services/_form';
import { dashboard } from '@/routes';

export default function HomeServiceCreate({
    iconKeys,
}: {
    iconKeys: string[];
}) {
    const { data, setData, post, processing, errors } =
        useForm<ServiceFormData>({
            title: '',
            description: '',
            discount: '',
            icon_key: iconKeys[0] ?? '',
            is_published: true,
            position: 0,
        });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/home-services?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="خدمة جديدة" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="خدمة جديدة"
                    description="أضف خدمة طبية تظهر في الصفحة الرئيسية."
                />
                <form onSubmit={submit} className="w-full space-y-6">
                    <HomeServiceForm
                        data={data}
                        setData={setData}
                        errors={errors as Partial<Record<keyof ServiceFormData, string>>}
                        processing={processing}
                        iconKeys={iconKeys}
                    />
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/home-services"
                        onSave={save}
                        primaryLabel="إنشاء"
                    />
                </form>
            </div>
        </>
    );
}

HomeServiceCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'خدمات الصفحة الرئيسية', href: '/dashboard/home-services' },
        { title: 'جديدة', href: '/dashboard/home-services/create' },
    ],
};

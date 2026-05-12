import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import HomeServiceForm from '@/pages/dashboard/home-services/_form';
import type { ServiceFormData } from '@/pages/dashboard/home-services/_form';
import { dashboard } from '@/routes';

interface Service {
    id: number;
    title: string;
    description: string | null;
    discount: string | null;
    icon_key: string;
    is_published: boolean;
    position: number;
}

export default function HomeServiceEdit({
    service,
    iconKeys,
}: {
    service: Service;
    iconKeys: string[];
}) {
    const { data, setData, put, processing, errors } =
        useForm<ServiceFormData>({
            title: service.title,
            description: service.description ?? '',
            discount: service.discount ?? '',
            icon_key: service.icon_key,
            is_published: service.is_published,
            position: service.position,
        });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/home-services/${service.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل: ${service.title}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading title="تعديل خدمة" description={`#${service.id}`} />
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
                    />
                </form>
            </div>
        </>
    );
}

HomeServiceEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'خدمات الصفحة الرئيسية', href: '/dashboard/home-services' },
        { title: 'تعديل', href: '#' },
    ],
};

import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import FeaturedOfferForm from '@/pages/dashboard/home-featured-offers/_form';
import type { FeaturedOfferFormData } from '@/pages/dashboard/home-featured-offers/_form';
import { dashboard } from '@/routes';

export default function FeaturedOfferCreate() {
    const { data, setData, post, processing, errors } =
        useForm<FeaturedOfferFormData>({
            title: '',
            partner: '',
            description: '',
            discount: '',
            expires_text: '',
            tag: '',
            accent_color: '#0b2e2c',
            is_published: true,
            position: 0,
        });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/home-featured-offers?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="عرض جديد" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="عرض جديد"
                    description="أضف عرضاً ترويجياً يظهر في قسم عروض الصفحة الرئيسية."
                />
                <form onSubmit={submit} className="w-full space-y-6">
                    <FeaturedOfferForm
                        data={data}
                        setData={setData}
                        errors={errors as Partial<Record<keyof FeaturedOfferFormData, string>>}
                        processing={processing}
                    />
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/home-featured-offers"
                        onSave={save}
                        primaryLabel="إنشاء"
                    />
                </form>
            </div>
        </>
    );
}

FeaturedOfferCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'العروض المميزة', href: '/dashboard/home-featured-offers' },
        { title: 'جديد', href: '/dashboard/home-featured-offers/create' },
    ],
};

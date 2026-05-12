import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import FeaturedOfferForm from '@/pages/dashboard/home-featured-offers/_form';
import type { FeaturedOfferFormData } from '@/pages/dashboard/home-featured-offers/_form';
import { dashboard } from '@/routes';

interface Offer {
    id: number;
    title: string;
    partner: string;
    description: string | null;
    discount: string | null;
    expires_text: string | null;
    tag: string | null;
    accent_color: string | null;
    is_published: boolean;
    position: number;
}

export default function FeaturedOfferEdit({ offer }: { offer: Offer }) {
    const { data, setData, put, processing, errors } =
        useForm<FeaturedOfferFormData>({
            title: offer.title,
            partner: offer.partner,
            description: offer.description ?? '',
            discount: offer.discount ?? '',
            expires_text: offer.expires_text ?? '',
            tag: offer.tag ?? '',
            accent_color: offer.accent_color ?? '#0b2e2c',
            is_published: offer.is_published,
            position: offer.position,
        });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/home-featured-offers/${offer.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل: ${offer.title}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading title="تعديل عرض" description={`#${offer.id}`} />
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
                    />
                </form>
            </div>
        </>
    );
}

FeaturedOfferEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'العروض المميزة', href: '/dashboard/home-featured-offers' },
        { title: 'تعديل', href: '#' },
    ],
};

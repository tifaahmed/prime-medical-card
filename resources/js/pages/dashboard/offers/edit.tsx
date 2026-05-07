import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import OfferForm from '@/pages/dashboard/offers/_form';
import type { OfferableGroup } from '@/pages/dashboard/offers/_form';
import { dashboard } from '@/routes';

interface Offer {
    id: number;
    slug: string;
    offerable_type: string;
    offerable_id: number;
    title: { en: string; ar: string };
    short_description: { en: string; ar: string };
    full_description: { en: string; ar: string };
    phone: string | null;
    price: string | number | null;
    old_price: string | number | null;
}

export default function OfferEdit({
    offer,
    offerableTypes,
}: {
    offer: Offer;
    offerableTypes: OfferableGroup[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        offerable_type: offer.offerable_type,
        offerable_id: offer.offerable_id as number | string,
        title: offer.title,
        short_description: offer.short_description,
        full_description: offer.full_description,
        phone: offer.phone ?? '',
        price: (offer.price ?? '') as string | number,
        old_price: (offer.old_price ?? '') as string | number,
    });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/offers/${offer.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`Edit ${offer.slug}`} />
            <div className="w-full space-y-6 p-6">
                <Heading
                    title="Edit Offer"
                    description={`Slug: ${offer.slug}`}
                />
                <OfferForm
                    data={data}
                    setData={setData as never}
                    submit={submit}
                    onSave={save}
                    processing={processing}
                    errors={errors as Record<string, string>}
                    offerableTypes={offerableTypes}
                    cancelHref="/dashboard/offers"
                />
            </div>
        </>
    );
}

OfferEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Offers', href: '/dashboard/offers' },
        { title: 'Edit', href: '#' },
    ],
};

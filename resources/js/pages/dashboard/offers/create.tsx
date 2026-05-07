import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import OfferForm from '@/pages/dashboard/offers/_form';
import type { OfferableGroup } from '@/pages/dashboard/offers/_form';
import { dashboard } from '@/routes';

export default function OfferCreate({
    offerableTypes,
}: {
    offerableTypes: OfferableGroup[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        offerable_type: '',
        offerable_id: '' as number | string,
        title: { en: '', ar: '' },
        short_description: { en: '', ar: '' },
        full_description: { en: '', ar: '' },
        phone: '',
        price: '' as string | number,
        old_price: '' as string | number,
    });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/offers?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="New Offer" />
            <div className="w-full space-y-6 p-6">
                <Heading
                    title="New Offer"
                    description="Bilingual offer attached to a facility or branch"
                />
                <OfferForm
                    data={data}
                    setData={setData as never}
                    submit={submit}
                    onSave={save}
                    processing={processing}
                    errors={errors as Record<string, string>}
                    offerableTypes={offerableTypes}
                    primaryLabel="Create"
                    cancelHref="/dashboard/offers"
                />
            </div>
        </>
    );
}

OfferCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Offers', href: '/dashboard/offers' },
        { title: 'New', href: '/dashboard/offers/create' },
    ],
};

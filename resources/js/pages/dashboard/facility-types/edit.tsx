import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import TranslatableInput from '@/pages/dashboard/_components/translatable-input';
import { dashboard } from '@/routes';

interface FacilityType {
    id: number;
    slug: string;
    name: { en: string; ar: string };
}

export default function FacilityTypeEdit({
    facilityType,
}: {
    facilityType: FacilityType;
}) {
    const { data, setData, put, processing, errors } = useForm({
        name: facilityType.name,
    });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/facility-types/${facilityType.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`Edit ${facilityType.slug}`} />
            <div className="w-full space-y-6 p-6">
                <Heading
                    title="Edit Facility Type"
                    description={`Slug: ${facilityType.slug}`}
                />
                <form onSubmit={submit} className="w-full space-y-6">
                    <div className="rounded-3xl border bg-card p-6 shadow-sm">
                        <TranslatableInput
                            name="name"
                            label="Name"
                            values={data.name}
                            onChange={(locale, value) =>
                                setData('name', {
                                    ...data.name,
                                    [locale]: value,
                                })
                            }
                            errors={errors as Record<string, string>}
                            required
                        />
                    </div>
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/facility-types"
                        onSave={save}
                    />
                </form>
            </div>
        </>
    );
}

FacilityTypeEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Facility Types', href: '/dashboard/facility-types' },
        { title: 'Edit', href: '#' },
    ],
};

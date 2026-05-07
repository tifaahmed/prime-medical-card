import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import BranchForm from '@/pages/dashboard/facility-branches/_form';
import type { FacilityOption } from '@/pages/dashboard/facility-branches/_form';
import { dashboard } from '@/routes';

export default function BranchCreate({
    facilities,
}: {
    facilities: FacilityOption[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        facility_id: '' as number | string,
        name: { en: '', ar: '' },
        address: { en: '', ar: '' },
        phone: [] as string[],
    });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/facility-branches?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="New Branch" />
            <div className="w-full space-y-6 p-6">
                <Heading
                    title="New Branch"
                    description="Bilingual branch with phones"
                />
                <BranchForm
                    data={data}
                    setData={setData as never}
                    submit={submit}
                    onSave={save}
                    processing={processing}
                    errors={errors as Record<string, string>}
                    facilities={facilities}
                    primaryLabel="Create"
                    cancelHref="/dashboard/facility-branches"
                />
            </div>
        </>
    );
}

BranchCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Facility Branches', href: '/dashboard/facility-branches' },
        { title: 'New', href: '/dashboard/facility-branches/create' },
    ],
};

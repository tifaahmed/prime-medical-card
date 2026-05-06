import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import BranchForm from '@/pages/dashboard/facility-branches/_form';
import type { FacilityOption } from '@/pages/dashboard/facility-branches/_form';
import { dashboard } from '@/routes';

interface Branch {
    id: number;
    slug: string;
    facility_id: number;
    name: { en: string; ar: string };
    address: { en: string; ar: string };
    phone: string[];
}

export default function BranchEdit({
    branch,
    facilities,
}: {
    branch: Branch;
    facilities: FacilityOption[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        facility_id: branch.facility_id as number | string,
        name: branch.name,
        address: branch.address,
        phone: branch.phone ?? [],
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/dashboard/facility-branches/${branch.id}`);
    };

    return (
        <>
            <Head title={`Edit ${branch.slug}`} />
            <div className="w-full space-y-6 p-6">
                <Heading
                    title="Edit Branch"
                    description={`Slug: ${branch.slug}`}
                />
                <BranchForm
                    data={data}
                    setData={setData as never}
                    submit={submit}
                    processing={processing}
                    errors={errors as Record<string, string>}
                    facilities={facilities}
                    submitLabel="Save"
                    cancelHref="/dashboard/facility-branches"
                />
            </div>
        </>
    );
}

BranchEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Facility Branches', href: '/dashboard/facility-branches' },
        { title: 'Edit', href: '#' },
    ],
};

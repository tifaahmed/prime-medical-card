import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import type { BranchItem } from '@/pages/dashboard/facilities/_branch-items';
import FacilityForm from '@/pages/dashboard/facilities/_form';
import type { RelatedOption } from '@/pages/dashboard/facilities/_form';
import { dashboard } from '@/routes';

export default function FacilityCreate({
    facilityTypes,
    governorates,
}: {
    facilityTypes: RelatedOption[];
    governorates: RelatedOption[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        name: { en: '', ar: '' },
        facility_type_id: '' as number | string,
        governorate_id: '' as number | string,
        phone: '',
        logo: null as File | null,
        logo_url: null as string | null,
        logo_remove: false,
        branches: [] as BranchItem[],
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/dashboard/facilities', { forceFormData: true });
    };

    return (
        <>
            <Head title="New Facility" />
            <div className="w-full space-y-6 p-6">
                <Heading
                    title="New Facility"
                    description="Add a facility along with its branches, logo, contact info and locations."
                />
                <FacilityForm
                    data={data}
                    setData={setData as never}
                    submit={submit}
                    processing={processing}
                    errors={errors as Record<string, string>}
                    facilityTypes={facilityTypes}
                    governorates={governorates}
                    submitLabel="Create"
                    cancelHref="/dashboard/facilities"
                />
            </div>
        </>
    );
}

FacilityCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Facilities', href: '/dashboard/facilities' },
        { title: 'New', href: '/dashboard/facilities/create' },
    ],
};

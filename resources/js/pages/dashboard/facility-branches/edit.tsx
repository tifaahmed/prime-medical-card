import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import BranchForm from '@/pages/dashboard/facility-branches/_form';
import type {
    CityOption,
    FacilityOption,
    GovernorateOption,
} from '@/pages/dashboard/facility-branches/_form';
import { dashboard } from '@/routes';

interface Branch {
    id: number;
    slug: string;
    facility_id: number;
    governorate_id: number | null;
    city_id: number | null;
    name: { en: string; ar: string };
    address: { en: string; ar: string };
    phone: string[];
    latitude: number | null;
    longitude: number | null;
}

export default function BranchEdit({
    branch,
    facilities,
    governorates,
    cities,
}: {
    branch: Branch;
    facilities: FacilityOption[];
    governorates: GovernorateOption[];
    cities: CityOption[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        facility_id: branch.facility_id as number | string,
        governorate_id: (branch.governorate_id ?? '') as number | string,
        city_id: (branch.city_id ?? '') as number | string,
        name: branch.name,
        address: branch.address,
        phone: branch.phone ?? [],
        latitude: (branch.latitude ?? '') as string | number | null,
        longitude: (branch.longitude ?? '') as string | number | null,
    });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/facility-branches/${branch.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل ${branch.name.ar || branch.slug}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="تعديل فرع"
                    description={`المعرّف: ${branch.slug}`}
                />
                <BranchForm
                    data={data}
                    setData={setData as never}
                    submit={submit}
                    onSave={save}
                    processing={processing}
                    errors={errors as Record<string, string>}
                    facilities={facilities}
                    governorates={governorates}
                    cities={cities}
                    cancelHref="/dashboard/facility-branches"
                />
            </div>
        </>
    );
}

BranchEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'فروع المنشآت', href: '/dashboard/facility-branches' },
        { title: 'تعديل', href: '#' },
    ],
};

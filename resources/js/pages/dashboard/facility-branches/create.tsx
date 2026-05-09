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

export default function BranchCreate({
    facilities,
    governorates,
    cities,
}: {
    facilities: FacilityOption[];
    governorates: GovernorateOption[];
    cities: CityOption[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        facility_id: '' as number | string,
        governorate_id: '' as number | string,
        city_id: '' as number | string,
        name: { en: '', ar: '' },
        address: { en: '', ar: '' },
        phone: [] as string[],
        latitude: '' as string | number | null,
        longitude: '' as string | number | null,
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
            <Head title="فرع جديد" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="فرع جديد"
                    description="إضافة فرع لمنشأة مع أرقام الهواتف."
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
                    primaryLabel="إنشاء"
                    cancelHref="/dashboard/facility-branches"
                />
            </div>
        </>
    );
}

BranchCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'فروع المنشآت', href: '/dashboard/facility-branches' },
        { title: 'جديد', href: '/dashboard/facility-branches/create' },
    ],
};

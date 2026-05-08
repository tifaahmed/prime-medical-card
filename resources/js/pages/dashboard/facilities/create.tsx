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

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/facilities?redirect=${intent}`, {
            forceFormData: true,
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="منشأة جديدة" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="منشأة جديدة"
                    description="أضف منشأة مع فروعها وشعارها وبيانات التواصل والموقع."
                />
                <FacilityForm
                    data={data}
                    setData={setData as never}
                    submit={submit}
                    onSave={save}
                    processing={processing}
                    errors={errors as Record<string, string>}
                    facilityTypes={facilityTypes}
                    governorates={governorates}
                    primaryLabel="إنشاء"
                    cancelHref="/dashboard/facilities"
                />
            </div>
        </>
    );
}

FacilityCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'المنشآت', href: '/dashboard/facilities' },
        { title: 'جديدة', href: '/dashboard/facilities/create' },
    ],
};

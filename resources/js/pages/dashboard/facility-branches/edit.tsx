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

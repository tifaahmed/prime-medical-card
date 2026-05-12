import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import StatForm from '@/pages/dashboard/about-stats/_form';
import type { StatFormData } from '@/pages/dashboard/about-stats/_form';
import { dashboard } from '@/routes';

interface Stat {
    id: number;
    value: string;
    label: string;
    is_published: boolean;
    position: number;
}

export default function AboutStatEdit({ stat }: { stat: Stat }) {
    const { data, setData, put, processing, errors } = useForm<StatFormData>({
        value: stat.value,
        label: stat.label,
        is_published: stat.is_published,
        position: stat.position,
    });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/about-stats/${stat.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل: ${stat.value}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading title="تعديل إحصائية" description={`#${stat.id}`} />
                <form onSubmit={submit} className="w-full space-y-6">
                    <StatForm
                        data={data}
                        setData={setData}
                        errors={errors as Partial<Record<keyof StatFormData, string>>}
                        processing={processing}
                    />
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/about-stats"
                        onSave={save}
                    />
                </form>
            </div>
        </>
    );
}

AboutStatEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'إحصائيات الشركة', href: '/dashboard/about-stats' },
        { title: 'تعديل', href: '#' },
    ],
};

import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import StatForm from '@/pages/dashboard/about-stats/_form';
import type { StatFormData } from '@/pages/dashboard/about-stats/_form';
import { dashboard } from '@/routes';

export default function AboutStatCreate() {
    const { data, setData, post, processing, errors } = useForm<StatFormData>({
        value: '',
        label: '',
        is_published: true,
        position: 0,
    });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/about-stats?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="إحصائية جديدة" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading title="إحصائية جديدة" />
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
                        primaryLabel="إنشاء"
                    />
                </form>
            </div>
        </>
    );
}

AboutStatCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'إحصائيات الشركة', href: '/dashboard/about-stats' },
        { title: 'جديدة', href: '/dashboard/about-stats/create' },
    ],
};

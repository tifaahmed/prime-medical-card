import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import TestimonialForm from '@/pages/dashboard/testimonials/_form';
import type { TestimonialFormData } from '@/pages/dashboard/testimonials/_form';
import { dashboard } from '@/routes';

export default function TestimonialCreate() {
    const { data, setData, post, processing, errors } =
        useForm<TestimonialFormData>({
            name: '',
            role: '',
            quote: '',
            avatar: '',
            is_featured: false,
            is_published: true,
            position: 0,
        });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/testimonials?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="رأي جديد" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="رأي جديد"
                    description="أضف رأي عضو ليظهر في قسم آراء الأعضاء."
                />
                <form onSubmit={submit} className="w-full space-y-6">
                    <TestimonialForm
                        data={data}
                        setData={setData}
                        errors={
                            errors as Partial<
                                Record<keyof TestimonialFormData, string>
                            >
                        }
                        processing={processing}
                    />
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/testimonials"
                        onSave={save}
                        primaryLabel="إنشاء"
                    />
                </form>
            </div>
        </>
    );
}

TestimonialCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'آراء الأعضاء', href: '/dashboard/testimonials' },
        { title: 'جديد', href: '/dashboard/testimonials/create' },
    ],
};

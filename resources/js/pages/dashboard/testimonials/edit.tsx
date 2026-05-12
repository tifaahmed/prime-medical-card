import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import TestimonialForm from '@/pages/dashboard/testimonials/_form';
import type { TestimonialFormData } from '@/pages/dashboard/testimonials/_form';
import { dashboard } from '@/routes';

interface Testimonial {
    id: number;
    name: string;
    role: string | null;
    quote: string;
    avatar: string | null;
    is_featured: boolean;
    is_published: boolean;
    position: number;
}

export default function TestimonialEdit({
    testimonial,
}: {
    testimonial: Testimonial;
}) {
    const { data, setData, put, processing, errors } =
        useForm<TestimonialFormData>({
            name: testimonial.name,
            role: testimonial.role ?? '',
            quote: testimonial.quote,
            avatar: testimonial.avatar ?? '',
            is_featured: testimonial.is_featured,
            is_published: testimonial.is_published,
            position: testimonial.position,
        });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/testimonials/${testimonial.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل: ${testimonial.name}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="تعديل رأي"
                    description={`#${testimonial.id}`}
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
                    />
                </form>
            </div>
        </>
    );
}

TestimonialEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'آراء الأعضاء', href: '/dashboard/testimonials' },
        { title: 'تعديل', href: '#' },
    ],
};

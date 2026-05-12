import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import FaqForm from '@/pages/dashboard/faqs/_form';
import type { FaqFormData } from '@/pages/dashboard/faqs/_form';
import { dashboard } from '@/routes';

interface Faq {
    id: number;
    question: string;
    answer: string;
    position: number;
    is_published: boolean;
}

export default function FaqEdit({ faq }: { faq: Faq }) {
    const { data, setData, put, processing, errors } = useForm<FaqFormData>({
        question: faq.question,
        answer: faq.answer,
        position: faq.position,
        is_published: faq.is_published,
    });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/faqs/${faq.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل: ${faq.question}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="تعديل سؤال"
                    description={`#${faq.id}`}
                />
                <form onSubmit={submit} className="w-full space-y-6">
                    <FaqForm
                        data={data}
                        setData={setData}
                        errors={errors as Partial<Record<keyof FaqFormData, string>>}
                        processing={processing}
                    />
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/faqs"
                        onSave={save}
                    />
                </form>
            </div>
        </>
    );
}

FaqEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'الأسئلة الشائعة', href: '/dashboard/faqs' },
        { title: 'تعديل', href: '#' },
    ],
};

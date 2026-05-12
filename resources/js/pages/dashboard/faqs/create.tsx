import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import FaqForm from '@/pages/dashboard/faqs/_form';
import type { FaqFormData } from '@/pages/dashboard/faqs/_form';
import { dashboard } from '@/routes';

export default function FaqCreate() {
    const { data, setData, post, processing, errors } = useForm<FaqFormData>({
        question: '',
        answer: '',
        position: 0,
        is_published: true,
    });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/faqs?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="سؤال جديد" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="سؤال جديد"
                    description="أضف سؤالاً وإجابة لقسم الأسئلة الشائعة في الصفحة الرئيسية."
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
                        primaryLabel="إنشاء"
                    />
                </form>
            </div>
        </>
    );
}

FaqCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'الأسئلة الشائعة', href: '/dashboard/faqs' },
        { title: 'جديد', href: '/dashboard/faqs/create' },
    ],
};

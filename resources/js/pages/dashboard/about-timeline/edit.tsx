import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import EntryForm from '@/pages/dashboard/about-timeline/_form';
import type { EntryFormData } from '@/pages/dashboard/about-timeline/_form';
import { dashboard } from '@/routes';

interface Entry {
    id: number;
    year: string;
    title: string;
    description: string | null;
    is_published: boolean;
    position: number;
}

export default function AboutTimelineEdit({ entry }: { entry: Entry }) {
    const { data, setData, put, processing, errors } = useForm<EntryFormData>({
        year: entry.year,
        title: entry.title,
        description: entry.description ?? '',
        is_published: entry.is_published,
        position: entry.position,
    });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/about-timeline/${entry.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل: ${entry.year} - ${entry.title}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading title="تعديل محطة" description={`#${entry.id}`} />
                <form onSubmit={submit} className="w-full space-y-6">
                    <EntryForm
                        data={data}
                        setData={setData}
                        errors={errors as Partial<Record<keyof EntryFormData, string>>}
                        processing={processing}
                    />
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/about-timeline"
                        onSave={save}
                    />
                </form>
            </div>
        </>
    );
}

AboutTimelineEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'الخط الزمني', href: '/dashboard/about-timeline' },
        { title: 'تعديل', href: '#' },
    ],
};

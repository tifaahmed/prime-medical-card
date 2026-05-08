import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import FormActions from '@/pages/dashboard/_components/form-actions';
import TranslatableInput from '@/pages/dashboard/_components/translatable-input';
import { dashboard } from '@/routes';

interface Governorate {
    id: number;
    slug: string;
    name: { en: string; ar: string };
}

export default function GovernorateEdit({
    governorate,
}: {
    governorate: Governorate;
}) {
    const { data, setData, put, processing, errors } = useForm({
        name: governorate.name,
    });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/governorates/${governorate.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل ${governorate.name.ar || governorate.slug}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="تعديل محافظة"
                    description={`المعرّف: ${governorate.slug}`}
                />
                <form onSubmit={submit} className="w-full space-y-6">
                    <div className="rounded-3xl border bg-card p-6 shadow-sm">
                        <TranslatableInput
                            name="name"
                            label="الاسم"
                            values={data.name}
                            onChange={(locale, value) =>
                                setData('name', {
                                    ...data.name,
                                    [locale]: value,
                                })
                            }
                            errors={errors as Record<string, string>}
                            required
                        />
                    </div>
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/governorates"
                        onSave={save}
                    />
                </form>
            </div>
        </>
    );
}

GovernorateEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'المحافظات', href: '/dashboard/governorates' },
        { title: 'تعديل', href: '#' },
    ],
};

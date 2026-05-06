import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
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

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/dashboard/governorates/${governorate.id}`);
    };

    return (
        <>
            <Head title={`Edit ${governorate.slug}`} />
            <div className="w-full space-y-6 p-6">
                <Heading
                    title="Edit Governorate"
                    description={`Slug: ${governorate.slug}`}
                />
                <form
                    onSubmit={submit}
                    className="w-full space-y-6 rounded-3xl border bg-card p-6 shadow-sm"
                >
                    <TranslatableInput
                        name="name"
                        label="Name"
                        values={data.name}
                        onChange={(locale, value) =>
                            setData('name', { ...data.name, [locale]: value })
                        }
                        errors={errors as Record<string, string>}
                        required
                    />
                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                        <Button asChild variant="outline" type="button">
                            <a href="/dashboard/governorates">Cancel</a>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

GovernorateEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Governorates', href: '/dashboard/governorates' },
        { title: 'Edit', href: '#' },
    ],
};

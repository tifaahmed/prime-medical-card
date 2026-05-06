import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import TranslatableInput from '@/pages/dashboard/_components/translatable-input';
import { dashboard } from '@/routes';

export default function GovernorateCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: { en: '', ar: '' },
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/dashboard/governorates');
    };

    return (
        <>
            <Head title="New Governorate" />
            <div className="w-full space-y-6 p-6">
                <Heading
                    title="New Governorate"
                    description="Provide the name in both English and Arabic."
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
                            Create
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

GovernorateCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Governorates', href: '/dashboard/governorates' },
        { title: 'New', href: '/dashboard/governorates/create' },
    ],
};

import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import FormActions from '@/pages/dashboard/_components/form-actions';
import TranslatableInput from '@/pages/dashboard/_components/translatable-input';
import { dashboard } from '@/routes';

interface City {
    id: number;
    slug: string;
    governorate_id: number;
    name: { en: string; ar: string };
}

interface GovernorateOption {
    id: number;
    name: { en: string; ar: string };
}

export default function CityEdit({
    city,
    governorates,
}: {
    city: City;
    governorates: GovernorateOption[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        name: city.name,
        governorate_id: city.governorate_id as number | string,
    });

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/cities/${city.id}?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`تعديل ${city.name.ar || city.slug}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="تعديل مدينة"
                    description={`المعرّف: ${city.slug}`}
                />
                <form onSubmit={submit} className="w-full space-y-6">
                    <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
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

                        <div className="grid gap-2">
                            <Label>
                                المحافظة{' '}
                                <span className="text-red-600">*</span>
                            </Label>
                            <Select
                                value={String(data.governorate_id || '')}
                                onValueChange={(v) =>
                                    setData('governorate_id', Number(v))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="اختر المحافظة…" />
                                </SelectTrigger>
                                <SelectContent>
                                    {governorates.map((g) => (
                                        <SelectItem
                                            key={g.id}
                                            value={String(g.id)}
                                        >
                                            <span dir="rtl">
                                                {g.name.ar || g.name.en}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.governorate_id} />
                        </div>
                    </div>
                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard/cities"
                        onSave={save}
                    />
                </form>
            </div>
        </>
    );
}

CityEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'المدن', href: '/dashboard/cities' },
        { title: 'تعديل', href: '#' },
    ],
};

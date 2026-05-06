import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import TranslatableInput from '@/pages/dashboard/_components/translatable-input';

export interface FacilityOption {
    id: number;
    name: { en: string; ar: string };
}

export interface BranchFormData {
    facility_id: number | string;
    name: { en: string; ar: string };
    address: { en: string; ar: string };
    phone: string[];
}

interface Props {
    data: BranchFormData;
    setData: <K extends keyof BranchFormData>(
        key: K,
        value: BranchFormData[K],
    ) => void;
    submit: (e: FormEvent) => void;
    processing: boolean;
    errors: Record<string, string>;
    facilities: FacilityOption[];
    submitLabel: string;
    cancelHref: string;
}

export default function BranchForm({
    data,
    setData,
    submit,
    processing,
    errors,
    facilities,
    submitLabel,
    cancelHref,
}: Props) {
    const phones = data.phone ?? [];

    const updatePhone = (i: number, value: string) => {
        const next = [...phones];
        next[i] = value;
        setData('phone', next);
    };

    const addPhone = () => setData('phone', [...phones, '']);
    const removePhone = (i: number) =>
        setData(
            'phone',
            phones.filter((_, idx) => idx !== i),
        );

    return (
        <form
            onSubmit={submit}
            className="w-full space-y-6 rounded-3xl border bg-card p-6 shadow-sm"
        >
            <div className="grid gap-2">
                <Label>
                    Facility <span className="text-red-600">*</span>
                </Label>
                <Select
                    value={String(data.facility_id || '')}
                    onValueChange={(v) => setData('facility_id', Number(v))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a facility…" />
                    </SelectTrigger>
                    <SelectContent>
                        {facilities.map((f) => (
                            <SelectItem key={f.id} value={String(f.id)}>
                                {f.name.en} — <span dir="rtl">{f.name.ar}</span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.facility_id} />
            </div>

            <TranslatableInput
                name="name"
                label="Branch Name"
                values={data.name}
                onChange={(locale, value) =>
                    setData('name', { ...data.name, [locale]: value })
                }
                errors={errors}
            />

            <TranslatableInput
                name="address"
                label="Address"
                values={data.address}
                onChange={(locale, value) =>
                    setData('address', { ...data.address, [locale]: value })
                }
                errors={errors}
                multiline
            />

            <div className="grid gap-2">
                <Label>Phone numbers</Label>
                <div className="space-y-2">
                    {phones.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            No phone numbers yet.
                        </p>
                    )}
                    {phones.map((p, i) => (
                        <div key={i} className="flex gap-2">
                            <Input
                                value={p ?? ''}
                                onChange={(e) => updatePhone(i, e.target.value)}
                                placeholder="+20 1xx xxx xxxx"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => removePhone(i)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
                <Button
                    type="button"
                    variant="secondary"
                    className="w-fit"
                    onClick={addPhone}
                >
                    + Add phone
                </Button>
                <InputError message={errors.phone} />
            </div>

            <div className="flex gap-2">
                <Button type="submit" disabled={processing}>
                    {submitLabel}
                </Button>
                <Button asChild variant="outline" type="button">
                    <a href={cancelHref}>Cancel</a>
                </Button>
            </div>
        </form>
    );
}

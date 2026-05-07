import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
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

export interface OfferableOption {
    id: number;
    name: { en: string; ar: string };
}

export interface OfferableGroup {
    type: string;
    label: string;
    options: OfferableOption[];
}

export interface OfferFormData {
    offerable_type: string;
    offerable_id: number | string;
    title: { en: string; ar: string };
    short_description: { en: string; ar: string };
    full_description: { en: string; ar: string };
    phone: string;
    price: string | number;
    old_price: string | number;
}

interface Props {
    data: OfferFormData;
    setData: <K extends keyof OfferFormData>(
        key: K,
        value: OfferFormData[K],
    ) => void;
    submit: (e: FormEvent) => void;
    onSave: (intent: 'stay' | 'return') => void;
    processing: boolean;
    errors: Record<string, string>;
    offerableTypes: OfferableGroup[];
    primaryLabel?: string;
    cancelHref: string;
}

export default function OfferForm({
    data,
    setData,
    submit,
    onSave,
    processing,
    errors,
    offerableTypes,
    primaryLabel = 'Save',
    cancelHref,
}: Props) {
    const currentGroup = offerableTypes.find(
        (g) => g.type === data.offerable_type,
    );

    return (
        <form onSubmit={submit} className="w-full space-y-6">
            <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>
                            Belongs to <span className="text-red-600">*</span>
                        </Label>
                        <Select
                            value={data.offerable_type || ''}
                            onValueChange={(v) => {
                                setData('offerable_type', v);
                                setData('offerable_id', '');
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a parent type…" />
                            </SelectTrigger>
                            <SelectContent>
                                {offerableTypes.map((g) => (
                                    <SelectItem key={g.type} value={g.type}>
                                        {g.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.offerable_type} />
                    </div>
                    <div className="grid gap-2">
                        <Label>
                            Parent record{' '}
                            <span className="text-red-600">*</span>
                        </Label>
                        <Select
                            value={String(data.offerable_id || '')}
                            onValueChange={(v) =>
                                setData('offerable_id', Number(v))
                            }
                            disabled={!currentGroup}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select…" />
                            </SelectTrigger>
                            <SelectContent>
                                {(currentGroup?.options ?? []).map((o) => (
                                    <SelectItem key={o.id} value={String(o.id)}>
                                        {o.name.en} —{' '}
                                        <span dir="rtl">{o.name.ar}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.offerable_id} />
                    </div>
                </div>

                <TranslatableInput
                    name="title"
                    label="Title"
                    values={data.title}
                    onChange={(locale, value) =>
                        setData('title', { ...data.title, [locale]: value })
                    }
                    errors={errors}
                    required
                />

                <TranslatableInput
                    name="short_description"
                    label="Short description"
                    values={data.short_description}
                    onChange={(locale, value) =>
                        setData('short_description', {
                            ...data.short_description,
                            [locale]: value,
                        })
                    }
                    errors={errors}
                    multiline
                />

                <TranslatableInput
                    name="full_description"
                    label="Full description"
                    values={data.full_description}
                    onChange={(locale, value) =>
                        setData('full_description', {
                            ...data.full_description,
                            [locale]: value,
                        })
                    }
                    errors={errors}
                    multiline
                />

                <div className="grid gap-3 md:grid-cols-3">
                    <div className="grid gap-2">
                        <Label>Phone</Label>
                        <Input
                            value={data.phone ?? ''}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        <InputError message={errors.phone} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Price</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={data.price ?? ''}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        <InputError message={errors.price} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Old price</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={data.old_price ?? ''}
                            onChange={(e) =>
                                setData('old_price', e.target.value)
                            }
                        />
                        <InputError message={errors.old_price} />
                    </div>
                </div>
            </div>

            <FormActions
                processing={processing}
                cancelHref={cancelHref}
                onSave={onSave}
                primaryLabel={primaryLabel}
            />
        </form>
    );
}

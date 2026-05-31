import { useMemo, useState } from 'react';
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
    facility_id?: number;
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

const TYPE_LABELS_AR: Record<string, string> = {
    Facility: 'منشأة',
    FacilityBranch: 'فرع',
};

function arTypeLabel(group: OfferableGroup): string {
    const klass = group.type.split('\\').pop() ?? group.type;
    return TYPE_LABELS_AR[klass] ?? group.label;
}

export default function OfferForm({
    data,
    setData,
    submit,
    onSave,
    processing,
    errors,
    offerableTypes,
    primaryLabel = 'حفظ',
    cancelHref,
}: Props) {
    const currentGroup = offerableTypes.find(
        (g) => g.type === data.offerable_type,
    );

    const facilities = offerableTypes.find(
        (g) => g.type.endsWith('\\Facility'),
    )?.options ?? [];

    const [facilityFilter, setFacilityFilter] = useState('');

    const filteredBranches = useMemo(() => {
        if (!facilityFilter) return currentGroup?.options ?? [];
        return (currentGroup?.options ?? []).filter(
            (o) => o.facility_id === Number(facilityFilter),
        );
    }, [currentGroup?.options, facilityFilter]);

    const isBranchType = data.offerable_type.endsWith('\\FacilityBranch');

    return (
        <form onSubmit={submit} className="w-full space-y-6" dir="rtl">
            <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
                    <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>
                            تابع لـ <span className="text-red-600">*</span>
                        </Label>
                        <Select
                            value={data.offerable_type || ''}
                            onValueChange={(v) => {
                                setData('offerable_type', v);
                                setData('offerable_id', '');
                                setFacilityFilter('');
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="اختر النوع…" />
                            </SelectTrigger>
                            <SelectContent>
                                {offerableTypes.map((g) => (
                                    <SelectItem key={g.type} value={g.type}>
                                        {arTypeLabel(g)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.offerable_type} />
                    </div>
                    <div className="grid gap-2">
                        {isBranchType && (
                            <div className="mb-2">
                                <Label>تصفية حسب المنشأة</Label>
                                <Select
                                    value={facilityFilter}
                                    onValueChange={(v) => {
                                        setFacilityFilter(v);
                                        setData('offerable_id', '');
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="اختر المنشأة…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {facilities.map((f) => (
                                            <SelectItem
                                                key={f.id}
                                                value={String(f.id)}
                                            >
                                                {f.name.ar || f.name.en}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <Label>
                            السجل المرتبط{' '}
                            <span className="text-red-600">*</span>
                        </Label>
                        <Select
                            value={String(data.offerable_id || '')}
                            onValueChange={(v) =>
                                setData('offerable_id', Number(v))
                            }
                            disabled={!currentGroup || (isBranchType && !facilityFilter)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder={
                                        isBranchType && !facilityFilter
                                            ? 'اختر المنشأة أولاً…'
                                            : 'اختر…'
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {(isBranchType
                                    ? filteredBranches
                                    : currentGroup?.options ?? []
                                ).map((o) => (
                                    <SelectItem key={o.id} value={String(o.id)}>
                                        <span dir="rtl">
                                            {o.name.ar || o.name.en}
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.offerable_id} />
                    </div>
                </div>

                <TranslatableInput
                    name="title"
                    label="العنوان"
                    values={data.title}
                    onChange={(locale, value) =>
                        setData('title', { ...data.title, [locale]: value })
                    }
                    errors={errors}
                    required
                />

                <TranslatableInput
                    name="short_description"
                    label="الوصف المختصر"
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
                    label="الوصف الكامل"
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
                        <Label>رقم الهاتف</Label>
                        <Input
                            value={data.phone ?? ''}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        <InputError message={errors.phone} />
                    </div>
                    <div className="grid gap-2">
                        <Label>السعر</Label>
                        <Input
                            dir="ltr"
                            type="number"
                            step="0.01"
                            value={data.price ?? ''}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        <InputError message={errors.price} />
                    </div>
                    <div className="grid gap-2">
                        <Label>السعر القديم</Label>
                        <Input
                            dir="ltr"
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

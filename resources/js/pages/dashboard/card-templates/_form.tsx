import { useCallback, useState } from 'react';
import { RotateCcwIcon } from 'lucide-react';
import InputError from '@/components/input-error';
import {
    CardFrontPreview,
    IMAGE_KEYS,
    LABELS,
    TEXT_KEYS,
    type CardLayout,
    type ImageLayout,
    type LayoutKey,
    type TextLayout,
} from '@/components/card-preview';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImagePicker from '@/pages/dashboard/_components/image-picker';
import { cn } from '@/lib/utils';

export interface CardTemplateFormData {
    name: string;
    is_default: boolean;
    front_empty: File | null;
    front_example: File | null;
    back: File | null;
    front_empty_remove: boolean;
    front_example_remove: boolean;
    back_remove: boolean;
    layout: CardLayout;
}

interface Props {
    data: CardTemplateFormData;
    setData: <K extends keyof CardTemplateFormData>(
        key: K,
        value: CardTemplateFormData[K],
    ) => void;
    errors: Record<string, string>;
    processing: boolean;
    existingUrls?: {
        front_empty_url?: string | null;
        front_example_url?: string | null;
        back_url?: string | null;
    };
    defaultLayout?: CardLayout;
}

export default function CardTemplateForm({
    data,
    setData,
    errors,
    processing,
    existingUrls,
    defaultLayout,
}: Props) {
    const [selected, setSelected] = useState<LayoutKey | null>(null);

    const setLayoutField = useCallback(
        <S extends keyof CardLayout>(
            section: S,
            field: keyof CardLayout[S],
            value: number | boolean,
        ) => {
            setData('layout', {
                ...data.layout,
                [section]: { ...data.layout[section], [field]: value },
            });
        },
        [data.layout, setData],
    );

    const onLayoutChange = useCallback(
        <K extends LayoutKey>(key: K, patch: Partial<CardLayout[K]>) => {
            setData('layout', {
                ...data.layout,
                [key]: { ...data.layout[key], ...patch },
            });
        },
        [data.layout, setData],
    );

    return (
        <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
            <div className="grid gap-2">
                <Label htmlFor="name">
                    اسم القالب <span className="text-red-600">*</span>
                </Label>
                <Input
                    id="name"
                    name="name"
                    dir="rtl"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                    required
                />
                <InputError message={errors.name} />
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="is_default"
                    checked={data.is_default}
                    onCheckedChange={(v) =>
                        setData('is_default', v === true)
                    }
                    disabled={processing}
                />
                <Label htmlFor="is_default" className="cursor-pointer">
                    القالب الافتراضي
                </Label>
                <p className="text-xs text-muted-foreground">
                    يتم استخدامه تلقائياً عند إنشاء عضوية جديدة.
                </p>
                <InputError message={errors.is_default} />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <ImagePicker
                    label="الوجه الأمامي (فارغ)"
                    file={data.front_empty}
                    existingUrl={existingUrls?.front_empty_url ?? null}
                    isRemoved={data.front_empty_remove}
                    onFileChange={(f) => setData('front_empty', f)}
                    onRemoveExistingChange={(r) =>
                        setData('front_empty_remove', r)
                    }
                    error={errors.front_empty}
                    size="sm"
                />
                <ImagePicker
                    label="الوجه الأمامي (نموذج)"
                    file={data.front_example}
                    existingUrl={existingUrls?.front_example_url ?? null}
                    isRemoved={data.front_example_remove}
                    onFileChange={(f) => setData('front_example', f)}
                    onRemoveExistingChange={(r) =>
                        setData('front_example_remove', r)
                    }
                    error={errors.front_example}
                    size="sm"
                />
                <ImagePicker
                    label="الوجه الخلفي"
                    file={data.back}
                    existingUrl={existingUrls?.back_url ?? null}
                    isRemoved={data.back_remove}
                    onFileChange={(f) => setData('back', f)}
                    onRemoveExistingChange={(r) => setData('back_remove', r)}
                    error={errors.back}
                    size="sm"
                />
            </div>

            {/* ── Layout + preview ── */}
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                {/* Full-width interactive preview */}
                <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                        معاينة حية — اسحب العناصر لتغيير موقعها، استخدم العجلة أو الضغط بالإصبعين لتغيير الحجم
                    </p>
                    <CardFrontPreview
                        backgroundSrc={
                            existingUrls?.front_example_url ??
                            existingUrls?.front_empty_url ??
                            ''
                        }
                        firstName="MOHAMMED"
                        fullName="AHMED MOHAMMED ALI"
                        workPlace="Medical Center"
                        companyName="Prime Medical"
                        expirationDate="2026-01-01"
                        membershipNumber="PMC-123456"
                        photoUrl={null}
                        qrValue="https://example.com/card/123"
                        layout={data.layout}
                        onLayoutChange={onLayoutChange}
                        selected={selected}
                        onSelect={setSelected}
                    />
                </div>

                {/* Layout inputs sidebar */}
                <div className="space-y-4 rounded-2xl border bg-muted/30 p-4 overflow-y-auto max-h-[700px]">
                    <div className="flex items-center justify-between">
                        <h4 className="font-heading text-sm font-semibold">
                            التخطيط (الموقع والحجم)
                        </h4>
                        {defaultLayout && (
                            <button
                                type="button"
                                className="flex items-center gap-1 text-xs text-muted-foreground underline"
                                onClick={() => setData('layout', structuredClone(defaultLayout))}
                            >
                                <RotateCcwIcon className="size-3" />
                                إعادة تعيين
                            </button>
                        )}
                    </div>

                    {/* Text items */}
                    {TEXT_KEYS.map((key) => {
                        const item = data.layout[key] as TextLayout;
                        return (
                            <div
                                key={key}
                                onClick={() => setSelected(key)}
                                className={cn(
                                    'rounded-xl border bg-background p-3 cursor-pointer transition-shadow',
                                    selected === key && 'ring-2 ring-blue-500 shadow-sm',
                                )}
                            >
                                <p className="mb-2 text-xs font-semibold text-foreground">
                                    {LABELS[key]}
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    <LabelField
                                        label="أعلى"
                                        value={item.top}
                                        onChange={(v) =>
                                            setLayoutField(key, 'top', v)
                                        }
                                        disabled={processing}
                                        error={errors[`layout.${key}.top`]}
                                    />
                                    <LabelField
                                        label="يسار"
                                        value={item.left}
                                        onChange={(v) =>
                                            setLayoutField(key, 'left', v)
                                        }
                                        disabled={processing}
                                        error={errors[`layout.${key}.left`]}
                                    />
                                    <LabelField
                                        label="الحجم"
                                        value={item.fontSize}
                                        step={0.1}
                                        onChange={(v) =>
                                            setLayoutField(key, 'fontSize', v)
                                        }
                                        disabled={processing}
                                        error={
                                            errors[`layout.${key}.fontSize`]
                                        }
                                    />
                            </div>
                            <label className="mt-2 flex items-center gap-1.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={item.hidden ?? false}
                                    onChange={(e) =>
                                        setLayoutField(key, 'hidden', e.target.checked)
                                    }
                                    className="size-3.5"
                                />
                                <span className="text-[10px] text-muted-foreground">
                                    مخفي
                                </span>
                            </label>
                        </div>
                    );
                })}

                {/* Image items */}
                {IMAGE_KEYS.map((key) => {
                        const item = data.layout[key] as ImageLayout;
                        return (
                            <div
                                key={key}
                                onClick={() => setSelected(key)}
                                className={cn(
                                    'rounded-xl border bg-background p-3 cursor-pointer transition-shadow',
                                    selected === key && 'ring-2 ring-blue-500 shadow-sm',
                                )}
                            >
                                <p className="mb-2 text-xs font-semibold text-foreground">
                                    {LABELS[key]}
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    <LabelField
                                        label="أعلى"
                                        value={item.top}
                                        onChange={(v) =>
                                            setLayoutField(key, 'top', v)
                                        }
                                        disabled={processing}
                                        error={errors[`layout.${key}.top`]}
                                    />
                                    <LabelField
                                        label="يسار"
                                        value={item.left}
                                        onChange={(v) =>
                                            setLayoutField(key, 'left', v)
                                        }
                                        disabled={processing}
                                        error={errors[`layout.${key}.left`]}
                                    />
                                    <LabelField
                                        label="العرض"
                                        value={item.width}
                                        onChange={(v) =>
                                            setLayoutField(key, 'width', v)
                                        }
                                        disabled={processing}
                                        error={errors[`layout.${key}.width`]}
                                    />
                                    <LabelField
                                        label="الارتفاع"
                                        value={item.height}
                                        onChange={(v) =>
                                            setLayoutField(key, 'height', v)
                                        }
                                        disabled={processing}
                                        error={
                                            errors[`layout.${key}.height`]
                                        }
                                    />
                                </div>
                                {key === 'photo' && (
                                    <label className="mt-2 flex items-center gap-2">
                                        <Checkbox
                                            checked={item.rounded ?? false}
                                            onCheckedChange={(v) =>
                                                setLayoutField(
                                                    'photo',
                                                    'rounded',
                                                    v === true,
                                                )
                                            }
                                            disabled={processing}
                                        />
                                        <span className="text-xs text-muted-foreground">
                                            دائري (بيضاوي)
                                        </span>
                                    </label>
                                )}
                                <label className="mt-2 flex items-center gap-1.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={item.hidden ?? false}
                                        onChange={(e) =>
                                            setLayoutField(key, 'hidden', e.target.checked)
                                        }
                                        className="size-3.5"
                                    />
                                    <span className="text-[10px] text-muted-foreground">
                                        مخفي
                                    </span>
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

/* ── Small inline label + number input ── */
function LabelField({
    label,
    value,
    step,
    onChange,
    disabled,
    error,
}: {
    label: string;
    value: number;
    step?: number;
    onChange: (v: number) => void;
    disabled: boolean;
    error?: string;
}) {
    return (
        <div className="grid gap-1">
            <label className="text-[10px] font-medium text-muted-foreground">
                {label}
            </label>
            <Input
                type="number"
                dir="ltr"
                step={step ?? 0.01}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                disabled={disabled}
            />
            {error && (
                <p className="text-[10px] text-red-600">{error}</p>
            )}
        </div>
    );
}

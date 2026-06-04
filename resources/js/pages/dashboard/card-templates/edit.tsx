import { Head, useForm } from '@inertiajs/react';
import { MoveIcon, RotateCcwIcon } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import FormActions from '@/pages/dashboard/_components/form-actions';
import ImagePicker from '@/pages/dashboard/_components/image-picker';
import { dashboard } from '@/routes';
import { cn } from '@/lib/utils';

interface CardTemplate {
    id: number;
    name: string;
    slug: string;
    layout: CardLayout;
    is_default: boolean;
    front_empty_url: string | null;
    front_example_url: string | null;
    back_url: string | null;
}

interface FormData {
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

export default function CardTemplateEdit({
    template,
    defaultLayout,
}: {
    template: CardTemplate;
    defaultLayout: CardLayout;
}) {
    const { data, setData, submit: formSubmit, transform, processing, errors } =
        useForm<FormData>({
            name: template.name,
            is_default: template.is_default,
            front_empty: null,
            front_example: null,
            back: null,
            front_empty_remove: false,
            front_example_remove: false,
            back_remove: false,
            layout: template.layout,
        });

    const [selected, setSelected] = useState<LayoutKey | null>(null);

    const setLayoutField = <S extends keyof CardLayout>(
        section: S,
        field: keyof CardLayout[S],
        value: number | boolean,
    ) => {
        setData('layout', {
            ...data.layout,
            [section]: { ...data.layout[section], [field]: value },
        });
    };

    const onLayoutChange = <K extends LayoutKey>(
        key: K,
        patch: Partial<CardLayout[K]>,
    ) => {
        setData('layout', {
            ...data.layout,
            [key]: { ...data.layout[key], ...patch },
        });
    };

    const save = (intent: 'stay' | 'return') => {
        transform((formData) => ({ ...formData, _method: 'put' }));
        formSubmit('post', `/dashboard/card-templates/${template.id}?redirect=${intent}`, {
            forceFormData: true,
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    const frontExampleSrc =
        template.front_example_url ?? template.front_empty_url ?? '';

    return (
        <>
            <Head title={`تعديل: ${template.name}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="تعديل قالب البطاقة"
                    description={`#${template.id} — ${template.name}`}
                />
                <form onSubmit={submit} className="w-full">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
                        {/* ── Sidebar: form fields + layout controls ── */}
                        <div className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
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

                            <div className="grid gap-4">
                                <ImagePicker
                                    label="الوجه الأمامي (فارغ)"
                                    file={data.front_empty}
                                    existingUrl={template.front_empty_url}
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
                                    existingUrl={template.front_example_url}
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
                                    existingUrl={template.back_url}
                                    isRemoved={data.back_remove}
                                    onFileChange={(f) => setData('back', f)}
                                    onRemoveExistingChange={(r) => setData('back_remove', r)}
                                    error={errors.back}
                                    size="sm"
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-heading text-sm font-semibold">
                                        التخطيط (الموقع والحجم)
                                    </h4>
                                    <button
                                        type="button"
                                        className="flex items-center gap-1 text-xs text-muted-foreground underline"
                                        onClick={() => setData('layout', structuredClone(defaultLayout))}
                                    >
                                        <RotateCcwIcon className="size-3" />
                                        إعادة تعيين
                                    </button>
                                </div>

                                {TEXT_KEYS.map((key) => {
                                    const item = data.layout[key] as TextLayout;
                                    return (
                                        <div
                                            key={key}
                                            onClick={() => setSelected(key)}
                                            className={cn(
                                                'rounded-xl border bg-muted/20 p-3 cursor-pointer transition-shadow',
                                                selected === key && 'ring-2 ring-blue-500 shadow-sm',
                                            )}
                                        >
                                            <p className="mb-2 text-xs font-semibold">{LABELS[key]}</p>
                                            <div className="grid grid-cols-3 gap-2">
                                                <NumberField
                                                    label="أعلى"
                                                    value={item.top}
                                                    onChange={(v) => setLayoutField(key, 'top', v)}
                                                />
                                                <NumberField
                                                    label="يسار"
                                                    value={item.left}
                                                    onChange={(v) => setLayoutField(key, 'left', v)}
                                                />
                                                <NumberField
                                                    label="الحجم"
                                                    value={item.fontSize}
                                                    step={0.1}
                                                    onChange={(v) => setLayoutField(key, 'fontSize', v)}
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
 
                                {IMAGE_KEYS.map((key) => {
                                    const item = data.layout[key] as ImageLayout;
                                    return (
                                        <div
                                            key={key}
                                            onClick={() => setSelected(key)}
                                            className={cn(
                                                'rounded-xl border bg-muted/20 p-3 cursor-pointer transition-shadow',
                                                selected === key && 'ring-2 ring-blue-500 shadow-sm',
                                            )}
                                        >
                                            <p className="mb-2 text-xs font-semibold">{LABELS[key]}</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                <NumberField
                                                    label="أعلى"
                                                    value={item.top}
                                                    onChange={(v) => setLayoutField(key, 'top', v)}
                                                />
                                                <NumberField
                                                    label="يسار"
                                                    value={item.left}
                                                    onChange={(v) => setLayoutField(key, 'left', v)}
                                                />
                                                <NumberField
                                                    label="العرض"
                                                    value={item.width}
                                                    onChange={(v) => setLayoutField(key, 'width', v)}
                                                />
                                                <NumberField
                                                    label="الارتفاع"
                                                    value={item.height}
                                                    onChange={(v) => setLayoutField(key, 'height', v)}
                                                />
                                            </div>
                                            {key === 'photo' && (
                                                <label className="mt-2 flex items-center gap-2">
                                                    <Checkbox
                                                        checked={item.rounded ?? false}
                                                        onCheckedChange={(v) =>
                                                            setLayoutField('photo', 'rounded', v === true)
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

                            <FormActions
                                processing={processing}
                                cancelHref="/dashboard/card-templates"
                                onSave={save}
                            />
                        </div>

                        {/* ── Main: full-width preview ── */}
                        <div className="space-y-4">
                            <header className="flex flex-wrap items-center justify-between gap-2">
                                <h3 className="font-heading text-lg font-semibold">
                                    معاينة حية
                                </h3>
                                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <MoveIcon className="size-3.5" />
                                    اسحب العناصر &nbsp;|&nbsp; عجلة / ضغط لتغيير الحجم
                                </span>
                            </header>
                            <CardFrontPreview
                                backgroundSrc={frontExampleSrc}
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
                    </div>
                </form>
            </div>
        </>
    );
}

CardTemplateEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        {
            title: 'بطاقات العضوية',
            href: '/dashboard/card-templates',
        },
        { title: 'تعديل', href: '#' },
    ],
};

/* ── Small inline label + number input ── */
function NumberField({
    label,
    value,
    step,
    onChange,
}: {
    label: string;
    value: number;
    step?: number;
    onChange: (v: number) => void;
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
            />
        </div>
    );
}

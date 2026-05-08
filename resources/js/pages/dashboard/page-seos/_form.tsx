import { PlusIcon, TagIcon, Trash2Icon } from 'lucide-react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormActions from '@/pages/dashboard/_components/form-actions';
import ImagePicker from '@/pages/dashboard/_components/image-picker';
import TranslatableInput from '@/pages/dashboard/_components/translatable-input';

export interface PageSeoFormData {
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    keywords: string[];
    noindex: boolean;
    og_image: File | null;
    og_image_url: string | null;
    og_image_remove: boolean;
}

interface Props {
    data: PageSeoFormData;
    setData: <K extends keyof PageSeoFormData>(
        key: K,
        value: PageSeoFormData[K],
    ) => void;
    submit: (e: FormEvent) => void;
    onSave: (intent: 'stay' | 'return') => void;
    processing: boolean;
    errors: Record<string, string>;
    cancelHref: string;
}

export default function PageSeoForm({
    data,
    setData,
    submit,
    onSave,
    processing,
    errors,
    cancelHref,
}: Props) {
    return (
        <form onSubmit={submit} className="w-full space-y-6" dir="rtl">
            <section className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
                <header>
                    <h3 className="font-heading text-lg font-semibold">
                        العنوان والوصف
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        العنوان والوصف الذي يظهر في تبويب المتصفح، نتائج البحث،
                        وعند مشاركة الصفحة على وسائل التواصل.
                    </p>
                </header>

                <TranslatableInput
                    name="title"
                    label="العنوان"
                    values={data.title}
                    onChange={(locale, value) =>
                        setData('title', { ...data.title, [locale]: value })
                    }
                    errors={errors}
                />

                <TranslatableInput
                    name="description"
                    label="الوصف"
                    values={data.description}
                    onChange={(locale, value) =>
                        setData('description', {
                            ...data.description,
                            [locale]: value,
                        })
                    }
                    errors={errors}
                    multiline
                />
            </section>

            <section className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
                <header>
                    <h3 className="font-heading text-lg font-semibold">
                        الكلمات المفتاحية
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        اختياري. تُستخدم في وسم الكلمات المفتاحية.
                    </p>
                </header>
                <KeywordList
                    keywords={data.keywords}
                    onChange={(next) => setData('keywords', next)}
                    errors={errors}
                />
            </section>

            <section className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
                <header>
                    <h3 className="font-heading text-lg font-semibold">
                        صورة المشاركة (Open Graph)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        تظهر عند مشاركة الصفحة على فيسبوك وتويتر وغيرها. في حال
                        تركها فارغة سيُستخدم شعار الموقع.
                    </p>
                </header>
                <ImagePicker
                    label="صورة المشاركة"
                    file={data.og_image}
                    existingUrl={data.og_image_url}
                    isRemoved={data.og_image_remove}
                    onFileChange={(f) => setData('og_image', f)}
                    onRemoveExistingChange={(rm) =>
                        setData('og_image_remove', rm)
                    }
                    error={errors.og_image}
                    aspect="wide"
                    size="md"
                />
            </section>

            <section className="rounded-3xl border bg-card p-6 shadow-sm">
                <label className="flex cursor-pointer items-start gap-3">
                    <input
                        type="checkbox"
                        checked={data.noindex}
                        onChange={(e) => setData('noindex', e.target.checked)}
                        className="mt-1 size-4 rounded border-input"
                    />
                    <span className="space-y-0.5">
                        <span className="block text-sm font-medium">
                            إخفاء من محركات البحث (noindex)
                        </span>
                        <span className="block text-xs text-muted-foreground">
                            يُضيف وسم{' '}
                            <code dir="ltr">
                                &lt;meta name="robots" content="noindex,
                                nofollow"&gt;
                            </code>{' '}
                            لهذه الصفحة.
                        </span>
                    </span>
                </label>
            </section>

            <FormActions
                processing={processing}
                cancelHref={cancelHref}
                onSave={onSave}
            />
        </form>
    );
}

function KeywordList({
    keywords,
    onChange,
    errors,
}: {
    keywords: string[];
    onChange: (next: string[]) => void;
    errors: Record<string, string>;
}) {
    const updateKeyword = (i: number, value: string) =>
        onChange(keywords.map((k, idx) => (idx === i ? value : k)));

    const addKeyword = () => onChange([...keywords, '']);
    const removeKeyword = (i: number) =>
        onChange(keywords.filter((_, idx) => idx !== i));

    return (
        <div className="grid gap-2">
            <Label>الكلمات المفتاحية</Label>
            <div className="space-y-2">
                {keywords.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        لا توجد كلمات مفتاحية بعد.
                    </p>
                )}
                {keywords.map((k, i) => (
                    <div key={i} className="flex gap-2">
                        <div className="relative flex-1">
                            <TagIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                dir="rtl"
                                value={k ?? ''}
                                onChange={(e) =>
                                    updateKeyword(i, e.target.value)
                                }
                                placeholder="كلمة مفتاحية"
                                className="pr-9"
                            />
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeKeyword(i)}
                            className="btn-delete gap-1.5"
                        >
                            <Trash2Icon className="size-3.5" />
                            حذف
                        </Button>
                        <InputError message={errors[`keywords.${i}`]} />
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="secondary"
                className="w-fit gap-1.5"
                onClick={addKeyword}
            >
                <PlusIcon className="size-3.5" />
                إضافة كلمة
            </Button>
            <InputError message={errors.keywords} />
        </div>
    );
}

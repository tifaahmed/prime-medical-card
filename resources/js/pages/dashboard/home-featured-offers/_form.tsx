import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface FeaturedOfferFormData {
    title: string;
    partner: string;
    description: string;
    discount: string;
    expires_text: string;
    tag: string;
    accent_color: string;
    is_published: boolean;
    position: number | string;
}

interface Props {
    data: FeaturedOfferFormData;
    setData: <K extends keyof FeaturedOfferFormData>(
        key: K,
        value: FeaturedOfferFormData[K],
    ) => void;
    errors: Partial<Record<keyof FeaturedOfferFormData, string>>;
    processing: boolean;
}

export default function FeaturedOfferForm({
    data,
    setData,
    errors,
    processing,
}: Props) {
    return (
        <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                    <Label htmlFor="title">
                        العنوان <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="title"
                        dir="rtl"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.title} />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="partner">
                        اسم الشريك <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="partner"
                        dir="rtl"
                        value={data.partner}
                        onChange={(e) => setData('partner', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.partner} />
                </div>
            </div>

            <div className="grid gap-1.5">
                <Label htmlFor="description">الوصف</Label>
                <textarea
                    id="description"
                    dir="rtl"
                    rows={4}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    disabled={processing}
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50"
                />
                <InputError message={errors.description} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                    <Label htmlFor="discount">الخصم</Label>
                    <Input
                        id="discount"
                        dir="rtl"
                        value={data.discount}
                        onChange={(e) => setData('discount', e.target.value)}
                        disabled={processing}
                    />
                    <p className="text-xs text-muted-foreground">مثال: ٦٥٪</p>
                    <InputError message={errors.discount} />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="expires_text">نص الانتهاء</Label>
                    <Input
                        id="expires_text"
                        dir="rtl"
                        value={data.expires_text}
                        onChange={(e) =>
                            setData('expires_text', e.target.value)
                        }
                        disabled={processing}
                    />
                    <p className="text-xs text-muted-foreground">
                        مثال: حتى ٣٠ مايو
                    </p>
                    <InputError message={errors.expires_text} />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="tag">الشارة</Label>
                    <Input
                        id="tag"
                        dir="rtl"
                        value={data.tag}
                        onChange={(e) => setData('tag', e.target.value)}
                        disabled={processing}
                    />
                    <p className="text-xs text-muted-foreground">
                        مثال: الأكثر طلباً
                    </p>
                    <InputError message={errors.tag} />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="accent_color">لون التمييز</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="accent_color"
                            dir="ltr"
                            value={data.accent_color}
                            onChange={(e) =>
                                setData('accent_color', e.target.value)
                            }
                            disabled={processing}
                            placeholder="#0b2e2c"
                        />
                        <input
                            type="color"
                            value={data.accent_color || '#0b2e2c'}
                            onChange={(e) =>
                                setData('accent_color', e.target.value)
                            }
                            disabled={processing}
                            className="size-10 cursor-pointer rounded-md border"
                        />
                    </div>
                    <InputError message={errors.accent_color} />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                    <Label htmlFor="position">الترتيب</Label>
                    <Input
                        id="position"
                        type="number"
                        min={0}
                        value={data.position}
                        onChange={(e) => setData('position', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.position} />
                </div>
                <div className="flex items-end gap-2">
                    <Checkbox
                        id="is_published"
                        checked={data.is_published}
                        onCheckedChange={(v) =>
                            setData('is_published', v === true)
                        }
                        disabled={processing}
                    />
                    <Label htmlFor="is_published" className="cursor-pointer">
                        منشور
                    </Label>
                </div>
            </div>
        </div>
    );
}

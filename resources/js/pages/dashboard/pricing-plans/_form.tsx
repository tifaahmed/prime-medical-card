import { TrashIcon } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export interface PlanFormData {
    name: string;
    description: string;
    price: string;
    period: string;
    features: string[];
    badge: string;
    is_featured: boolean;
    cta_label: string;
    cta_variant: 'ghost' | 'amber' | 'primary';
    is_published: boolean;
    position: number | string;
}

interface Props {
    data: PlanFormData;
    setData: <K extends keyof PlanFormData>(
        key: K,
        value: PlanFormData[K],
    ) => void;
    errors: Record<string, string>;
    processing: boolean;
}

export default function PlanForm({ data, setData, errors, processing }: Props) {
    const updateFeature = (i: number, v: string) => {
        const next = [...data.features];
        next[i] = v;
        setData('features', next);
    };

    const removeFeature = (i: number) => {
        setData(
            'features',
            data.features.filter((_, idx) => idx !== i),
        );
    };

    const addFeature = () => {
        setData('features', [...data.features, '']);
    };

    return (
        <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                    <Label htmlFor="name">
                        اسم الباقة <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="name"
                        dir="rtl"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="description">الوصف</Label>
                    <Input
                        id="description"
                        dir="rtl"
                        value={data.description}
                        onChange={(e) =>
                            setData('description', e.target.value)
                        }
                        disabled={processing}
                    />
                    <InputError message={errors.description} />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="price">
                        السعر <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="price"
                        dir="rtl"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <p className="text-xs text-muted-foreground">
                        مثال: ٢٩٩
                    </p>
                    <InputError message={errors.price} />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="period">المدة / الوصف الزمني</Label>
                    <Input
                        id="period"
                        dir="rtl"
                        value={data.period}
                        onChange={(e) => setData('period', e.target.value)}
                        disabled={processing}
                    />
                    <p className="text-xs text-muted-foreground">
                        مثال: سنوياً / للعائلة كاملة
                    </p>
                    <InputError message={errors.period} />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="badge">الشارة (اختياري)</Label>
                    <Input
                        id="badge"
                        dir="rtl"
                        value={data.badge}
                        onChange={(e) => setData('badge', e.target.value)}
                        disabled={processing}
                    />
                    <p className="text-xs text-muted-foreground">
                        مثال: الأكثر شعبية
                    </p>
                    <InputError message={errors.badge} />
                </div>
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
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label>المميزات</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addFeature}
                        disabled={processing}
                    >
                        إضافة ميزة
                    </Button>
                </div>
                <div className="space-y-2">
                    {data.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Input
                                dir="rtl"
                                value={f}
                                onChange={(e) =>
                                    updateFeature(i, e.target.value)
                                }
                                disabled={processing}
                                placeholder="مثال: خصومات على جميع الخدمات الطبية"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFeature(i)}
                                disabled={processing}
                                aria-label="حذف"
                            >
                                <TrashIcon className="size-4 text-red-500" />
                            </Button>
                        </div>
                    ))}
                    {data.features.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            لا توجد مميزات بعد. اضغط ”إضافة ميزة“.
                        </p>
                    )}
                </div>
                <InputError message={errors.features} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                    <Label htmlFor="cta_label">
                        نص زر الدعوة{' '}
                        <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="cta_label"
                        dir="rtl"
                        value={data.cta_label}
                        onChange={(e) =>
                            setData('cta_label', e.target.value)
                        }
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.cta_label} />
                </div>
                <div className="grid gap-1.5">
                    <Label>
                        نمط زر الدعوة{' '}
                        <span className="text-red-600">*</span>
                    </Label>
                    <Select
                        value={data.cta_variant}
                        onValueChange={(v) =>
                            setData(
                                'cta_variant',
                                v as PlanFormData['cta_variant'],
                            )
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ghost">شفاف (ghost)</SelectItem>
                            <SelectItem value="amber">عنبري (amber)</SelectItem>
                            <SelectItem value="primary">
                                أساسي (primary)
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.cta_variant} />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="is_featured"
                        checked={data.is_featured}
                        onCheckedChange={(v) =>
                            setData('is_featured', v === true)
                        }
                        disabled={processing}
                    />
                    <Label htmlFor="is_featured" className="cursor-pointer">
                        باقة مميزة (Featured)
                    </Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="is_published"
                        checked={data.is_published}
                        onCheckedChange={(v) =>
                            setData('is_published', v === true)
                        }
                        disabled={processing}
                    />
                    <Label htmlFor="is_published" className="cursor-pointer">
                        منشورة
                    </Label>
                </div>
            </div>
        </div>
    );
}

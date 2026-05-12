import InputError from '@/components/input-error';
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

export interface ServiceFormData {
    title: string;
    description: string;
    discount: string;
    icon_key: string;
    is_published: boolean;
    position: number | string;
}

interface Props {
    data: ServiceFormData;
    setData: <K extends keyof ServiceFormData>(
        key: K,
        value: ServiceFormData[K],
    ) => void;
    errors: Partial<Record<keyof ServiceFormData, string>>;
    processing: boolean;
    iconKeys: string[];
}

const ICON_LABELS: Record<string, string> = {
    clinics: 'العيادات والمستشفيات',
    pharmacy: 'الصيدليات',
    labs: 'المعامل',
    imaging: 'الأشعة',
    dental: 'الأسنان',
    optical: 'البصريات',
    mental: 'الصحة النفسية',
    physio: 'العلاج الطبيعي',
};

export default function HomeServiceForm({
    data,
    setData,
    errors,
    processing,
    iconKeys,
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
                    <Label htmlFor="discount">الخصم</Label>
                    <Input
                        id="discount"
                        dir="rtl"
                        value={data.discount}
                        onChange={(e) => setData('discount', e.target.value)}
                        disabled={processing}
                    />
                    <p className="text-xs text-muted-foreground">
                        مثال: حتى ٦٠٪ خصم
                    </p>
                    <InputError message={errors.discount} />
                </div>
            </div>

            <div className="grid gap-1.5">
                <Label htmlFor="description">الوصف</Label>
                <textarea
                    id="description"
                    dir="rtl"
                    rows={3}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    disabled={processing}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50"
                />
                <InputError message={errors.description} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-1.5">
                    <Label>
                        الأيقونة <span className="text-red-600">*</span>
                    </Label>
                    <Select
                        value={data.icon_key}
                        onValueChange={(v) => setData('icon_key', v)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="اختر أيقونة…" />
                        </SelectTrigger>
                        <SelectContent>
                            {iconKeys.map((k) => (
                                <SelectItem key={k} value={k}>
                                    <span dir="rtl">
                                        {ICON_LABELS[k] ?? k}{' '}
                                        <code className="text-xs text-muted-foreground">
                                            ({k})
                                        </code>
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.icon_key} />
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
                        منشورة
                    </Label>
                </div>
            </div>
        </div>
    );
}

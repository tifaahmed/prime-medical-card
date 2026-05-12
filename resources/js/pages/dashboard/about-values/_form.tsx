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

export interface ValueFormData {
    title: string;
    description: string;
    icon_key: string;
    is_published: boolean;
    position: number | string;
}

interface Props {
    data: ValueFormData;
    setData: <K extends keyof ValueFormData>(
        key: K,
        value: ValueFormData[K],
    ) => void;
    errors: Partial<Record<keyof ValueFormData, string>>;
    processing: boolean;
    iconKeys: string[];
}

const ICON_LABELS: Record<string, string> = {
    shield: 'درع (الجودة)',
    clock: 'ساعة (الشفافية)',
    chat: 'محادثة (الدعم)',
    wallet: 'محفظة (السعر)',
};

export default function ValueForm({
    data,
    setData,
    errors,
    processing,
    iconKeys,
}: Props) {
    return (
        <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
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
                            <SelectValue placeholder="اختر…" />
                        </SelectTrigger>
                        <SelectContent>
                            {iconKeys.map((k) => (
                                <SelectItem key={k} value={k}>
                                    <span dir="rtl">
                                        {ICON_LABELS[k] ?? k}
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

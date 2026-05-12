import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface StatFormData {
    value: string;
    label: string;
    is_published: boolean;
    position: number | string;
}

interface Props {
    data: StatFormData;
    setData: <K extends keyof StatFormData>(
        key: K,
        value: StatFormData[K],
    ) => void;
    errors: Partial<Record<keyof StatFormData, string>>;
    processing: boolean;
}

export default function StatForm({
    data,
    setData,
    errors,
    processing,
}: Props) {
    return (
        <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                    <Label htmlFor="value">
                        القيمة <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="value"
                        dir="rtl"
                        value={data.value}
                        onChange={(e) => setData('value', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <p className="text-xs text-muted-foreground">
                        مثال: +٣٠٠٠
                    </p>
                    <InputError message={errors.value} />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="label">
                        الوصف <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="label"
                        dir="rtl"
                        value={data.label}
                        onChange={(e) => setData('label', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.label} />
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
                        منشورة
                    </Label>
                </div>
            </div>
        </div>
    );
}

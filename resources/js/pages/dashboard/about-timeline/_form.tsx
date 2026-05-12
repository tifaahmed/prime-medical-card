import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface EntryFormData {
    year: string;
    title: string;
    description: string;
    is_published: boolean;
    position: number | string;
}

interface Props {
    data: EntryFormData;
    setData: <K extends keyof EntryFormData>(
        key: K,
        value: EntryFormData[K],
    ) => void;
    errors: Partial<Record<keyof EntryFormData, string>>;
    processing: boolean;
}

export default function EntryForm({
    data,
    setData,
    errors,
    processing,
}: Props) {
    return (
        <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                    <Label htmlFor="year">
                        السنة <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="year"
                        dir="rtl"
                        value={data.year}
                        onChange={(e) => setData('year', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <p className="text-xs text-muted-foreground">
                        مثال: ٢٠٢٠
                    </p>
                    <InputError message={errors.year} />
                </div>
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

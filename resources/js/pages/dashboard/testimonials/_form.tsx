import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface TestimonialFormData {
    name: string;
    role: string;
    quote: string;
    avatar: string;
    is_featured: boolean;
    is_published: boolean;
    position: number | string;
}

interface Props {
    data: TestimonialFormData;
    setData: <K extends keyof TestimonialFormData>(
        key: K,
        value: TestimonialFormData[K],
    ) => void;
    errors: Partial<Record<keyof TestimonialFormData, string>>;
    processing: boolean;
}

export default function TestimonialForm({
    data,
    setData,
    errors,
    processing,
}: Props) {
    return (
        <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                    <Label htmlFor="name">
                        الاسم <span className="text-red-600">*</span>
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
                    <Label htmlFor="role">الوظيفة / الموقع</Label>
                    <Input
                        id="role"
                        dir="rtl"
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.role} />
                </div>
            </div>

            <div className="grid gap-1.5">
                <Label htmlFor="quote">
                    الاقتباس <span className="text-red-600">*</span>
                </Label>
                <textarea
                    id="quote"
                    dir="rtl"
                    rows={6}
                    value={data.quote}
                    onChange={(e) => setData('quote', e.target.value)}
                    disabled={processing}
                    required
                    className="flex min-h-[140px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50"
                />
                <InputError message={errors.quote} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-1.5">
                    <Label htmlFor="avatar">الأحرف الأولى (Avatar)</Label>
                    <Input
                        id="avatar"
                        dir="rtl"
                        value={data.avatar}
                        onChange={(e) => setData('avatar', e.target.value)}
                        disabled={processing}
                        maxLength={4}
                    />
                    <p className="text-xs text-muted-foreground">
                        مثال: أم
                    </p>
                    <InputError message={errors.avatar} />
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
                <div className="flex items-end gap-4">
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
                            مميز
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
                        <Label
                            htmlFor="is_published"
                            className="cursor-pointer"
                        >
                            منشور
                        </Label>
                    </div>
                </div>
            </div>
        </div>
    );
}

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

export interface ContentFormData {
    page: string;
    section: string;
    key: string;
    value: string;
    is_rich: boolean;
}

interface Props {
    data: ContentFormData;
    setData: <K extends keyof ContentFormData>(
        key: K,
        value: ContentFormData[K],
    ) => void;
    errors: Partial<Record<keyof ContentFormData | 'uniq', string>>;
    processing: boolean;
    pages: string[];
}

const PAGE_LABELS: Record<string, string> = {
    home: 'الرئيسية',
    about: 'عن الشركة',
    partners: 'الشركاء',
    contact: 'تواصل معنا',
};

export default function PageContentForm({
    data,
    setData,
    errors,
    processing,
    pages,
}: Props) {
    return (
        <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-1.5">
                    <Label>
                        الصفحة <span className="text-red-600">*</span>
                    </Label>
                    <Select
                        value={data.page}
                        onValueChange={(v) => setData('page', v)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="اختر…" />
                        </SelectTrigger>
                        <SelectContent>
                            {pages.map((p) => (
                                <SelectItem key={p} value={p}>
                                    {PAGE_LABELS[p] ?? p}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.page} />
                </div>

                <div className="grid gap-1.5">
                    <Label htmlFor="section">
                        القسم <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="section"
                        dir="ltr"
                        value={data.section}
                        onChange={(e) =>
                            setData(
                                'section',
                                e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
                            )
                        }
                        disabled={processing}
                        required
                        placeholder="hero, story, footer..."
                    />
                    <p className="text-xs text-muted-foreground">
                        حروف وأرقام و _ فقط
                    </p>
                    <InputError message={errors.section} />
                </div>

                <div className="grid gap-1.5">
                    <Label htmlFor="key">
                        المفتاح <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="key"
                        dir="ltr"
                        value={data.key}
                        onChange={(e) =>
                            setData(
                                'key',
                                e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
                            )
                        }
                        disabled={processing}
                        required
                        placeholder="title, paragraph, eyebrow..."
                    />
                    <p className="text-xs text-muted-foreground">
                        حروف وأرقام و _ فقط
                    </p>
                    <InputError message={errors.key} />
                </div>
            </div>

            {errors.uniq && (
                <p className="text-sm font-semibold text-red-600">
                    {errors.uniq}
                </p>
            )}

            <div className="grid gap-1.5">
                <Label htmlFor="value">القيمة</Label>
                <textarea
                    id="value"
                    dir="rtl"
                    rows={8}
                    value={data.value}
                    onChange={(e) => setData('value', e.target.value)}
                    disabled={processing}
                    className="flex min-h-[160px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50"
                />
                <InputError message={errors.value} />
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="is_rich"
                    checked={data.is_rich}
                    onCheckedChange={(v) => setData('is_rich', v === true)}
                    disabled={processing}
                />
                <Label htmlFor="is_rich" className="cursor-pointer">
                    يحتوي على HTML (سيتم عرضه كنص خام إلا إذا دعم المكون ذلك)
                </Label>
            </div>
        </div>
    );
}

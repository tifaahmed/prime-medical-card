import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface FaqFormData {
    question: string;
    answer: string;
    position: number | string;
    is_published: boolean;
}

interface Props {
    data: FaqFormData;
    setData: <K extends keyof FaqFormData>(key: K, value: FaqFormData[K]) => void;
    errors: Partial<Record<keyof FaqFormData, string>>;
    processing: boolean;
}

export default function FaqForm({ data, setData, errors, processing }: Props) {
    return (
        <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
            <div className="grid gap-2">
                <Label htmlFor="question">
                    السؤال <span className="text-red-600">*</span>
                </Label>
                <Input
                    id="question"
                    name="question"
                    dir="rtl"
                    value={data.question}
                    onChange={(e) => setData('question', e.target.value)}
                    disabled={processing}
                    maxLength={500}
                    required
                />
                <InputError message={errors.question} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="answer">
                    الإجابة <span className="text-red-600">*</span>
                </Label>
                <textarea
                    id="answer"
                    name="answer"
                    dir="rtl"
                    rows={8}
                    value={data.answer}
                    onChange={(e) => setData('answer', e.target.value)}
                    disabled={processing}
                    required
                    className="flex min-h-[160px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50"
                />
                <p className="text-xs text-muted-foreground">
                    يتم الاحتفاظ بفواصل الأسطر عند العرض.
                </p>
                <InputError message={errors.answer} />
            </div>

            <div className="grid gap-2 sm:max-w-xs">
                <Label htmlFor="position">الترتيب</Label>
                <Input
                    id="position"
                    name="position"
                    type="number"
                    min={0}
                    max={9999}
                    value={data.position}
                    onChange={(e) => setData('position', e.target.value)}
                    disabled={processing}
                />
                <p className="text-xs text-muted-foreground">
                    الأرقام الأصغر تظهر أولاً.
                </p>
                <InputError message={errors.position} />
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
                    منشور في الموقع
                </Label>
                <InputError message={errors.is_published} />
            </div>
        </div>
    );
}

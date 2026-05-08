import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Locale = 'en' | 'ar';

interface Errors {
    [key: string]: string | undefined;
}

interface Props {
    name: string;
    label: string;
    values: { en?: string | null; ar?: string | null };
    onChange: (locale: Locale, value: string) => void;
    errors?: Errors;
    required?: boolean;
    multiline?: boolean;
}

export default function TranslatableInput({
    name,
    label,
    values,
    onChange,
    errors = {},
    required = false,
    multiline = false,
}: Props) {
    return (
        <div className="grid gap-1.5">
            <Label>
                {label}
                {required && <span className="text-red-600"> *</span>}
            </Label>
            {multiline ? (
                <textarea
                    dir="rtl"
                    value={values.ar ?? ''}
                    onChange={(e) => onChange('ar', e.target.value)}
                    rows={3}
                    className="flex min-h-[72px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                />
            ) : (
                <Input
                    dir="rtl"
                    value={values.ar ?? ''}
                    onChange={(e) => onChange('ar', e.target.value)}
                />
            )}
            <InputError message={errors[`${name}.ar`]} />
        </div>
    );
}

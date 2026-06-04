import { CheckIcon, CreditCardIcon, ListIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    processing: boolean;
    cancelHref: string;
    onSave: (intent: 'stay' | 'return') => void;
    onSaveCard?: () => void;
    primaryLabel?: string;
}

export default function FormActions({
    processing,
    cancelHref,
    onSave,
    onSaveCard,
    primaryLabel = 'حفظ',
}: Props) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Button type="submit" disabled={processing} className="gap-1.5">
                <CheckIcon className="size-4" />
                {primaryLabel} والبقاء
            </Button>
            <Button
                type="button"
                variant="secondary"
                disabled={processing}
                onClick={() => onSave('return')}
                className="gap-1.5"
            >
                <ListIcon className="size-4" />
                {primaryLabel} والعودة
            </Button>
            {onSaveCard && (
                <Button
                    type="button"
                    variant="secondary"
                    disabled={processing}
                    onClick={onSaveCard}
                    className="gap-1.5"
                >
                    <CreditCardIcon className="size-4" />
                    {primaryLabel} والبطاقة
                </Button>
            )}
            <Button asChild variant="outline" type="button">
                <a href={cancelHref}>إلغاء</a>
            </Button>
        </div>
    );
}

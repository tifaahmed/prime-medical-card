import { CheckIcon, ListIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    processing: boolean;
    cancelHref: string;
    onSave: (intent: 'stay' | 'return') => void;
    primaryLabel?: string;
}

/**
 * Standard dashboard form action bar:
 * - "Save & stay" (primary, also bound to Enter via type="submit")
 * - "Save & return" (jumps back to the resource index)
 * - "Cancel" link
 *
 * The parent form's onSubmit handler should call onSave('stay') so that
 * pressing Enter behaves like the primary button.
 */
export default function FormActions({
    processing,
    cancelHref,
    onSave,
    primaryLabel = 'Save',
}: Props) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Button type="submit" disabled={processing} className="gap-1.5">
                <CheckIcon className="size-4" />
                {primaryLabel} &amp; stay
            </Button>
            <Button
                type="button"
                variant="secondary"
                disabled={processing}
                onClick={() => onSave('return')}
                className="gap-1.5"
            >
                <ListIcon className="size-4" />
                {primaryLabel} &amp; return
            </Button>
            <Button asChild variant="outline" type="button">
                <a href={cancelHref}>Cancel</a>
            </Button>
        </div>
    );
}

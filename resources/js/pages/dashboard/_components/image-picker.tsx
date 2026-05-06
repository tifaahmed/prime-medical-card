import { ImageIcon, Trash2Icon, UploadIcon } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface Props {
    label: string;
    file: File | null;
    existingUrl: string | null;
    isRemoved: boolean;
    onFileChange: (file: File | null) => void;
    onRemoveExistingChange: (remove: boolean) => void;
    error?: string;
    aspect?: 'square' | 'wide';
    size?: 'sm' | 'md' | 'lg';
    accept?: string;
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
    sm: 'max-w-[140px]',
    md: 'max-w-[220px]',
    lg: 'max-w-md',
};

export default function ImagePicker({
    label,
    file,
    existingUrl,
    isRemoved,
    onFileChange,
    onRemoveExistingChange,
    error,
    aspect = 'wide',
    size = 'md',
    accept = 'image/*',
}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const previewUrl = useMemo(
        () => (file ? URL.createObjectURL(file) : null),
        [file],
    );

    useEffect(
        () => () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        },
        [previewUrl],
    );

    const showExisting = existingUrl && !isRemoved && !file;
    const showPreview = Boolean(file && previewUrl);
    const empty = !showExisting && !showPreview;

    const handlePick = () => inputRef.current?.click();

    const handleClear = () => {
        onFileChange(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }

        if (existingUrl && !file) {
            onRemoveExistingChange(true);
        }
    };

    const handleRestore = () => {
        onFileChange(null);
        onRemoveExistingChange(false);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <div
                className={cn(
                    'relative overflow-hidden rounded-2xl border bg-muted/30',
                    aspect === 'square' ? 'aspect-square' : 'aspect-[16/9]',
                    'flex w-full items-center justify-center',
                    sizeClasses[size],
                )}
            >
                {showPreview && (
                    <img
                        src={previewUrl ?? ''}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                )}
                {showExisting && (
                    <img
                        src={existingUrl ?? ''}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                )}
                {empty && (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <ImageIcon className="size-8" />
                        <span className="text-sm">No image yet</span>
                    </div>
                )}
                {isRemoved && (
                    <div className="absolute inset-0 flex items-center justify-center bg-destructive/40">
                        <span className="rounded-full bg-destructive px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase">
                            Will be removed
                        </span>
                    </div>
                )}
            </div>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    onFileChange(f);

                    if (f) {
                        onRemoveExistingChange(false);
                    }
                }}
            />
            <div className="flex flex-wrap gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handlePick}
                    className="gap-1.5"
                >
                    <UploadIcon className="size-3.5" />
                    {file ? 'Change file' : showExisting ? 'Replace' : 'Upload'}
                </Button>
                {(file || showExisting) && !isRemoved && (
                    <Button
                        type="button"
                        variant="outline"
                        className="btn-delete gap-1.5"
                        onClick={handleClear}
                    >
                        <Trash2Icon className="size-3.5" />
                        Remove
                    </Button>
                )}
                {isRemoved && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleRestore}
                    >
                        Undo remove
                    </Button>
                )}
            </div>
            <InputError message={error} />
        </div>
    );
}

import { ImagePlusIcon, XIcon } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface ExistingGalleryItem {
    id: number;
    url: string;
}

interface Props {
    label: string;
    existing: ExistingGalleryItem[];
    files: File[];
    removedIds: number[];
    onFilesChange: (files: File[]) => void;
    onRemovedIdsChange: (ids: number[]) => void;
    error?: string;
    accept?: string;
}

export default function GalleryPicker({
    label,
    existing,
    files,
    removedIds,
    onFilesChange,
    onRemovedIdsChange,
    error,
    accept = 'image/*',
}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const previews = useMemo(
        () => files.map((f) => URL.createObjectURL(f)),
        [files],
    );

    useEffect(
        () => () => previews.forEach((u) => URL.revokeObjectURL(u)),
        [previews],
    );

    const toggleRemove = (id: number) => {
        onRemovedIdsChange(
            removedIds.includes(id)
                ? removedIds.filter((x) => x !== id)
                : [...removedIds, id],
        );
    };

    const removeNew = (idx: number) => {
        onFilesChange(files.filter((_, i) => i !== idx));
    };

    const handlePick = () => inputRef.current?.click();

    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            {existing.length === 0 && files.length === 0 && (
                <div className="rounded-2xl border border-dashed bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
                    No images in gallery yet.
                </div>
            )}

            {(existing.length > 0 || files.length > 0) && (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                    {existing.map((img) => {
                        const removed = removedIds.includes(img.id);

                        return (
                            <div
                                key={`ex-${img.id}`}
                                className={cn(
                                    'relative overflow-hidden rounded-xl border bg-muted/30',
                                    removed && 'border-destructive/30',
                                )}
                            >
                                <img
                                    src={img.url}
                                    alt=""
                                    className={cn(
                                        'aspect-square w-full object-cover',
                                        removed && 'opacity-30',
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleRemove(img.id)}
                                    className={cn(
                                        'absolute inset-x-1 bottom-1 rounded-md bg-background/90 px-2 py-1 text-[11px] font-medium shadow-sm hover:bg-background',
                                        removed && 'text-destructive',
                                    )}
                                >
                                    {removed ? 'Undo remove' : 'Remove'}
                                </button>
                            </div>
                        );
                    })}
                    {files.map((f, i) => (
                        <div
                            key={`new-${i}-${f.name}`}
                            className="relative overflow-hidden rounded-xl border-2 border-brand-secondary/40 bg-muted/30"
                        >
                            <img
                                src={previews[i] ?? ''}
                                alt=""
                                className="aspect-square w-full object-cover"
                            />
                            <span className="absolute top-1 left-1 rounded-full bg-brand-secondary px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase">
                                New
                            </span>
                            <button
                                type="button"
                                onClick={() => removeNew(i)}
                                className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-background/90 shadow-sm hover:bg-background"
                                aria-label="Remove file"
                            >
                                <XIcon className="size-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple
                className="hidden"
                onChange={(e) => {
                    const picked = Array.from(e.target.files ?? []);

                    if (picked.length === 0) {
                        return;
                    }

                    onFilesChange([...files, ...picked]);

                    if (inputRef.current) {
                        inputRef.current.value = '';
                    }
                }}
            />
            <div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={handlePick}
                    className="gap-1.5"
                >
                    <ImagePlusIcon className="size-3.5" />
                    Add images
                </Button>
            </div>
            <InputError message={error} />
        </div>
    );
}

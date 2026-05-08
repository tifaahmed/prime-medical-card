import {
    ImageIcon,
    MapPinIcon,
    PencilIcon,
    PhoneIcon,
    PlusIcon,
    StoreIcon,
    Trash2Icon,
    UndoIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import GalleryPicker from '@/pages/dashboard/_components/gallery-picker';
import type { ExistingGalleryItem } from '@/pages/dashboard/_components/gallery-picker';
import ImagePicker from '@/pages/dashboard/_components/image-picker';
import TranslatableInput from '@/pages/dashboard/_components/translatable-input';

export interface BranchItem {
    id?: number;
    name: { en: string; ar: string };
    address: { en: string; ar: string };
    phone: string[];
    latitude: string | number | null;
    longitude: string | number | null;
    header_url: string | null;
    header: File | null;
    header_remove: boolean;
    gallery: ExistingGalleryItem[];
    gallery_files: File[];
    gallery_remove: number[];
    _delete?: boolean;
}

interface Props {
    branches: BranchItem[];
    onChange: (branches: BranchItem[]) => void;
    onPersist?: (branches: BranchItem[]) => Promise<void> | void;
    errors: Record<string, string>;
}

export const emptyBranch = (): BranchItem => ({
    name: { en: '', ar: '' },
    address: { en: '', ar: '' },
    phone: [],
    latitude: '',
    longitude: '',
    header_url: null,
    header: null,
    header_remove: false,
    gallery: [],
    gallery_files: [],
    gallery_remove: [],
});

const branchHasContent = (b: BranchItem): boolean =>
    Boolean(
        b.name.en ||
        b.name.ar ||
        b.address.en ||
        b.address.ar ||
        (b.phone && b.phone.length > 0) ||
        b.header ||
        b.header_url ||
        b.gallery_files.length > 0 ||
        b.gallery.length > 0 ||
        b.latitude ||
        b.longitude,
    );

export default function BranchItems({
    branches,
    onChange,
    onPersist,
    errors,
}: Props) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [draft, setDraft] = useState<BranchItem | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const visibleCount = branches.filter((b) => !b._delete).length;

    const openEdit = (index: number) => {
        setEditingIndex(index);
        setDraft({ ...branches[index] });
    };

    const openAdd = () => {
        const next = [...branches, emptyBranch()];
        onChange(next);
        setEditingIndex(next.length - 1);
        setDraft(emptyBranch());
    };

    const saveDraft = async () => {
        if (editingIndex === null || !draft) {
            return;
        }

        const next = [...branches];
        next[editingIndex] = draft;
        onChange(next);

        if (!onPersist) {
            setEditingIndex(null);
            setDraft(null);
            return;
        }

        setSubmitting(true);
        try {
            await onPersist(next);
            setEditingIndex(null);
            setDraft(null);
        } catch {
            // Validation failed — keep the dialog open so the user sees the
            // server-side errors (rendered by BranchEditor via the `errors` prop).
        } finally {
            setSubmitting(false);
        }
    };

    const cancelEdit = () => {
        if (submitting) {
            return;
        }

        if (editingIndex !== null) {
            const branch = branches[editingIndex];

            // If this was a freshly-added branch with nothing typed, drop it
            if (!branch.id && !branchHasContent(branch)) {
                onChange(branches.filter((_, i) => i !== editingIndex));
            }
        }

        setEditingIndex(null);
        setDraft(null);
    };

    const removeRow = (index: number) => {
        const branch = branches[index];

        if (branch.id) {
            onChange(
                branches.map((b, i) =>
                    i === index ? { ...b, _delete: true } : b,
                ),
            );
        } else {
            onChange(branches.filter((_, i) => i !== index));
        }
    };

    const restoreRow = (index: number) =>
        onChange(
            branches.map((b, i) =>
                i === index ? { ...b, _delete: false } : b,
            ),
        );

    const errorIndexes = new Set<number>();
    Object.keys(errors).forEach((k) => {
        const m = k.match(/^branches\.(\d+)\./);

        if (m) {
            errorIndexes.add(Number(m[1]));
        }
    });

    return (
        <div className="space-y-4" dir="rtl">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
                        <StoreIcon className="size-4" />
                    </span>
                    <h3 className="font-heading text-lg font-semibold">
                        الفروع
                    </h3>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {visibleCount}
                    </span>
                </div>
                <Button type="button" onClick={openAdd} className="gap-1.5">
                    <PlusIcon className="size-4" />
                    إضافة فرع
                </Button>
            </div>

            {branches.length === 0 ? (
                <div className="rounded-2xl border border-dashed bg-muted/20 px-4 py-12 text-center text-sm text-muted-foreground">
                    لا توجد فروع بعد. اضغط <strong>إضافة فرع</strong> لإضافة
                    أول فرع.
                </div>
            ) : (
                <ul className="grid gap-3 md:grid-cols-2">
                    {branches.map((branch, idx) => (
                        <BranchSummary
                            key={branch.id ?? `new-${idx}`}
                            index={idx}
                            branch={branch}
                            hasError={errorIndexes.has(idx)}
                            onEdit={() => openEdit(idx)}
                            onRemove={() => removeRow(idx)}
                            onRestore={() => restoreRow(idx)}
                        />
                    ))}
                </ul>
            )}

            <Dialog
                open={editingIndex !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        cancelEdit();
                    }
                }}
            >
                <DialogContent
                    className="max-h-[90vh] overflow-y-auto sm:max-w-3xl"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle>
                            {editingIndex !== null && branches[editingIndex]?.id
                                ? `تعديل الفرع #${branches[editingIndex].id}`
                                : 'فرع جديد'}
                        </DialogTitle>
                        <DialogDescription>
                            البيانات وجهات الاتصال والموقع والصور.
                        </DialogDescription>
                    </DialogHeader>

                    {draft && editingIndex !== null && (
                        <BranchEditor
                            index={editingIndex}
                            branch={draft}
                            onChange={(patch) =>
                                setDraft((prev) =>
                                    prev ? { ...prev, ...patch } : prev,
                                )
                            }
                            errors={errors}
                        />
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={cancelEdit}
                            disabled={submitting}
                        >
                            إلغاء
                        </Button>
                        <Button
                            type="button"
                            onClick={saveDraft}
                            disabled={submitting}
                        >
                            {submitting ? 'جاري الحفظ…' : 'حفظ'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function useHeaderPreview(file: File | null, fallback: string | null): string {
    const fileUrl = useMemo(
        () => (file ? URL.createObjectURL(file) : null),
        [file],
    );
    useEffect(
        () => () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        },
        [fileUrl],
    );

    return fileUrl ?? fallback ?? '';
}

function BranchSummary({
    index,
    branch,
    hasError,
    onEdit,
    onRemove,
    onRestore,
}: {
    index: number;
    branch: BranchItem;
    hasError: boolean;
    onEdit: () => void;
    onRemove: () => void;
    onRestore: () => void;
}) {
    const titleAr =
        branch.name.ar || (branch.id ? `الفرع #${branch.id}` : 'فرع جديد');
    const addressLine = branch.address.ar || branch.address.en;
    const totalImages = branch.gallery.length + branch.gallery_files.length;
    const hasHeader = Boolean(branch.header || branch.header_url);
    const headerSrc = useHeaderPreview(branch.header, branch.header_url);

    return (
        <li
            className={cn(
                'group relative flex gap-3 overflow-hidden rounded-2xl border bg-card p-3 shadow-sm transition-colors',
                branch._delete && 'border-destructive/30 bg-destructive/5',
                hasError && 'border-destructive/40 ring-1 ring-destructive/30',
            )}
        >
            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted text-muted-foreground">
                {hasHeader ? (
                    <img
                        src={headerSrc}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <ImageIcon className="size-6" />
                )}
            </div>
            <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded-full bg-brand-primary/10 text-[10px] font-semibold text-brand-primary">
                        {index + 1}
                    </span>
                    <p className="truncate font-medium" dir="rtl">
                        {titleAr}
                    </p>
                </div>
                {addressLine && (
                    <p className="truncate text-xs text-muted-foreground">
                        {addressLine}
                    </p>
                )}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                    {branch.phone.length > 0 && (
                        <span className="flex items-center gap-1">
                            <PhoneIcon className="size-3" />
                            {branch.phone.length}
                        </span>
                    )}
                    {totalImages > 0 && (
                        <span className="flex items-center gap-1">
                            <ImageIcon className="size-3" />
                            {totalImages}
                        </span>
                    )}
                    {(branch.latitude || branch.longitude) && (
                        <span className="flex items-center gap-1">
                            <MapPinIcon className="size-3" />
                            GPS
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                    {branch._delete ? (
                        <>
                            <span className="inline-flex items-center rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-destructive">
                                سيتم الحذف
                            </span>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={onRestore}
                                className="gap-1.5"
                            >
                                <UndoIcon className="size-3.5" />
                                تراجع
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={onEdit}
                                className="btn-edit gap-1.5"
                            >
                                <PencilIcon className="size-3.5" />
                                تعديل
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={onRemove}
                                className="btn-delete gap-1.5"
                            >
                                <Trash2Icon className="size-3.5" />
                                حذف
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </li>
    );
}

function BranchEditor({
    index,
    branch,
    onChange,
    errors,
}: {
    index: number;
    branch: BranchItem;
    onChange: (patch: Partial<BranchItem>) => void;
    errors: Record<string, string>;
}) {
    return (
        <div className="space-y-5 py-2" dir="rtl">
            <TranslatableInput
                name={`branches.${index}.name`}
                label="اسم الفرع"
                values={branch.name}
                onChange={(locale, value) =>
                    onChange({
                        name: { ...branch.name, [locale]: value },
                    })
                }
                errors={errors}
            />

            <TranslatableInput
                name={`branches.${index}.address`}
                label="العنوان"
                values={branch.address}
                onChange={(locale, value) =>
                    onChange({
                        address: { ...branch.address, [locale]: value },
                    })
                }
                errors={errors}
                multiline
            />

            <PhoneList
                phones={branch.phone}
                onChange={(next) => onChange({ phone: next })}
                errorKey={`branches.${index}.phone`}
                errors={errors}
            />

            <GpsInputs
                latitude={branch.latitude}
                longitude={branch.longitude}
                onChange={(lat, lng) =>
                    onChange({ latitude: lat, longitude: lng })
                }
                errors={errors}
                indexKey={`branches.${index}`}
            />

            <ImagePicker
                label="صورة الغلاف"
                file={branch.header}
                existingUrl={branch.header_url}
                isRemoved={branch.header_remove}
                onFileChange={(f) => onChange({ header: f })}
                onRemoveExistingChange={(rm) => onChange({ header_remove: rm })}
                error={errors[`branches.${index}.header`]}
                aspect="wide"
            />

            <GalleryPicker
                label="Gallery"
                existing={branch.gallery}
                files={branch.gallery_files}
                removedIds={branch.gallery_remove}
                onFilesChange={(files) => onChange({ gallery_files: files })}
                onRemovedIdsChange={(ids) => onChange({ gallery_remove: ids })}
                error={errors[`branches.${index}.gallery`]}
            />
        </div>
    );
}

function PhoneList({
    phones,
    onChange,
    errorKey,
    errors,
}: {
    phones: string[];
    onChange: (next: string[]) => void;
    errorKey: string;
    errors: Record<string, string>;
}) {
    const updatePhone = (i: number, value: string) =>
        onChange(phones.map((p, idx) => (idx === i ? value : p)));

    const addPhone = () => onChange([...phones, '']);
    const removePhone = (i: number) =>
        onChange(phones.filter((_, idx) => idx !== i));

    return (
        <div className="grid gap-2">
            <Label>أرقام الهواتف</Label>
            <div className="space-y-2">
                {phones.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        لا توجد أرقام بعد.
                    </p>
                )}
                {phones.map((p, i) => (
                    <div key={i} className="flex gap-2">
                        <div className="relative flex-1">
                            <PhoneIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={p ?? ''}
                                onChange={(e) => updatePhone(i, e.target.value)}
                                placeholder="+20 1xx xxx xxxx"
                                className="pr-9"
                            />
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => removePhone(i)}
                            className="btn-delete gap-1.5"
                        >
                            <Trash2Icon className="size-3.5" />
                            حذف
                        </Button>
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="secondary"
                className="w-fit gap-1.5"
                onClick={addPhone}
            >
                <PlusIcon className="size-3.5" />
                إضافة رقم
            </Button>
            <InputError message={errors[errorKey]} />
        </div>
    );
}

function GpsInputs({
    latitude,
    longitude,
    onChange,
    errors,
    indexKey,
}: {
    latitude: string | number | null;
    longitude: string | number | null;
    onChange: (lat: string, lng: string) => void;
    errors: Record<string, string>;
    indexKey: string;
}) {
    return (
        <div className="grid gap-2">
            <Label className="flex items-center gap-1.5">
                <MapPinIcon className="size-3.5 text-muted-foreground" />
                الموقع الجغرافي
            </Label>
            <div className="grid gap-3 md:grid-cols-2">
                <div className="grid gap-1.5">
                    <span className="text-xs text-muted-foreground">
                        خط العرض
                    </span>
                    <Input
                        type="number"
                        step="any"
                        placeholder="30.0444"
                        value={latitude ?? ''}
                        onChange={(e) =>
                            onChange(e.target.value, String(longitude ?? ''))
                        }
                    />
                    <InputError message={errors[`${indexKey}.latitude`]} />
                </div>
                <div className="grid gap-1.5">
                    <span className="text-xs text-muted-foreground">
                        خط الطول
                    </span>
                    <Input
                        type="number"
                        step="any"
                        placeholder="31.2357"
                        value={longitude ?? ''}
                        onChange={(e) =>
                            onChange(String(latitude ?? ''), e.target.value)
                        }
                    />
                    <InputError message={errors[`${indexKey}.longitude`]} />
                </div>
            </div>
        </div>
    );
}

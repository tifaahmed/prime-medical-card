import {
    CalendarIcon,
    MailIcon,
    PencilIcon,
    PhoneIcon,
    PlusIcon,
    Trash2Icon,
    UndoIcon,
    UsersIcon,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import ImagePicker from '@/pages/dashboard/_components/image-picker';

export interface RelationshipOption {
    value: string;
    label: { en: string; ar: string };
}

export interface FamilyItem {
    id?: number;
    name: string;
    relationship: string;
    date_of_birth: string;
    phone: string;
    email: string;
    is_active: boolean;
    photo: File | null;
    photo_url: string | null;
    photo_remove: boolean;
    _delete?: boolean;
}

interface Props {
    family: FamilyItem[];
    relationships: RelationshipOption[];
    onChange: (family: FamilyItem[]) => void;
    errors: Record<string, string>;
}

export const emptyFamilyMember = (): FamilyItem => ({
    name: '',
    relationship: '',
    date_of_birth: '',
    phone: '',
    email: '',
    is_active: true,
    photo: null,
    photo_url: null,
    photo_remove: false,
});

const memberHasContent = (m: FamilyItem): boolean =>
    Boolean(
        m.name ||
        m.relationship ||
        m.date_of_birth ||
        m.phone ||
        m.email ||
        m.photo ||
        m.photo_url,
    );

function relationshipLabel(
    value: string,
    relationships: RelationshipOption[],
): { en: string; ar: string } | null {
    return relationships.find((r) => r.value === value)?.label ?? null;
}

export default function FamilyItems({
    family,
    relationships,
    onChange,
    errors,
}: Props) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [draft, setDraft] = useState<FamilyItem | null>(null);

    const visibleCount = family.filter((m) => !m._delete).length;

    const openEdit = (index: number) => {
        setEditingIndex(index);
        setDraft({ ...family[index] });
    };

    const openAdd = () => {
        const next = [...family, emptyFamilyMember()];
        onChange(next);
        setEditingIndex(next.length - 1);
        setDraft(emptyFamilyMember());
    };

    const saveDraft = () => {
        if (editingIndex === null || !draft) {
            return;
        }

        const next = [...family];
        next[editingIndex] = draft;
        onChange(next);
        setEditingIndex(null);
        setDraft(null);
    };

    const cancelEdit = () => {
        if (editingIndex !== null) {
            const member = family[editingIndex];

            if (!member.id && !memberHasContent(member)) {
                onChange(family.filter((_, i) => i !== editingIndex));
            }
        }

        setEditingIndex(null);
        setDraft(null);
    };

    const removeRow = (index: number) => {
        const member = family[index];

        if (member.id) {
            onChange(
                family.map((m, i) =>
                    i === index ? { ...m, _delete: true } : m,
                ),
            );
        } else {
            onChange(family.filter((_, i) => i !== index));
        }
    };

    const restoreRow = (index: number) =>
        onChange(
            family.map((m, i) => (i === index ? { ...m, _delete: false } : m)),
        );

    const errorIndexes = new Set<number>();
    Object.keys(errors).forEach((k) => {
        const m = k.match(/^family\.(\d+)\./);

        if (m) {
            errorIndexes.add(Number(m[1]));
        }
    });

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
                        <UsersIcon className="size-4" />
                    </span>
                    <h3 className="font-heading text-lg font-semibold">
                        Family
                    </h3>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {visibleCount}
                    </span>
                </div>
                <Button type="button" onClick={openAdd} className="gap-1.5">
                    <PlusIcon className="size-4" />
                    Add Family Member
                </Button>
            </div>

            {family.length === 0 ? (
                <div className="rounded-2xl border border-dashed bg-muted/20 px-4 py-12 text-center text-sm text-muted-foreground">
                    No family members yet. Click{' '}
                    <strong>Add Family Member</strong> to add the first one.
                </div>
            ) : (
                <ul className="grid gap-3 md:grid-cols-2">
                    {family.map((member, idx) => (
                        <FamilySummary
                            key={member.id ?? `new-${idx}`}
                            index={idx}
                            member={member}
                            relationships={relationships}
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
                    className="max-h-[90vh] overflow-y-auto sm:max-w-2xl"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle>
                            {editingIndex !== null && family[editingIndex]?.id
                                ? `Edit family member #${family[editingIndex].id}`
                                : 'New family member'}
                        </DialogTitle>
                        <DialogDescription>
                            Personal details and contact info.
                        </DialogDescription>
                    </DialogHeader>

                    {draft && editingIndex !== null && (
                        <FamilyEditor
                            index={editingIndex}
                            member={draft}
                            relationships={relationships}
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
                        >
                            Cancel
                        </Button>
                        <Button type="button" onClick={saveDraft}>
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function usePhotoPreview(file: File | null, fallback: string | null): string {
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

function FamilySummary({
    index,
    member,
    relationships,
    hasError,
    onEdit,
    onRemove,
    onRestore,
}: {
    index: number;
    member: FamilyItem;
    relationships: RelationshipOption[];
    hasError: boolean;
    onEdit: () => void;
    onRemove: () => void;
    onRestore: () => void;
}) {
    const photoSrc = usePhotoPreview(member.photo, member.photo_url);
    const hasPhoto = Boolean(member.photo || member.photo_url);
    const relLabel = relationshipLabel(member.relationship, relationships);

    return (
        <li
            className={cn(
                'group relative flex gap-3 overflow-hidden rounded-2xl border bg-card p-3 shadow-sm transition-colors',
                member._delete && 'border-destructive/30 bg-destructive/5',
                hasError && 'border-destructive/40 ring-1 ring-destructive/30',
            )}
        >
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground">
                {hasPhoto ? (
                    <img
                        src={photoSrc}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <UsersIcon className="size-6" />
                )}
            </div>
            <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded-full bg-brand-primary/10 text-[10px] font-semibold text-brand-primary">
                        {index + 1}
                    </span>
                    <p className="truncate font-medium">
                        {member.name || (
                            <span className="text-muted-foreground">
                                Unnamed
                            </span>
                        )}
                    </p>
                </div>
                {relLabel && (
                    <p className="text-xs text-muted-foreground">
                        {relLabel.en}
                        <span className="mx-1">·</span>
                        <span dir="rtl">{relLabel.ar}</span>
                    </p>
                )}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                    {member.phone && (
                        <span className="flex items-center gap-1">
                            <PhoneIcon className="size-3" />
                            {member.phone}
                        </span>
                    )}
                    {member.email && (
                        <span className="flex items-center gap-1">
                            <MailIcon className="size-3" />
                            {member.email}
                        </span>
                    )}
                    {member.date_of_birth && (
                        <span className="flex items-center gap-1">
                            <CalendarIcon className="size-3" />
                            {member.date_of_birth}
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                    {member._delete ? (
                        <>
                            <span className="inline-flex items-center rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-destructive uppercase">
                                Will be deleted
                            </span>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={onRestore}
                                className="gap-1.5"
                            >
                                <UndoIcon className="size-3.5" />
                                Restore
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
                                Edit
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={onRemove}
                                className="btn-delete gap-1.5"
                            >
                                <Trash2Icon className="size-3.5" />
                                Remove
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </li>
    );
}

function FamilyEditor({
    index,
    member,
    relationships,
    onChange,
    errors,
}: {
    index: number;
    member: FamilyItem;
    relationships: RelationshipOption[];
    onChange: (patch: Partial<FamilyItem>) => void;
    errors: Record<string, string>;
}) {
    const k = (field: string) => `family.${index}.${field}`;

    return (
        <div className="space-y-5 py-2">
            <div className="grid gap-3 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label>
                        Name <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        value={member.name}
                        onChange={(e) => onChange({ name: e.target.value })}
                    />
                    <InputError message={errors[k('name')]} />
                </div>
                <div className="grid gap-2">
                    <Label>
                        Relationship <span className="text-red-600">*</span>
                    </Label>
                    <Select
                        value={member.relationship || ''}
                        onValueChange={(v) => onChange({ relationship: v })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select…" />
                        </SelectTrigger>
                        <SelectContent>
                            {relationships.map((r) => (
                                <SelectItem key={r.value} value={r.value}>
                                    {r.label.en} —{' '}
                                    <span dir="rtl">{r.label.ar}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors[k('relationship')]} />
                </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
                <div className="grid gap-2">
                    <Label>Date of birth</Label>
                    <Input
                        type="date"
                        value={member.date_of_birth ?? ''}
                        onChange={(e) =>
                            onChange({ date_of_birth: e.target.value })
                        }
                    />
                    <InputError message={errors[k('date_of_birth')]} />
                </div>
                <div className="grid gap-2">
                    <Label>Phone</Label>
                    <div className="relative">
                        <PhoneIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={member.phone ?? ''}
                            onChange={(e) =>
                                onChange({ phone: e.target.value })
                            }
                            placeholder="+20 1xx xxx xxxx"
                            className="pl-9"
                        />
                    </div>
                    <InputError message={errors[k('phone')]} />
                </div>
                <div className="grid gap-2">
                    <Label>Email</Label>
                    <div className="relative">
                        <MailIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="email"
                            value={member.email ?? ''}
                            onChange={(e) =>
                                onChange({ email: e.target.value })
                            }
                            className="pl-9"
                        />
                    </div>
                    <InputError message={errors[k('email')]} />
                </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border bg-muted/20 px-3 py-2">
                <input
                    id={`active-${index}`}
                    type="checkbox"
                    checked={member.is_active}
                    onChange={(e) => onChange({ is_active: e.target.checked })}
                    className="size-4 rounded border-input"
                />
                <Label htmlFor={`active-${index}`} className="cursor-pointer">
                    Active
                </Label>
            </div>

            <ImagePicker
                label="Photo"
                file={member.photo}
                existingUrl={member.photo_url}
                isRemoved={member.photo_remove}
                onFileChange={(f) => onChange({ photo: f })}
                onRemoveExistingChange={(rm) => onChange({ photo_remove: rm })}
                error={errors[k('photo')]}
                aspect="square"
                size="sm"
            />
        </div>
    );
}

import { CreditCardIcon, UsersIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormActions from '@/pages/dashboard/_components/form-actions';
import ImagePicker from '@/pages/dashboard/_components/image-picker';
import TranslatableInput from '@/pages/dashboard/_components/translatable-input';
import FamilyItems from '@/pages/dashboard/memberships/_family-items';
import type {
    FamilyItem,
    RelationshipOption,
} from '@/pages/dashboard/memberships/_family-items';

export interface MembershipFormData {
    membership_number: string;
    registration_date: string;
    expiration_date: string;
    is_active: boolean;
    is_visible: boolean;
    job_title: { en: string; ar: string };
    photo: File | null;
    photo_url: string | null;
    photo_remove: boolean;
    family: FamilyItem[];
}

interface Props {
    data: MembershipFormData;
    setData: <K extends keyof MembershipFormData>(
        key: K,
        value: MembershipFormData[K],
    ) => void;
    submit: (e: FormEvent) => void;
    onSave: (intent: 'stay' | 'return') => void;
    onPersistFamily?: (family: FamilyItem[]) => Promise<void> | void;
    processing: boolean;
    errors: Record<string, string>;
    relationships: RelationshipOption[];
    primaryLabel?: string;
    cancelHref: string;
}

export default function MembershipForm({
    data,
    setData,
    submit,
    onSave,
    onPersistFamily,
    processing,
    errors,
    relationships,
    primaryLabel = 'حفظ',
    cancelHref,
}: Props) {
    const familyErrorCount = useMemo(
        () => Object.keys(errors).filter((k) => k.startsWith('family')).length,
        [errors],
    );
    const membershipErrorCount = useMemo(
        () => Object.keys(errors).filter((k) => !k.startsWith('family')).length,
        [errors],
    );

    const [tab, setTab] = useState<'membership' | 'family'>(() => {
        if (typeof window === 'undefined') {
            return 'membership';
        }

        return window.location.hash === '#family' ? 'family' : 'membership';
    });

    useEffect(() => {
        if (membershipErrorCount > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTab('membership');
        } else if (familyErrorCount > 0) {
            setTab('family');
        }
    }, [membershipErrorCount, familyErrorCount]);

    useEffect(() => {
        const desiredHash = tab === 'family' ? '#family' : '';

        if (window.location.hash !== desiredHash) {
            const { pathname, search } = window.location;
            window.history.replaceState(null, '', `${pathname}${search}${desiredHash}`);
        }
    }, [tab]);

    useEffect(() => {
        const onHashChange = () => {
            setTab(window.location.hash === '#family' ? 'family' : 'membership');
        };

        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    return (
        <form onSubmit={submit} className="w-full space-y-6" dir="rtl">
            <Tabs
                value={tab}
                onValueChange={(v) => setTab(v as 'membership' | 'family')}
                className="w-full"
            >
                <TabsList>
                    <TabsTrigger value="membership">
                        <CreditCardIcon className="size-4" />
                        العضوية
                        {membershipErrorCount > 0 && (
                            <span className="mr-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-white">
                                {membershipErrorCount}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="family">
                        <UsersIcon className="size-4" />
                        العائلة
                        <span className="mr-1 rounded-full bg-muted-foreground/20 px-1.5 py-0.5 text-[10px] font-semibold">
                            {data.family.filter((m) => !m._delete).length}
                        </span>
                        {familyErrorCount > 0 && (
                            <span className="mr-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-white">
                                {familyErrorCount}
                            </span>
                        )}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="membership" className="mt-4">
                    <section className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
                        <header>
                            <h3 className="font-heading text-lg font-semibold">
                                بيانات العضوية
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                رقم العضوية، الصلاحية، الحالة، والمسمى الوظيفي.
                            </p>
                        </header>

                        <div className="flex flex-col gap-6 md:flex-row md:items-start">
                            <ImagePicker
                                label="صورة العضوية"
                                file={data.photo}
                                existingUrl={data.photo_url}
                                isRemoved={data.photo_remove}
                                onFileChange={(f) => setData('photo', f)}
                                onRemoveExistingChange={(rm) =>
                                    setData('photo_remove', rm)
                                }
                                error={errors.photo}
                                aspect="square"
                                size="sm"
                            />

                            <div className="flex-1 space-y-4">
                                <div className="grid gap-2">
                                    <Label>
                                        رقم العضوية{' '}
                                        <span className="text-red-600">*</span>
                                    </Label>
                                    <Input
                                        dir="ltr"
                                        value={data.membership_number}
                                        onChange={(e) =>
                                            setData(
                                                'membership_number',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="MC-2026-0001"
                                    />
                                    <InputError
                                        message={errors.membership_number}
                                    />
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label>
                                            تاريخ التسجيل{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            type="date"
                                            value={data.registration_date}
                                            onChange={(e) =>
                                                setData(
                                                    'registration_date',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.registration_date}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>
                                            تاريخ الانتهاء{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            type="date"
                                            value={data.expiration_date}
                                            onChange={(e) =>
                                                setData(
                                                    'expiration_date',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.expiration_date}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <TranslatableInput
                            name="job_title"
                            label="المسمى الوظيفي"
                            values={data.job_title}
                            onChange={(locale, value) =>
                                setData('job_title', {
                                    ...data.job_title,
                                    [locale]: value,
                                })
                            }
                            errors={errors}
                        />

                        <div className="grid gap-3 md:grid-cols-2">
                            <label className="flex cursor-pointer items-start gap-3 rounded-xl border bg-muted/20 px-4 py-3">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData('is_active', e.target.checked)
                                    }
                                    className="mt-1 size-4 rounded border-input"
                                />
                                <span className="space-y-0.5">
                                    <span className="block text-sm font-medium">
                                        مفعّلة
                                    </span>
                                    <span className="block text-xs text-muted-foreground">
                                        هل يمكن استخدام هذه العضوية حالياً.
                                    </span>
                                </span>
                            </label>
                            <label className="flex cursor-pointer items-start gap-3 rounded-xl border bg-muted/20 px-4 py-3">
                                <input
                                    type="checkbox"
                                    checked={data.is_visible}
                                    onChange={(e) =>
                                        setData('is_visible', e.target.checked)
                                    }
                                    className="mt-1 size-4 rounded border-input"
                                />
                                <span className="space-y-0.5">
                                    <span className="block text-sm font-medium">
                                        ظاهرة
                                    </span>
                                    <span className="block text-xs text-muted-foreground">
                                        هل تظهر هذه العضوية على الموقع العام.
                                    </span>
                                </span>
                            </label>
                        </div>
                    </section>
                </TabsContent>

                <TabsContent value="family" className="mt-4">
                    <section className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
                        <FamilyItems
                            family={data.family}
                            relationships={relationships}
                            onChange={(f) => setData('family', f)}
                            onPersist={onPersistFamily}
                            errors={errors}
                        />
                    </section>
                </TabsContent>
            </Tabs>

            <FormActions
                processing={processing}
                cancelHref={cancelHref}
                onSave={onSave}
                primaryLabel={primaryLabel}
            />
        </form>
    );
}

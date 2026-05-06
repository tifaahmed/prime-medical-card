import { CreditCardIcon, UsersIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    processing: boolean;
    errors: Record<string, string>;
    relationships: RelationshipOption[];
    submitLabel: string;
    cancelHref: string;
}

export default function MembershipForm({
    data,
    setData,
    submit,
    processing,
    errors,
    relationships,
    submitLabel,
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

    const [tab, setTab] = useState<'membership' | 'family'>('membership');

    useEffect(() => {
        if (membershipErrorCount > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTab('membership');
        } else if (familyErrorCount > 0) {
            setTab('family');
        }
    }, [membershipErrorCount, familyErrorCount]);

    return (
        <form onSubmit={submit} className="w-full space-y-6">
            <Tabs
                value={tab}
                onValueChange={(v) => setTab(v as 'membership' | 'family')}
                className="w-full"
            >
                <TabsList>
                    <TabsTrigger value="membership">
                        <CreditCardIcon className="size-4" />
                        Membership
                        {membershipErrorCount > 0 && (
                            <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-white">
                                {membershipErrorCount}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="family">
                        <UsersIcon className="size-4" />
                        Family
                        <span className="ml-1 rounded-full bg-muted-foreground/20 px-1.5 py-0.5 text-[10px] font-semibold">
                            {data.family.filter((m) => !m._delete).length}
                        </span>
                        {familyErrorCount > 0 && (
                            <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-white">
                                {familyErrorCount}
                            </span>
                        )}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="membership" className="mt-4">
                    <section className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
                        <header>
                            <h3 className="font-heading text-lg font-semibold">
                                Membership details
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Membership number, validity, status, and
                                bilingual job title.
                            </p>
                        </header>

                        <div className="flex flex-col gap-6 md:flex-row md:items-start">
                            <ImagePicker
                                label="Membership photo"
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
                                        Membership number{' '}
                                        <span className="text-red-600">*</span>
                                    </Label>
                                    <Input
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
                                            Registration date{' '}
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
                                            Expiration date{' '}
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
                            label="Job title"
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
                                        Active
                                    </span>
                                    <span className="block text-xs text-muted-foreground">
                                        Whether this membership can be used
                                        right now.
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
                                        Visible
                                    </span>
                                    <span className="block text-xs text-muted-foreground">
                                        Whether this membership is shown on the
                                        public website.
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
                            errors={errors}
                        />
                    </section>
                </TabsContent>
            </Tabs>

            <div className="flex gap-2">
                <Button type="submit" disabled={processing}>
                    {submitLabel}
                </Button>
                <Button asChild variant="outline" type="button">
                    <a href={cancelHref}>Cancel</a>
                </Button>
            </div>
        </form>
    );
}

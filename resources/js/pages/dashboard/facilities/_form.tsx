import { Building2, PhoneIcon, StoreIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormActions from '@/pages/dashboard/_components/form-actions';
import ImagePicker from '@/pages/dashboard/_components/image-picker';
import TranslatableInput from '@/pages/dashboard/_components/translatable-input';
import BranchItems from '@/pages/dashboard/facilities/_branch-items';
import type { BranchItem } from '@/pages/dashboard/facilities/_branch-items';

export interface RelatedOption {
    id: number;
    name: { en: string; ar: string };
    governorate_id?: number;
}

export interface FacilityFormData {
    name: { en: string; ar: string };
    facility_type_id: number | string;
    phone: string;
    logo: File | null;
    logo_url: string | null;
    logo_remove: boolean;
    branches: BranchItem[];
}

interface Props {
    data: FacilityFormData;
    setData: <K extends keyof FacilityFormData>(
        key: K,
        value: FacilityFormData[K],
    ) => void;
    submit: (e: FormEvent) => void;
    onSave: (intent: 'stay' | 'return') => void;
    onPersistBranches?: (branches: BranchItem[]) => Promise<void> | void;
    processing: boolean;
    errors: Record<string, string>;
    facilityTypes: RelatedOption[];
    governorates: RelatedOption[];
    cities: RelatedOption[];
    primaryLabel?: string;
    cancelHref: string;
}

export default function FacilityForm({
    data,
    setData,
    submit,
    onSave,
    onPersistBranches,
    processing,
    errors,
    facilityTypes,
    governorates,
    cities,
    primaryLabel = 'حفظ',
    cancelHref,
}: Props) {
    const branchErrorCount = useMemo(
        () =>
            Object.keys(errors).filter((k) => k.startsWith('branches')).length,
        [errors],
    );
    const facilityErrorCount = useMemo(
        () =>
            Object.keys(errors).filter((k) => !k.startsWith('branches')).length,
        [errors],
    );

    const [tab, setTab] = useState<'facility' | 'branches'>('facility');

    useEffect(() => {
        if (facilityErrorCount > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTab('facility');
        } else if (branchErrorCount > 0) {
            setTab('branches');
        }
    }, [facilityErrorCount, branchErrorCount]);

    return (
        <form onSubmit={submit} className="w-full space-y-6" dir="rtl">
            <Tabs
                value={tab}
                onValueChange={(v) => setTab(v as 'facility' | 'branches')}
                className="w-full"
            >
                <TabsList>
                    <TabsTrigger value="facility">
                        <Building2 className="size-4" />
                        المنشأة
                        {facilityErrorCount > 0 && (
                            <span className="mr-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-white">
                                {facilityErrorCount}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="branches">
                        <StoreIcon className="size-4" />
                        الفروع
                        <span className="mr-1 rounded-full bg-muted-foreground/20 px-1.5 py-0.5 text-[10px] font-semibold">
                            {data.branches.filter((b) => !b._delete).length}
                        </span>
                        {branchErrorCount > 0 && (
                            <span className="mr-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-white">
                                {branchErrorCount}
                            </span>
                        )}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="facility" className="mt-4">
                    <section className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
                        <header>
                            <h3 className="font-heading text-lg font-semibold">
                                بيانات المنشأة
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                الاسم، التصنيف، ومعلومات التواصل.
                            </p>
                        </header>

                        <TranslatableInput
                            name="name"
                            label="الاسم"
                            values={data.name}
                            onChange={(locale, value) =>
                                setData('name', {
                                    ...data.name,
                                    [locale]: value,
                                })
                            }
                            errors={errors}
                            required
                        />

                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label>
                                    نوع المنشأة{' '}
                                    <span className="text-red-600">*</span>
                                </Label>
                                <Select
                                    value={String(data.facility_type_id || '')}
                                    onValueChange={(v) =>
                                        setData('facility_type_id', Number(v))
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="اختر النوع…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {facilityTypes.map((t) => (
                                            <SelectItem
                                                key={t.id}
                                                value={String(t.id)}
                                            >
                                                <span dir="rtl">
                                                    {t.name.ar || t.name.en}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.facility_type_id} />
                            </div>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label>رقم الهاتف</Label>
                                <div className="relative">
                                    <PhoneIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        value={data.phone ?? ''}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        placeholder="+20 1xx xxx xxxx"
                                        className="pr-9"
                                    />
                                </div>
                                <InputError message={errors.phone} />
                            </div>

                            <ImagePicker
                                label="الشعار"
                                file={data.logo}
                                existingUrl={data.logo_url}
                                isRemoved={data.logo_remove}
                                onFileChange={(f) => setData('logo', f)}
                                onRemoveExistingChange={(rm) =>
                                    setData('logo_remove', rm)
                                }
                                error={errors.logo}
                                aspect="square"
                            />
                        </div>
                    </section>
                </TabsContent>

                <TabsContent value="branches" className="mt-4">
                    <section className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
                        <BranchItems
                            branches={data.branches}
                            onChange={(b) => setData('branches', b)}
                            onPersist={onPersistBranches}
                            errors={errors}
                            governorates={governorates}
                            cities={cities}
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

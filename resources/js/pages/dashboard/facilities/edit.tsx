import { Head, router, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import type { ExistingGalleryItem } from '@/pages/dashboard/_components/gallery-picker';
import type { BranchItem } from '@/pages/dashboard/facilities/_branch-items';
import FacilityForm from '@/pages/dashboard/facilities/_form';
import type { RelatedOption } from '@/pages/dashboard/facilities/_form';
import { dashboard } from '@/routes';

interface FacilityBranchPayload {
    id: number;
    name: { en: string; ar: string };
    address: { en: string; ar: string };
    phone: string[];
    latitude: number | null;
    longitude: number | null;
    header_url: string | null;
    gallery: ExistingGalleryItem[];
}

interface Facility {
    id: number;
    slug: string;
    facility_type_id: number;
    governorate_id: number;
    name: { en: string; ar: string };
    phone: string | null;
    logo_url: string | null;
    branches: FacilityBranchPayload[];
}

export default function FacilityEdit({
    facility,
    facilityTypes,
    governorates,
}: {
    facility: Facility;
    facilityTypes: RelatedOption[];
    governorates: RelatedOption[];
}) {
    const { data, setData, processing, errors } = useForm({
        name: facility.name,
        facility_type_id: facility.facility_type_id as number | string,
        governorate_id: facility.governorate_id as number | string,
        phone: facility.phone ?? '',
        logo: null as File | null,
        logo_url: facility.logo_url,
        logo_remove: false,
        branches: facility.branches.map<BranchItem>((b) => ({
            id: b.id,
            name: b.name,
            address: b.address,
            phone: b.phone ?? [],
            latitude: b.latitude ?? '',
            longitude: b.longitude ?? '',
            header_url: b.header_url,
            header: null,
            header_remove: false,
            gallery: b.gallery ?? [],
            gallery_files: [],
            gallery_remove: [],
        })),
    });

    const persist = (
        intent: 'stay' | 'return',
        overrides?: { branches?: BranchItem[] },
    ) => {
        const payload = { ...data, ...overrides, _method: 'put' };
        router.post(
            `/dashboard/facilities/${facility.id}?redirect=${intent}`,
            payload as never,
            { forceFormData: true },
        );
    };

    const save = (intent: 'stay' | 'return') => persist(intent);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title={`Edit ${facility.slug}`} />
            <div className="w-full space-y-6 p-6">
                <Heading
                    title="Edit Facility"
                    description={`Slug: ${facility.slug}`}
                />
                <FacilityForm
                    data={data}
                    setData={setData as never}
                    submit={submit}
                    onSave={save}
                    onPersistBranches={(branches) =>
                        persist('stay', { branches })
                    }
                    processing={processing}
                    errors={errors as Record<string, string>}
                    facilityTypes={facilityTypes}
                    governorates={governorates}
                    cancelHref="/dashboard/facilities"
                />
            </div>
        </>
    );
}

FacilityEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Facilities', href: '/dashboard/facilities' },
        { title: 'Edit', href: '#' },
    ],
};

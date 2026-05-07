import { Head, router, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import type {
    FamilyItem,
    RelationshipOption,
} from '@/pages/dashboard/memberships/_family-items';
import MembershipForm from '@/pages/dashboard/memberships/_form';
import { dashboard } from '@/routes';

interface FamilyMemberPayload {
    id: number;
    name: string;
    relationship: string | null;
    date_of_birth: string | null;
    phone: string | null;
    email: string | null;
    is_active: boolean;
    photo_url: string | null;
}

interface Membership {
    id: number;
    slug: string;
    membership_number: string;
    registration_date: string;
    expiration_date: string;
    is_active: boolean;
    is_visible: boolean;
    job_title: { en: string; ar: string };
    photo_url: string | null;
    family: FamilyMemberPayload[];
}

export default function MembershipEdit({
    membership,
    relationships,
}: {
    membership: Membership;
    relationships: RelationshipOption[];
}) {
    const { data, setData, processing, errors } = useForm({
        membership_number: membership.membership_number,
        registration_date: membership.registration_date,
        expiration_date: membership.expiration_date,
        is_active: membership.is_active,
        is_visible: membership.is_visible,
        job_title: membership.job_title,
        photo: null as File | null,
        photo_url: membership.photo_url,
        photo_remove: false,
        family: membership.family.map<FamilyItem>((f) => ({
            id: f.id,
            name: f.name ?? '',
            relationship: f.relationship ?? '',
            date_of_birth: f.date_of_birth ?? '',
            phone: f.phone ?? '',
            email: f.email ?? '',
            is_active: f.is_active,
            photo: null,
            photo_url: f.photo_url,
            photo_remove: false,
        })),
    });

    const persist = (
        intent: 'stay' | 'return',
        overrides?: { family?: FamilyItem[] },
    ) => {
        const payload = { ...data, ...overrides, _method: 'put' };
        router.post(
            `/dashboard/memberships/${membership.id}?redirect=${intent}`,
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
            <Head title={`Edit ${membership.membership_number}`} />
            <div className="w-full space-y-6 p-6">
                <Heading
                    title="Edit Membership"
                    description={`Number: ${membership.membership_number}`}
                />
                <MembershipForm
                    data={data}
                    setData={setData as never}
                    submit={submit}
                    onSave={save}
                    onPersistFamily={(family) =>
                        persist('stay', { family })
                    }
                    processing={processing}
                    errors={errors as Record<string, string>}
                    relationships={relationships}
                    cancelHref="/dashboard/memberships"
                />
            </div>
        </>
    );
}

MembershipEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Memberships', href: '/dashboard/memberships' },
        { title: 'Edit', href: '#' },
    ],
};

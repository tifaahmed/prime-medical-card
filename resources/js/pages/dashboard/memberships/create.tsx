import { Head, useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import type {
    FamilyItem,
    RelationshipOption,
} from '@/pages/dashboard/memberships/_family-items';
import MembershipForm from '@/pages/dashboard/memberships/_form';
import { dashboard } from '@/routes';

export default function MembershipCreate({
    relationships,
}: {
    relationships: RelationshipOption[];
}) {
    const { today, nextYear } = useMemo(() => {
        // eslint-disable-next-line react-hooks/purity
        const now = Date.now();

        return {
            today: new Date(now).toISOString().slice(0, 10),
            nextYear: new Date(now + 365 * 24 * 60 * 60 * 1000)
                .toISOString()
                .slice(0, 10),
        };
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        membership_number: '',
        registration_date: today,
        expiration_date: nextYear,
        is_active: true,
        is_visible: true,
        job_title: { en: '', ar: '' },
        photo: null as File | null,
        photo_url: null as string | null,
        photo_remove: false,
        family: [] as FamilyItem[],
    });

    const save = (intent: 'stay' | 'return') => {
        post(`/dashboard/memberships?redirect=${intent}`, {
            forceFormData: true,
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="عضوية جديدة" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="عضوية جديدة"
                    description="إنشاء عضوية مع إمكانية إضافة أفراد العائلة."
                />
                <MembershipForm
                    data={data}
                    setData={setData as never}
                    submit={submit}
                    onSave={save}
                    processing={processing}
                    errors={errors as Record<string, string>}
                    relationships={relationships}
                    primaryLabel="إنشاء"
                    cancelHref="/dashboard/memberships"
                />
            </div>
        </>
    );
}

MembershipCreate.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'العضويات', href: '/dashboard/memberships' },
        { title: 'جديدة', href: '/dashboard/memberships/create' },
    ],
};

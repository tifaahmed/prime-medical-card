import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    LayersIcon,
    MapPinIcon,
    PencilIcon,
    PhoneIcon,
    PlusIcon,
    StoreIcon,
    TagIcon,
} from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

interface Translatable {
    en: string;
    ar: string;
}

interface GalleryImage {
    id: number;
    url: string;
}

interface Branch {
    id: number;
    slug: string;
    name: Translatable;
    address: Translatable;
    phone: string[];
    latitude: number | null;
    longitude: number | null;
    header_url: string | null;
    gallery: GalleryImage[];
    governorate: { id: number; name: Translatable } | null;
    city: { id: number; name: Translatable } | null;
}

interface Offer {
    id: number;
    slug: string;
    title: Translatable;
    price: string | number | null;
    old_price: string | number | null;
}

interface Facility {
    id: number;
    slug: string;
    name: Translatable;
    phone: string | null;
    logo_url: string | null;
    facility_type: { id: number; name: Translatable } | null;
    created_at: string | null;
    branches: Branch[];
    offers: Offer[];
}

function MetaCard({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Building2;
    label: string;
    value: string | null | undefined;
}) {
    return (
        <div className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary-dark">
                <Icon className="size-4" />
            </div>
            <div className="space-y-0.5">
                <p className="text-[11px] font-semibold tracking-wider text-muted-foreground">
                    {label}
                </p>
                <p className="font-medium" dir="rtl">
                    {value ?? '—'}
                </p>
            </div>
        </div>
    );
}

export default function FacilityShow({ facility }: { facility: Facility }) {
    return (
        <>
            <Head title={facility.name.ar || facility.slug} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                        {facility.logo_url ? (
                            <img
                                src={facility.logo_url}
                                alt=""
                                className="size-16 rounded-2xl border bg-card object-cover shadow-sm"
                            />
                        ) : (
                            <div className="flex size-16 items-center justify-center rounded-2xl border bg-muted text-muted-foreground">
                                <Building2 className="size-6" />
                            </div>
                        )}
                        <Heading
                            title={facility.name.ar || facility.slug}
                            description={facility.slug}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href="/dashboard/facilities">عودة</Link>
                        </Button>
                        <Button asChild className="gap-1.5">
                            <Link
                                href={`/dashboard/facilities/${facility.id}/edit`}
                            >
                                <PencilIcon className="size-4" />
                                تعديل
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <MetaCard
                        icon={LayersIcon}
                        label="النوع"
                        value={facility.facility_type?.name.ar}
                    />
                    <MetaCard
                        icon={PhoneIcon}
                        label="رقم الهاتف"
                        value={facility.phone}
                    />
                    <MetaCard
                        icon={TagIcon}
                        label="المعرّف"
                        value={facility.slug}
                    />
                </div>

                <section className="rounded-3xl border bg-card shadow-sm">
                    <header className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-4">
                        <div className="flex items-center gap-2">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
                                <StoreIcon className="size-4" />
                            </span>
                            <h3 className="font-heading text-lg font-semibold">
                                الفروع
                            </h3>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                {facility.branches.length}
                            </span>
                        </div>
                        <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="btn-edit gap-1.5"
                        >
                            <Link
                                href={`/dashboard/facilities/${facility.id}/edit`}
                            >
                                <PlusIcon className="size-3.5" />
                                إدارة الفروع
                            </Link>
                        </Button>
                    </header>

                    {facility.branches.length === 0 ? (
                        <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                            لا توجد فروع لهذه المنشأة بعد.
                        </div>
                    ) : (
                        <ul className="divide-y">
                            {facility.branches.map((b) => (
                                <li key={b.id} className="space-y-3 px-5 py-5">
                                    {b.header_url && (
                                        <div className="overflow-hidden rounded-2xl border">
                                            <img
                                                src={b.header_url}
                                                alt=""
                                                className="aspect-[16/5] w-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div className="space-y-1">
                                            <p
                                                className="font-medium"
                                                dir="rtl"
                                            >
                                                {b.name.ar || (
                                                    <span className="text-muted-foreground">
                                                        فرع بدون اسم
                                                    </span>
                                                )}
                                            </p>
                                            {(b.governorate || b.city) && (
                                                <p
                                                    className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
                                                    dir="rtl"
                                                >
                                                    <MapPinIcon className="size-3.5" />
                                                    {[
                                                        b.governorate?.name.ar,
                                                        b.city?.name.ar,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(' · ')}
                                                </p>
                                            )}
                                            {(b.address.ar || b.address.en) && (
                                                <p
                                                    className="text-sm text-muted-foreground"
                                                    dir="rtl"
                                                >
                                                    {b.address.ar ||
                                                        b.address.en}
                                                </p>
                                            )}
                                            {b.phone.length > 0 && (
                                                <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                                    <PhoneIcon className="size-3.5" />
                                                    <span dir="ltr">
                                                        {b.phone.join(' · ')}
                                                    </span>
                                                </p>
                                            )}
                                            {b.latitude !== null &&
                                                b.longitude !== null && (
                                                    <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                                        <MapPinIcon className="size-3.5" />
                                                        <a
                                                            href={`https://www.google.com/maps?q=${b.latitude},${b.longitude}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-brand-secondary hover:underline"
                                                            dir="ltr"
                                                        >
                                                            {b.latitude},{' '}
                                                            {b.longitude}
                                                        </a>
                                                    </p>
                                                )}
                                        </div>
                                        <Button
                                            asChild
                                            size="sm"
                                            variant="outline"
                                            className="btn-edit gap-1.5"
                                        >
                                            <Link
                                                href={`/dashboard/facility-branches/${b.id}/edit`}
                                            >
                                                <PencilIcon className="size-3.5" />
                                                تعديل
                                            </Link>
                                        </Button>
                                    </div>
                                    {b.gallery.length > 0 && (
                                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                                            {b.gallery.map((g) => (
                                                <a
                                                    key={g.id}
                                                    href={g.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="overflow-hidden rounded-xl border bg-muted/30"
                                                >
                                                    <img
                                                        src={g.url}
                                                        alt=""
                                                        className="aspect-square w-full object-cover transition-transform duration-200 hover:scale-105"
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="rounded-3xl border bg-card shadow-sm">
                    <header className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-4">
                        <div className="flex items-center gap-2">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                                <TagIcon className="size-4" />
                            </span>
                            <h3 className="font-heading text-lg font-semibold">
                                العروض
                            </h3>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                {facility.offers.length}
                            </span>
                        </div>
                        <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="btn-edit gap-1.5"
                        >
                            <Link href="/dashboard/offers/create">
                                <PlusIcon className="size-3.5" />
                                إضافة عرض
                            </Link>
                        </Button>
                    </header>

                    {facility.offers.length === 0 ? (
                        <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                            لا توجد عروض لهذه المنشأة بعد.
                        </div>
                    ) : (
                        <ul className="divide-y">
                            {facility.offers.map((o) => (
                                <li
                                    key={o.id}
                                    className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                                >
                                    <div className="space-y-0.5">
                                        <p className="font-medium" dir="rtl">
                                            {o.title.ar || (
                                                <span className="text-muted-foreground">
                                                    بدون عنوان
                                                </span>
                                            )}
                                        </p>
                                        {o.price && (
                                            <p className="text-sm" dir="ltr">
                                                <span className="font-semibold">
                                                    {o.price}
                                                </span>
                                                {o.old_price && (
                                                    <span className="mr-2 text-xs text-muted-foreground line-through">
                                                        {o.old_price}
                                                    </span>
                                                )}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        asChild
                                        size="sm"
                                        variant="outline"
                                        className="btn-edit gap-1.5"
                                    >
                                        <Link
                                            href={`/dashboard/offers/${o.id}/edit`}
                                        >
                                            <PencilIcon className="size-3.5" />
                                            تعديل
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </>
    );
}

FacilityShow.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'المنشآت', href: '/dashboard/facilities' },
        { title: 'عرض', href: '#' },
    ],
};

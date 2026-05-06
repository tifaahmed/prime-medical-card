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
    governorate: { id: number; name: Translatable } | null;
    created_at: string | null;
    branches: Branch[];
    offers: Offer[];
}

function MetaCard({
    icon: Icon,
    label,
    value,
    valueAr,
}: {
    icon: typeof Building2;
    label: string;
    value: string | null | undefined;
    valueAr?: string | null;
}) {
    return (
        <div className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary-dark">
                <Icon className="size-4" />
            </div>
            <div className="space-y-0.5">
                <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {label}
                </p>
                <p className="font-medium">{value ?? '—'}</p>
                {valueAr && (
                    <p className="text-sm text-muted-foreground" dir="rtl">
                        {valueAr}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function FacilityShow({ facility }: { facility: Facility }) {
    return (
        <>
            <Head title={facility.name.en ?? facility.slug} />
            <div className="w-full space-y-6 p-6">
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
                            title={facility.name.en || facility.slug}
                            description={facility.name.ar || undefined}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href="/dashboard/facilities">Back</Link>
                        </Button>
                        <Button asChild className="gap-1.5">
                            <Link
                                href={`/dashboard/facilities/${facility.id}/edit`}
                            >
                                <PencilIcon className="size-4" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <MetaCard
                        icon={LayersIcon}
                        label="Type"
                        value={facility.facility_type?.name.en}
                        valueAr={facility.facility_type?.name.ar}
                    />
                    <MetaCard
                        icon={MapPinIcon}
                        label="Governorate"
                        value={facility.governorate?.name.en}
                        valueAr={facility.governorate?.name.ar}
                    />
                    <MetaCard
                        icon={PhoneIcon}
                        label="Phone"
                        value={facility.phone}
                    />
                    <MetaCard
                        icon={TagIcon}
                        label="Slug"
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
                                Branches
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
                                Manage Branches
                            </Link>
                        </Button>
                    </header>

                    {facility.branches.length === 0 ? (
                        <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                            No branches yet for this facility.
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
                                            <p className="font-medium">
                                                {b.name.en || (
                                                    <span className="text-muted-foreground">
                                                        Unnamed branch
                                                    </span>
                                                )}
                                                {b.name.ar && (
                                                    <span
                                                        className="ml-2 text-sm text-muted-foreground"
                                                        dir="rtl"
                                                    >
                                                        / {b.name.ar}
                                                    </span>
                                                )}
                                            </p>
                                            {(b.address.en || b.address.ar) && (
                                                <p className="text-sm text-muted-foreground">
                                                    {b.address.en}
                                                    {b.address.ar && (
                                                        <span
                                                            className="ml-2"
                                                            dir="rtl"
                                                        >
                                                            / {b.address.ar}
                                                        </span>
                                                    )}
                                                </p>
                                            )}
                                            {b.phone.length > 0 && (
                                                <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                                    <PhoneIcon className="size-3.5" />
                                                    {b.phone.join(' · ')}
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
                                                Edit
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
                                Offers
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
                                Add Offer
                            </Link>
                        </Button>
                    </header>

                    {facility.offers.length === 0 ? (
                        <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                            No offers yet for this facility.
                        </div>
                    ) : (
                        <ul className="divide-y">
                            {facility.offers.map((o) => (
                                <li
                                    key={o.id}
                                    className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                                >
                                    <div className="space-y-0.5">
                                        <p className="font-medium">
                                            {o.title.en || (
                                                <span className="text-muted-foreground">
                                                    Untitled
                                                </span>
                                            )}
                                            {o.title.ar && (
                                                <span
                                                    className="ml-2 text-sm text-muted-foreground"
                                                    dir="rtl"
                                                >
                                                    / {o.title.ar}
                                                </span>
                                            )}
                                        </p>
                                        {o.price && (
                                            <p className="text-sm">
                                                <span className="font-semibold">
                                                    {o.price}
                                                </span>
                                                {o.old_price && (
                                                    <span className="ml-2 text-xs text-muted-foreground line-through">
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
                                            Edit
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
        { title: 'Dashboard', href: dashboard() },
        { title: 'Facilities', href: '/dashboard/facilities' },
        { title: 'View', href: '#' },
    ],
};

import type {
    Partner,
    PartnerBranch,
    PartnerCategory,
} from '@/pages/guest/_data/partners';

export type DbBranch = {
    id: number;
    name: string;
    address: string;
    phone: string[];
    latitude: number | null;
    longitude: number | null;
    governorate: { id: number; name: string } | null;
    city: { id: number; name: string } | null;
};

export type Facility = {
    id: number;
    slug: string;
    name: string;
    phone: string | null;
    logo_url: string | null;
    facility_type: { id: number; name: string } | null;
    branches: DbBranch[];
};

const ACCENTS = [
    '#236b64',
    '#0b2e2c',
    '#1a544f',
    '#d68228',
    '#e8a84a',
    '#2e867e',
];

function facilityInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.slice(0, 2) ?? '';

    return first || name.slice(0, 2);
}

function uniqueGovsFromBranches(branches: DbBranch[]): string[] {
    const set = new Set<string>();
    branches.forEach((b) => {
        if (b.governorate?.name) {
            set.add(b.governorate.name);
        }
    });

    return Array.from(set);
}

export type FacilityPartner = Partner & {
    dbBranches: DbBranch[];
};

export function facilityToPartner(facility: Facility): FacilityPartner {
    const govs = uniqueGovsFromBranches(facility.branches);
    const govLabel =
        govs.length === 0
            ? 'متعدد'
            : govs.length === 1
              ? govs[0]
              : 'متعدد';
    const category = (facility.facility_type?.name ??
        'مستشفيات') as PartnerCategory;
    const firstBranchPhone = facility.branches[0]?.phone?.[0] ?? '';
    const phone = facility.phone ?? firstBranchPhone ?? '';
    const accent = ACCENTS[facility.id % ACCENTS.length];
    const locations: PartnerBranch[] = facility.branches.map((b) => ({
        name: b.name || (b.city?.name ?? 'فرع'),
        address:
            b.address ||
            [b.city?.name, b.governorate?.name].filter(Boolean).join('، '),
        phone: b.phone?.[0],
        mapQuery:
            [facility.name, b.city?.name, b.governorate?.name]
                .filter(Boolean)
                .join(' ') || undefined,
    }));

    return {
        id: facility.slug,
        name: facility.name,
        category,
        governorate: govLabel,
        branches: facility.branches.length,
        discount: '',
        description: facility.facility_type?.name
            ? `${facility.facility_type.name} — ${facility.branches.length} فرع`
            : `${facility.branches.length} فرع`,
        accent,
        initials: facilityInitials(facility.name),
        phone,
        whatsapp: phone || undefined,
        address: govs.join('، ') || undefined,
        subject: facility.facility_type?.name,
        image: facility.logo_url ?? undefined,
        locations,
        dbBranches: facility.branches,
    };
}

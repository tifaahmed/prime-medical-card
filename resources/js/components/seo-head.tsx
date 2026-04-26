import { Head, usePage } from '@inertiajs/react';

type JsonLd = Record<string, unknown>;

type SeoHeadProps = {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article' | 'profile';
    keywords?: string[];
    locale?: string;
    noindex?: boolean;
    canonical?: string;
    jsonLd?: JsonLd | JsonLd[];
    children?: React.ReactNode;
};

type SharedProps = {
    appUrl: string;
    currentUrl: string;
};

const DEFAULT_IMAGE = '/images/logos/logo-with-text.png';

export default function SeoHead({
    title,
    description,
    image,
    type = 'website',
    keywords,
    locale = 'ar_EG',
    noindex = false,
    canonical,
    jsonLd,
    children,
}: SeoHeadProps) {
    const { props } = usePage<SharedProps>();
    const appUrl = (props as SharedProps).appUrl ?? '';
    const currentUrl = (props as SharedProps).currentUrl ?? '/';

    const absolute = (path: string) =>
        /^https?:\/\//.test(path) ? path : `${appUrl}${path.startsWith('/') ? path : `/${path}`}`;

    const url = absolute(canonical ?? currentUrl);
    const ogImage = absolute(image ?? DEFAULT_IMAGE);
    const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

    return (
        <Head title={title}>
            <meta name="description" content={description} />
            {keywords && keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(', ')} />
            )}
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            <link rel="canonical" href={url} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:locale" content={locale} />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {ldArray.map((entry, i) => (
                <script
                    key={`ld-${i}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
                />
            ))}

            {children}
        </Head>
    );
}

export function organizationSchema(appUrl: string): JsonLd {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'برايم ميديكال كارد',
        alternateName: 'Prime Medical Card',
        url: appUrl,
        logo: `${appUrl}/images/logos/logo-with-text.png`,
        sameAs: [],
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: '+201156385251',
                contactType: 'customer service',
                areaServed: 'EG',
                availableLanguage: ['Arabic', 'English'],
            },
        ],
    };
}

export function breadcrumbSchema(
    appUrl: string,
    items: { name: string; path: string }[],
): JsonLd {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: `${appUrl}${item.path}`,
        })),
    };
}

export function medicalBusinessSchema(
    appUrl: string,
    partner: {
        name: string;
        category: string;
        phone: string;
        address?: string;
        governorate: string;
        path: string;
        image?: string;
    },
): JsonLd {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        name: partner.name,
        url: `${appUrl}${partner.path}`,
        image: partner.image
            ? partner.image.startsWith('http')
                ? partner.image
                : `${appUrl}${partner.image}`
            : `${appUrl}/images/logos/logo-with-text.png`,
        telephone: partner.phone,
        medicalSpecialty: partner.category,
        address: {
            '@type': 'PostalAddress',
            addressLocality: partner.governorate,
            addressRegion: partner.governorate,
            addressCountry: 'EG',
            streetAddress: partner.address ?? partner.governorate,
        },
    };
}

export function serviceSchema(
    appUrl: string,
    service: { name: string; description: string; path: string; image?: string },
): JsonLd {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: service.name,
        name: service.name,
        description: service.description,
        url: `${appUrl}${service.path}`,
        image: service.image
            ? service.image.startsWith('http')
                ? service.image
                : `${appUrl}${service.image}`
            : `${appUrl}/images/logos/logo-with-text.png`,
        provider: {
            '@type': 'Organization',
            name: 'برايم ميديكال كارد',
            url: appUrl,
        },
        areaServed: { '@type': 'Country', name: 'Egypt' },
    };
}

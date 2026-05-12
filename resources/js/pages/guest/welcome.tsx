import { usePage } from '@inertiajs/react';
import FloatingActions from '@/pages/guest/_components/floating-actions';
import FloatingLogos from '@/pages/guest/_components/floating-logos';
import SeoHead, {
    organizationSchema,
} from '@/pages/guest/_components/seo-head';
import type { PageSeoProp } from '@/pages/guest/_components/seo-head';
import AnnounceBar from '@/pages/guest/_components/home/announce-bar';
import CtaBanner from '@/pages/guest/_components/home/cta-banner';
import Faq from '@/pages/guest/_components/home/faq';
import Hero from '@/pages/guest/_components/home/hero';
import HowItWorks from '@/pages/guest/_components/home/how-it-works';
import MobileBottomNav from '@/pages/guest/_components/home/mobile-bottom-nav';
import PartnersMarquee from '@/pages/guest/_components/home/partners-marquee';
import Pricing from '@/pages/guest/_components/home/pricing';
import useRevealOnScroll from '@/pages/guest/_components/home/reveal-on-scroll';
import Services from '@/pages/guest/_components/home/services';
import SiteFooter from '@/pages/guest/_components/home/site-footer';
import SiteNav from '@/pages/guest/_components/home/site-nav';
import SpecialOffers from '@/pages/guest/_components/home/special-offers';
import { homeStyles } from '@/pages/guest/_components/home/styles';
import Testimonials from '@/pages/guest/_components/home/testimonials';

const FALLBACK_TITLE =
    'برايم ميديكال كارد — بطاقة الخصومات الطبية الأولى';
const FALLBACK_DESCRIPTION =
    'احصل على خصومات تصل إلى 70% في أكثر من 3000 عيادة وصيدلية ومعمل تحاليل. بطاقة واحدة لكل العائلة في كل محافظات مصر.';
const FALLBACK_KEYWORDS = [
    'برايم ميديكال كارد',
    'بطاقة طبية',
    'خصومات طبية',
    'تأمين طبي',
    'صيدليات',
    'تحاليل',
    'أشعة',
    'مستشفيات',
];

type FaqItem = { id: number; question: string; answer: string };
type TestimonialItem = {
    id: number;
    name: string;
    role: string | null;
    quote: string;
    avatar: string | null;
    is_featured: boolean;
};
type PricingPlanItem = {
    id: number;
    name: string;
    description: string | null;
    price: string;
    period: string | null;
    features: string[];
    badge: string | null;
    is_featured: boolean;
    cta_label: string;
    cta_variant: 'ghost' | 'amber' | 'primary';
};
type HomeServiceItem = {
    id: number;
    title: string;
    description: string | null;
    discount: string | null;
    icon_key: string;
};
type HomeStepItem = {
    id: number;
    title: string;
    description: string | null;
    icon_key: string;
};
type FeaturedOfferItem = {
    id: number;
    title: string;
    partner: string;
    description: string | null;
    discount: string | null;
    expires_text: string | null;
    tag: string | null;
    accent_color: string | null;
};

export default function Welcome({
    seo,
    faqs = [],
    testimonials = [],
    pricingPlans = [],
    homeServices = [],
    homeSteps = [],
    featuredOffers = [],
}: {
    seo?: PageSeoProp | null;
    faqs?: FaqItem[];
    testimonials?: TestimonialItem[];
    pricingPlans?: PricingPlanItem[];
    homeServices?: HomeServiceItem[];
    homeSteps?: HomeStepItem[];
    featuredOffers?: FeaturedOfferItem[];
}) {
    const { auth, appUrl } = usePage<{
        auth: { user: { name: string } | null };
        appUrl: string;
    }>().props;
    const authUser = auth?.user ?? null;

    useRevealOnScroll();

    return (
        <>
            <SeoHead
                title={seo?.title || FALLBACK_TITLE}
                description={seo?.description || FALLBACK_DESCRIPTION}
                keywords={
                    seo?.keywords?.length ? seo.keywords : FALLBACK_KEYWORDS
                }
                image={seo?.og_image_url ?? undefined}
                noindex={seo?.noindex ?? false}
                jsonLd={[
                    organizationSchema(appUrl ?? ''),
                    {
                        '@context': 'https://schema.org',
                        '@type': 'WebSite',
                        name: 'برايم ميديكال كارد',
                        url: appUrl ?? '',
                        inLanguage: 'ar-EG',
                        potentialAction: {
                            '@type': 'SearchAction',
                            target: `${appUrl ?? ''}/partners?query={search_term_string}`,
                            'query-input': 'required name=search_term_string',
                        },
                    },
                ]}
            >
            </SeoHead>
            <style dangerouslySetInnerHTML={{ __html: homeStyles }} />

            <div className="pm-home" dir="rtl" lang="ar">
                <FloatingLogos />
                <AnnounceBar />
                <SiteNav authUser={authUser} />
                <Hero />
                <SpecialOffers items={featuredOffers} />
                <PartnersMarquee />
                <HowItWorks items={homeSteps} />
                <Services items={homeServices} />
                <Pricing items={pricingPlans} />
                <Testimonials items={testimonials} />
                <Faq items={faqs} />
                <CtaBanner />
                <SiteFooter />
                <MobileBottomNav />
                <FloatingActions />
            </div>
        </>
    );
}

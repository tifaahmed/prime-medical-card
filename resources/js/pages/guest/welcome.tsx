import { usePage } from '@inertiajs/react';
import FloatingActions from '@/components/floating-actions';
import FloatingLogos from '@/components/floating-logos';
import SeoHead, { organizationSchema } from '@/components/seo-head';
import AnnounceBar from '@/components/home/announce-bar';
import CtaBanner from '@/components/home/cta-banner';
import Faq from '@/components/home/faq';
import Hero from '@/components/home/hero';
import HowItWorks from '@/components/home/how-it-works';
import MobileBottomNav from '@/components/home/mobile-bottom-nav';
import PartnersMarquee from '@/components/home/partners-marquee';
import Pricing from '@/components/home/pricing';
import useRevealOnScroll from '@/components/home/reveal-on-scroll';
import Services from '@/components/home/services';
import SiteFooter from '@/components/home/site-footer';
import SiteNav from '@/components/home/site-nav';
import SpecialOffers from '@/components/home/special-offers';
import { homeStyles } from '@/components/home/styles';
import Testimonials from '@/components/home/testimonials';

export default function Welcome() {
    const { auth, appUrl } = usePage<{
        auth: { user: { name: string } | null };
        appUrl: string;
    }>().props;
    const authUser = auth?.user ?? null;

    useRevealOnScroll();

    return (
        <>
            <SeoHead
                title="برايم ميديكال كارد — بطاقة الخصومات الطبية الأولى"
                description="احصل على خصومات تصل إلى 70% في أكثر من 3000 عيادة وصيدلية ومعمل تحاليل. بطاقة واحدة لكل العائلة في كل محافظات مصر."
                keywords={[
                    'برايم ميديكال كارد',
                    'بطاقة طبية',
                    'خصومات طبية',
                    'تأمين طبي',
                    'صيدليات',
                    'تحاليل',
                    'أشعة',
                    'مستشفيات',
                ]}
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
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&family=Tajawal:wght@300;400;500;700;800&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
            </SeoHead>
            <style dangerouslySetInnerHTML={{ __html: homeStyles }} />

            <div className="pm-home" dir="rtl" lang="ar">
                <FloatingLogos />
                <AnnounceBar />
                <SiteNav authUser={authUser} />
                <Hero />
                <SpecialOffers />
                <PartnersMarquee />
                <HowItWorks />
                <Services />
                <Pricing />
                <Testimonials />
                <Faq />
                <CtaBanner />
                <SiteFooter />
                <MobileBottomNav />
                <FloatingActions />
            </div>
        </>
    );
}

import { useMarqueeScroll } from './use-marquee-scroll';

type PartnerOffer = {
    name: string;
    type: string;
    discount: string;
    description: string;
    accent: string;
    initials: string;
};

const PARTNER_OFFERS: PartnerOffer[] = [
    {
        name: 'مستشفى السلام الدولي',
        type: 'مستشفى',
        discount: '٦٠٪',
        description: 'كشف، عمليات، وإقامة في جميع التخصصات.',
        accent: '#236b64',
        initials: 'سل',
    },
    {
        name: 'صيدليات العزبي',
        type: 'صيدلية',
        discount: '٢٥٪',
        description: 'خصم على الأدوية والمستلزمات الطبية.',
        accent: '#d68228',
        initials: 'عز',
    },
    {
        name: 'معامل البرج',
        type: 'تحاليل',
        discount: '٥٠٪',
        description: 'تحاليل عامة ومتخصصة بأسعار مخفّضة.',
        accent: '#1a544f',
        initials: 'بر',
    },
    {
        name: 'مستشفى دار الفؤاد',
        type: 'مستشفى',
        discount: '٤٠٪',
        description: 'استشارات، جراحات، وفحوصات شاملة.',
        accent: '#0b2e2c',
        initials: 'دف',
    },
    {
        name: 'صيدليات سيف',
        type: 'صيدلية',
        discount: '٢٠٪',
        description: 'منتجات العناية الشخصية والأدوية.',
        accent: '#e8a84a',
        initials: 'سف',
    },
    {
        name: 'معامل المختبر',
        type: 'تحاليل',
        discount: '٤٥٪',
        description: 'سحب عينات منزلي وتقارير سريعة.',
        accent: '#2e867e',
        initials: 'مخ',
    },
    {
        name: 'مستشفى كليوباترا',
        type: 'مستشفى',
        discount: '٣٥٪',
        description: 'وحدات عناية مركزة وأقسام تخصصية.',
        accent: '#7fb3ad',
        initials: 'كل',
    },
    {
        name: 'مركز المغربي للعيون',
        type: 'بصريات',
        discount: '٥٥٪',
        description: 'فحص نظر، نظارات، وعمليات تصحيح.',
        accent: '#d68228',
        initials: 'مغ',
    },
];

export default function PartnersMarquee() {
    const ref = useMarqueeScroll<HTMLDivElement>({ speed: 0.55 });
    const loopOffers = [...PARTNER_OFFERS, ...PARTNER_OFFERS];

    return (
        <section
            id="partners"
            className="relative z-[2] bg-[var(--teal-900)] py-16 sm:py-20"
        >
            <div className="container">
                <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
                    <span className="rounded-full bg-[rgba(247,242,234,0.08)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--amber-400)]">
                        عروض الشركاء
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-[var(--cream)] sm:text-4xl">
                        أحدث عروض الشركاء الطبيين
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[rgba(247,242,234,0.7)] sm:text-base">
                        مرر بمؤشر الفأرة فوق العروض لإيقافها مؤقتاً، أو اسحبها
                        لاستعراض كل الخصومات الحصرية.
                    </p>
                </div>
            </div>

            <div
                ref={ref}
                className="hide-scrollbar flex cursor-grab gap-4 overflow-x-auto px-6 pb-2 sm:gap-5 sm:px-10 [&.is-dragging]:cursor-grabbing [&.is-dragging>*]:pointer-events-none"
            >
                {loopOffers.map((offer, i) => (
                    <PartnerOfferCard key={`${offer.name}-${i}`} offer={offer} />
                ))}
            </div>

            <div className="container mt-8 flex items-center justify-center gap-2 text-xs text-[rgba(247,242,234,0.55)]">
                <DragHintIcon />
                <span>اسحب يميناً ويساراً لاستعراض كل العروض</span>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `.hide-scrollbar { scrollbar-width: none; }
                    .hide-scrollbar::-webkit-scrollbar { display: none; }`,
                }}
            />
        </section>
    );
}

function PartnerOfferCard({ offer }: { offer: PartnerOffer }) {
    return (
        <article
            className="group relative flex w-[260px] shrink-0 snap-start flex-col gap-4 rounded-3xl bg-[var(--cream)] p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.55)] sm:w-[280px] sm:p-6"
        >
            <div className="flex items-center justify-between gap-3">
                <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold text-white"
                    style={{ background: offer.accent }}
                >
                    {offer.initials}
                </div>
                <span className="rounded-full bg-[var(--teal-900)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--amber-400)]">
                    {offer.type}
                </span>
            </div>

            <div>
                <h3 className="text-base font-bold text-[var(--teal-900)]">
                    {offer.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {offer.description}
                </p>
            </div>

            <div className="mt-auto flex items-end justify-between border-t border-[rgba(11,46,44,0.1)] pt-4">
                <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
                        خصم يصل إلى
                    </div>
                    <div className="text-2xl font-extrabold text-[var(--amber-600)]">
                        {offer.discount}
                    </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--teal-700)] transition group-hover:text-[var(--teal-900)]">
                    تفاصيل العرض
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </span>
            </div>
        </article>
    );
}

function DragHintIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
        >
            <path d="M5 9l-3 3 3 3" />
            <path d="M9 5l3-3 3 3" />
            <path d="M15 19l-3 3-3-3" />
            <path d="M19 9l3 3-3 3" />
            <path d="M2 12h20" />
            <path d="M12 2v20" />
        </svg>
    );
}

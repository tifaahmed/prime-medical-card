import { useCallback } from 'react';
import { useSubscribeModal } from '@/components/subscribe-modal';
import { usePageContent } from '@/hooks/use-page-content';
import { useDragScroll } from './use-drag-scroll';

type SpecialOffer = {
    id: number;
    title: string;
    partner: string;
    description: string | null;
    discount: string | null;
    expires_text: string | null;
    tag: string | null;
    accent_color: string | null;
};

const DEFAULT_ACCENT = '#0b2e2c';

export default function SpecialOffers({
    items = [],
}: {
    items?: SpecialOffer[];
}) {
    const { open } = useSubscribeModal();
    const { ref: trackRef, handlers } = useDragScroll<HTMLDivElement>();
    const eyebrow = usePageContent('offers_header', 'eyebrow', 'عروض خاصة');
    const intro = usePageContent(
        'offers_header',
        'paragraph',
        'خصومات حصرية لأعضاء برايم ميديكال كارد على الباقات الأكثر طلباً من شركائنا الطبيين، صالحة لفترة محدودة.',
    );
    const ctaHeading = usePageContent(
        'offers_cta',
        'heading',
        'احصل على كل العروض ببطاقة واحدة',
    );
    const ctaParagraph = usePageContent(
        'offers_cta',
        'paragraph',
        'اشترك اليوم واستفد فوراً من جميع الخصومات لدى أكثر من ٣٠٠٠ شريك طبي معتمد.',
    );

    const scrollByCard = useCallback(
        (direction: 1 | -1) => {
            const el = trackRef.current;
            if (!el) {
                return;
            }
            const card = el.firstElementChild as HTMLElement | null;
            if (!card) {
                return;
            }
            const styles = getComputedStyle(el);
            const gap = parseFloat(styles.columnGap || '0') || 0;
            const step = card.getBoundingClientRect().width + gap;
            const isRTL = styles.direction === 'rtl';
            el.scrollBy({
                left: (isRTL ? -1 : 1) * direction * step,
                behavior: 'smooth',
            });
        },
        [trackRef],
    );

    if (items.length === 0) {
        return null;
    }

    return (
        <section id="offers" className="relative z-[2] py-16 sm:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--amber-100)] px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[var(--amber-600)] uppercase">
                        <SparkleIcon />
                        {eyebrow}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-[var(--teal-900)] sm:text-4xl lg:text-5xl">
                        عروض هذا الشهر{' '}
                        <em className="font-serif text-[var(--amber-600)]">
                            لا تفوتها
                        </em>
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
                        {intro}
                    </p>
                </div>

                <div className="relative mt-12">
                    <div
                        ref={trackRef}
                        {...handlers}
                        className="hide-scrollbar flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [&.is-dragging]:cursor-grabbing [&.is-dragging>*]:pointer-events-none"
                    >
                        {items.map((offer) => (
                            <div
                                key={offer.id}
                                className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]"
                            >
                                <OfferCard offer={offer} />
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => scrollByCard(-1)}
                            aria-label="السابق"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(11,46,44,0.15)] bg-white text-[var(--teal-900)] shadow-sm transition hover:border-[var(--teal-900)] hover:bg-[var(--teal-900)] hover:text-[var(--cream)]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M9 6l6 6-6 6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollByCard(1)}
                            aria-label="التالي"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(11,46,44,0.15)] bg-white text-[var(--teal-900)] shadow-sm transition hover:border-[var(--teal-900)] hover:bg-[var(--teal-900)] hover:text-[var(--cream)]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M15 6l-6 6 6 6" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-3xl bg-[var(--teal-900)] p-8 text-center sm:flex-row sm:gap-6 sm:text-start">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-[var(--cream)] sm:text-2xl">
                            {ctaHeading}
                        </h3>
                        <p className="mt-2 text-sm text-[rgba(247,242,234,0.75)]">
                            {ctaParagraph}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={open}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--amber-500)] px-6 py-3 text-sm font-semibold text-[var(--teal-900)] transition hover:bg-[var(--amber-400)]"
                    >
                        اشترك الآن
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
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

function OfferCard({ offer }: { offer: SpecialOffer }) {
    const { open } = useSubscribeModal();
    const accent = offer.accent_color || DEFAULT_ACCENT;

    return (
        <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(11,46,44,0.5)] transition hover:-translate-y-1 hover:shadow-[0_28px_55px_-30px_rgba(11,46,44,0.6)]">
            <div
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ background: accent }}
            />

            <div className="flex items-center justify-between gap-2">
                {offer.tag && (
                    <span
                        className="rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider text-white uppercase"
                        style={{ background: accent }}
                    >
                        {offer.tag}
                    </span>
                )}
                {offer.expires_text && (
                    <span className="text-xs text-[var(--ink-soft)]">
                        {offer.expires_text}
                    </span>
                )}
            </div>

            <div>
                <h3 className="text-lg font-bold text-[var(--teal-900)]">
                    {offer.title}
                </h3>
                <div className="mt-1 text-xs font-semibold text-[var(--teal-600)]">
                    {offer.partner}
                </div>
                {offer.description && (
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                        {offer.description}
                    </p>
                )}
            </div>

            <div className="mt-auto flex items-end justify-between border-t border-[rgba(11,46,44,0.08)] pt-4">
                <div>
                    <div className="text-[11px] font-semibold tracking-wider text-[var(--ink-soft)] uppercase">
                        خصم
                    </div>
                    {offer.discount && (
                        <div className="text-3xl font-extrabold text-[var(--amber-600)]">
                            {offer.discount}
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    onClick={open}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--teal-700)] transition group-hover:text-[var(--teal-900)]"
                >
                    احجز الآن
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
                </button>
            </div>
        </article>
    );
}

function SparkleIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M12 2l2.4 6.4L21 11l-6.6 2.6L12 20l-2.4-6.4L3 11l6.6-2.6z" />
        </svg>
    );
}

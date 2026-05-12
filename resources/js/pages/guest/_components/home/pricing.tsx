import { useEffect } from 'react';
import { useSubscribeModal } from '@/components/subscribe-modal';
import { usePageContent } from '@/hooks/use-page-content';
import { CheckIcon } from './icons';
import { useDragScroll } from './use-drag-scroll';

type Plan = {
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

function PricingCard({ plan }: { plan: Plan }) {
    const { open } = useSubscribeModal();

    return (
        <div className={'plan ' + (plan.is_featured ? 'plan-featured' : '')}>
            {plan.badge && <div className="plan-badge">{plan.badge}</div>}
            <div className="plan-name">{plan.name}</div>
            {plan.description && (
                <div className="plan-desc">{plan.description}</div>
            )}
            <div className="plan-pricing">
                <span className="plan-price">{plan.price}</span>
                <span className="plan-currency">ج.م</span>
            </div>
            {plan.period && <div className="plan-period">{plan.period}</div>}

            <ul className="plan-features">
                {plan.features.map((f) => (
                    <li key={f}>
                        <CheckIcon />
                        <span>{f}</span>
                    </li>
                ))}
            </ul>

            <button
                type="button"
                onClick={open}
                className={`btn btn-${plan.cta_variant}`}
            >
                {plan.cta_label}
            </button>
        </div>
    );
}

export default function Pricing({ items = [] }: { items?: Plan[] }) {
    const { ref: gridRef, handlers } = useDragScroll<HTMLDivElement>();
    const eyebrow = usePageContent('pricing_header', 'eyebrow', 'باقاتنا');
    const paragraph = usePageContent(
        'pricing_header',
        'paragraph',
        'باقات مرنة بأسعار مناسبة — اشترك شهرياً أو سنوياً ووفر أكثر، بدون التزامات خفية',
    );

    useEffect(() => {
        const el = gridRef.current;

        if (!el) {
            return;
        }

        if (!window.matchMedia('(max-width: 560px)').matches) {
            return;
        }

        const featured = el.querySelector<HTMLElement>('.plan-featured');

        if (!featured) {
            return;
        }

        const gridRect = el.getBoundingClientRect();
        const cardRect = featured.getBoundingClientRect();
        const delta =
            cardRect.left +
            cardRect.width / 2 -
            (gridRect.left + gridRect.width / 2);
        el.scrollLeft += delta;
    }, [gridRef, items.length]);

    if (items.length === 0) {
        return null;
    }

    return (
        <section id="pricing">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">{eyebrow}</span>
                    <h2>
                        اختر الباقة التي تناسب
                        <br />
                        <em>عائلتك</em>
                    </h2>
                    <p>{paragraph}</p>
                </div>

                <div ref={gridRef} className="pricing-grid" {...handlers}>
                    {items.map((p) => (
                        <PricingCard plan={p} key={p.id} />
                    ))}
                </div>
            </div>
        </section>
    );
}

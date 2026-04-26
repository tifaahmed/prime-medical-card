import { useEffect } from 'react';
import { useSubscribeModal } from '@/components/subscribe-modal';
import { CheckIcon } from './icons';
import { useDragScroll } from './use-drag-scroll';

type Plan = {
    name: string;
    desc: string;
    price: string;
    period: string;
    features: string[];
    featured?: boolean;
    badge?: string;
    cta: { label: string; variant: 'ghost' | 'amber' | 'primary' };
};

const PLANS: Plan[] = [
    {
        name: 'الباقة الفردية',
        desc: 'مثالية للأفراد الذين يبحثون عن تغطية شاملة',
        price: '٢٩٩',
        period: 'سنوياً / لشخص واحد',
        features: [
            'خصومات على جميع الخدمات الطبية',
            'الوصول إلى +٣٠٠٠ جهة طبية',
            'بطاقة رقمية على التطبيق',
            'دعم فني ٧ أيام في الأسبوع',
        ],
        cta: { label: 'اشترك الآن', variant: 'ghost' },
    },
    {
        name: 'الباقة العائلية',
        desc: 'لك ولأفراد عائلتك حتى ٥ أشخاص',
        price: '٥٩٩',
        period: 'سنوياً / للعائلة كاملة',
        featured: true,
        badge: 'الأكثر شعبية',
        features: [
            'كل مميزات الباقة الفردية',
            'تغطية حتى ٥ أفراد من الأسرة',
            'بطاقة لكل فرد من العائلة',
            'خصومات إضافية ١٠٪ على الأطفال',
            'استشارات طبية مجانية عن بُعد',
        ],
        cta: { label: 'اشترك الآن', variant: 'amber' },
    },
    {
        name: 'الباقة المميزة',
        desc: 'تجربة VIP مع خصومات حصرية وخدمات إضافية',
        price: '٩٩٩',
        period: 'سنوياً / للعائلة كاملة',
        features: [
            'كل مميزات الباقة العائلية',
            'تغطية حتى ٨ أفراد',
            'خصومات VIP حتى ٧٠٪',
            'حجز موعد مع طبيبك بأولوية',
            'مدير حساب شخصي',
        ],
        cta: { label: 'اشترك الآن', variant: 'primary' },
    },
];

function PricingCard({ plan }: { plan: Plan }) {
    const { open } = useSubscribeModal();

    return (
        <div className={'plan ' + (plan.featured ? 'plan-featured' : '')}>
            {plan.badge && <div className="plan-badge">{plan.badge}</div>}
            <div className="plan-name">{plan.name}</div>
            <div className="plan-desc">{plan.desc}</div>
            <div className="plan-pricing">
                <span className="plan-price">{plan.price}</span>
                <span className="plan-currency">ج.م</span>
            </div>
            <div className="plan-period">{plan.period}</div>

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
                className={`btn btn-${plan.cta.variant}`}
            >
                {plan.cta.label}
            </button>
        </div>
    );
}

export default function Pricing() {
    const { ref: gridRef, handlers } = useDragScroll<HTMLDivElement>();

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
    }, [gridRef]);

    return (
        <section id="pricing">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">باقاتنا</span>
                    <h2>
                        اختر الباقة التي تناسب
                        <br />
                        <em>عائلتك</em>
                    </h2>
                    <p>
                        باقات مرنة بأسعار مناسبة — اشترك شهرياً أو سنوياً ووفر
                        أكثر، بدون التزامات خفية
                    </p>
                </div>

                <div ref={gridRef} className="pricing-grid" {...handlers}>
                    {PLANS.map((p) => (
                        <PricingCard plan={p} key={p.name} />
                    ))}
                </div>
            </div>
        </section>
    );
}

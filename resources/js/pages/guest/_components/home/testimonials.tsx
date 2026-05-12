import { usePageContent } from '@/hooks/use-page-content';
import { useDragScroll } from './use-drag-scroll';

type Testimonial = {
    id: number;
    name: string;
    role: string | null;
    quote: string;
    avatar: string | null;
    is_featured: boolean;
};

function TestimonialCard({ t }: { t: Testimonial }) {
    return (
        <div className={'testimonial ' + (t.is_featured ? 'testimonial-big' : '')}>
            <span className="quote-mark">&ldquo;</span>
            <blockquote>{t.quote}</blockquote>
            <div className="t-author">
                {t.avatar && <div className="t-avatar">{t.avatar}</div>}
                <div>
                    <div className="t-name">{t.name}</div>
                    {t.role && <div className="t-role">{t.role}</div>}
                </div>
            </div>
        </div>
    );
}

export default function Testimonials({
    items = [],
}: {
    items?: Testimonial[];
}) {
    const { ref: gridRef, handlers } = useDragScroll<HTMLDivElement>();
    const eyebrow = usePageContent(
        'testimonials_header',
        'eyebrow',
        'آراء الأعضاء',
    );
    const paragraph = usePageContent(
        'testimonials_header',
        'paragraph',
        'استمع إلى تجارب أعضائنا الحقيقية — قصص نجاح من كل محافظات الجمهورية',
    );

    if (items.length === 0) {
        return null;
    }

    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">{eyebrow}</span>
                    <h2>
                        أكثر من ١٢٠ ألف عائلة
                        <br />
                        <em>تثق بنا</em>
                    </h2>
                    <p>{paragraph}</p>
                </div>

                <div ref={gridRef} className="testimonials-grid" {...handlers}>
                    {items.map((t) => (
                        <TestimonialCard t={t} key={t.id} />
                    ))}
                </div>
            </div>
        </section>
    );
}

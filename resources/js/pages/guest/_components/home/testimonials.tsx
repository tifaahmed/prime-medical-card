import { useDragScroll } from './use-drag-scroll';

type Testimonial = {
    avatar: string;
    quote: string;
    name: string;
    role: string;
    featured?: boolean;
};

const TESTIMONIALS: Testimonial[] = [
    {
        featured: true,
        avatar: 'أم',
        quote: 'اشتركت في الباقة العائلية من سنتين والصراحة ما ندمتش. وفرت على عائلتي آلاف الجنيهات في العلاج والتحاليل والأدوية. خصوصاً لما بنتي محتاجة كشف أسنان، الخصم كان هائل. أفضل استثمار ممكن تعمله لصحة أسرتك.',
        name: 'أحمد مصطفى',
        role: 'القاهرة الجديدة — عضو منذ ٢٠٢٣',
    },
    {
        avatar: 'فس',
        quote: 'التطبيق سهل جداً وشبكة الأطباء ضخمة. في أي مكان بروح البطاقة مقبولة بدون مشاكل. الخصومات حقيقية مش زي شركات تانية.',
        name: 'فاطمة السيد',
        role: 'الجيزة',
    },
    {
        avatar: 'مع',
        quote: 'كعائلة فيها ٤ أطفال، الباقة العائلية غيرت حياتنا. الصيدلية عند البيت بيقبلوها والتحاليل بنص التمن. الدعم الفني محترم جداً.',
        name: 'محمد عبدالله',
        role: 'الإسكندرية',
    },
];

function TestimonialCard({ t }: { t: Testimonial }) {
    return (
        <div className={'testimonial ' + (t.featured ? 'testimonial-big' : '')}>
            <span className="quote-mark">&ldquo;</span>
            <blockquote>{t.quote}</blockquote>
            <div className="t-author">
                <div className="t-avatar">{t.avatar}</div>
                <div>
                    <div className="t-name">{t.name}</div>
                    <div className="t-role">{t.role}</div>
                </div>
            </div>
        </div>
    );
}

export default function Testimonials() {
    const { ref: gridRef, handlers } = useDragScroll<HTMLDivElement>();

    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">آراء الأعضاء</span>
                    <h2>
                        أكثر من ١٢٠ ألف عائلة
                        <br />
                        <em>تثق بنا</em>
                    </h2>
                    <p>
                        استمع إلى تجارب أعضائنا الحقيقية — قصص نجاح من كل
                        محافظات الجمهورية
                    </p>
                </div>

                <div ref={gridRef} className="testimonials-grid" {...handlers}>
                    {TESTIMONIALS.map((t) => (
                        <TestimonialCard t={t} key={t.name} />
                    ))}
                </div>
            </div>
        </section>
    );
}

import type { ReactNode } from 'react';
import { useDragScroll } from './use-drag-scroll';

type Service = {
    title: string;
    desc: string;
    discount: string;
    paths: ReactNode;
};

const SERVICES: Service[] = [
    {
        title: 'العيادات والمستشفيات',
        desc: 'كشف طبي وعمليات وإقامة في أفضل المستشفيات والعيادات التخصصية',
        discount: 'حتى ٦٠٪ خصم',
        paths: (
            <>
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
            </>
        ),
    },
    {
        title: 'الصيدليات',
        desc: 'خصومات على الأدوية والمستلزمات الطبية في أكبر شبكات الصيدليات',
        discount: 'حتى ٤٠٪ خصم',
        paths: (
            <>
                <path d="M10.5 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6" />
                <path d="M16 19h6" />
                <path d="M19 16v6" />
                <path d="M8 7v10" />
                <path d="M12 7v10" />
            </>
        ),
    },
    {
        title: 'معامل التحاليل',
        desc: 'جميع أنواع التحاليل الطبية والفحوصات المخبرية بأسعار مخفضة',
        discount: 'حتى ٥٠٪ خصم',
        paths: (
            <>
                <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                <path d="M8.5 2h7" />
                <path d="M7 16h10" />
            </>
        ),
    },
    {
        title: 'الأشعة والتصوير',
        desc: 'أشعة عادية ومقطعية ورنين مغناطيسي وسونار في أحدث المراكز',
        discount: 'حتى ٥٥٪ خصم',
        paths: (
            <>
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </>
        ),
    },
    {
        title: 'الأسنان',
        desc: 'تنظيف وحشو وزراعة وتقويم في أفضل مراكز الأسنان المتخصصة',
        discount: 'حتى ٧٠٪ خصم',
        paths: (
            <>
                <path d="M12 3c.53 0 1.039.211 1.414.586.375.375.586.884.586 1.414v0c0 .53-.211 1.039-.586 1.414C13.039 6.789 12.53 7 12 7s-1.039-.211-1.414-.586C10.211 6.039 10 5.53 10 5c0-.53.211-1.039.586-1.414C10.961 3.211 11.47 3 12 3z" />
                <path d="M19 10H5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h2.5L9 21h6l1.5-7H19a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2z" />
            </>
        ),
    },
    {
        title: 'البصريات',
        desc: 'فحص نظر ونظارات وعدسات لاصقة وعمليات تصحيح الإبصار',
        discount: 'حتى ٤٥٪ خصم',
        paths: (
            <>
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                <circle cx="12" cy="12" r="3" />
            </>
        ),
    },
    {
        title: 'الصحة النفسية',
        desc: 'جلسات علاج نفسي واستشارات مع أفضل الأطباء والمعالجين',
        discount: 'حتى ٤٠٪ خصم',
        paths: (
            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
        ),
    },
    {
        title: 'العلاج الطبيعي',
        desc: 'جلسات علاج طبيعي وإعادة تأهيل في أحدث المراكز المتخصصة',
        discount: 'حتى ٥٠٪ خصم',
        paths: (
            <>
                <path d="M6 2l.01 20" />
                <path d="M18 2l.01 20" />
                <path d="M2 6h20" />
                <path d="M2 18h20" />
            </>
        ),
    },
];

function ServiceCard({ service }: { service: Service }) {
    return (
        <div className="service">
            <div className="service-icon">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {service.paths}
                </svg>
            </div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <span className="service-discount">{service.discount}</span>
        </div>
    );
}

export default function Services() {
    const { ref: gridRef, handlers } = useDragScroll<HTMLDivElement>();

    return (
        <section id="services" className="services-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">شبكة شاملة</span>
                    <h2>
                        كل ما تحتاجه طبياً
                        <br />
                        <em>في مكان واحد</em>
                    </h2>
                    <p>
                        من الكشف الطبي إلى الأدوية والتحاليل والأشعة — بطاقة
                        واحدة تغطي كل احتياجات عائلتك الصحية
                    </p>
                </div>

                <div ref={gridRef} className="services-grid" {...handlers}>
                    {SERVICES.map((s) => (
                        <ServiceCard service={s} key={s.title} />
                    ))}
                </div>
            </div>
        </section>
    );
}

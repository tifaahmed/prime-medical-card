import { useSubscribeModal } from '@/components/subscribe-modal';
import { usePageContent } from '@/hooks/use-page-content';
import { useSiteSettings } from '@/hooks/use-site-settings';
import { ArrowLeftIcon } from './icons';

export default function CtaBanner() {
    const { open } = useSubscribeModal();
    const { hotline_number, hotline_caption } = useSiteSettings();
    const paragraph = usePageContent(
        'cta_banner',
        'paragraph',
        'انضم إلى أكثر من ١٢٠ ألف عائلة مصرية تثق بنا في رحلتهم الصحية — اشتراك سريع ومباشر وبدون تعقيدات',
    );
    const ctaPrimary = usePageContent(
        'cta_banner',
        'cta_primary',
        'احصل على بطاقتك الآن',
    );
    const ctaSecondary = usePageContent(
        'cta_banner',
        'cta_secondary',
        'اعرف المزيد',
    );
    const phoneLabel = usePageContent(
        'cta_banner',
        'phone_label',
        'أو اتصل بنا مباشرة',
    );

    return (
        <section className="cta-banner">
            <div className="container">
                <div className="cta-inner">
                    <div>
                        <h2>
                            صحة عائلتك تبدأ
                            <br />
                            <em>من بطاقة واحدة</em>
                        </h2>
                        <p>{paragraph}</p>
                        <div className="cta-actions">
                            <button
                                type="button"
                                onClick={open}
                                className="btn btn-amber"
                            >
                                {ctaPrimary}
                                <ArrowLeftIcon />
                            </button>
                            <a
                                href="#faq"
                                className="btn btn-ghost"
                                style={{
                                    color: 'var(--cream)',
                                    borderColor: 'var(--cream)',
                                }}
                            >
                                {ctaSecondary}
                            </a>
                        </div>
                    </div>
                    {hotline_number && (
                        <div className="cta-phone">
                            <div className="cta-phone-label">{phoneLabel}</div>
                            <div className="cta-phone-num">
                                {hotline_number}
                            </div>
                            {hotline_caption && (
                                <div className="cta-phone-label">
                                    {hotline_caption}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

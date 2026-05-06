import { useSubscribeModal } from '@/components/subscribe-modal';
import { ArrowLeftIcon } from './icons';

export default function CtaBanner() {
    const { open } = useSubscribeModal();

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
                        <p>
                            انضم إلى أكثر من ١٢٠ ألف عائلة مصرية تثق بنا في
                            رحلتهم الصحية — اشتراك سريع ومباشر وبدون تعقيدات
                        </p>
                        <div className="cta-actions">
                            <button
                                type="button"
                                onClick={open}
                                className="btn btn-amber"
                            >
                                احصل على بطاقتك الآن
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
                                اعرف المزيد
                            </a>
                        </div>
                    </div>
                    <div className="cta-phone">
                        <div className="cta-phone-label">
                            أو اتصل بنا مباشرة
                        </div>
                        <div className="cta-phone-num">16 777</div>
                        <div className="cta-phone-label">
                            ٢٤ ساعة يومياً — مكالمة مجانية
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

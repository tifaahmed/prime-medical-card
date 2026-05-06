import { useSubscribeModal } from '@/components/subscribe-modal';
import {
    ArrowLeftIcon,
    CheckShieldIcon,
    HeartIcon,
    PlayIcon,
    SavingsIcon,
} from './icons';
import OrbitingLogos from './orbiting-logos';

function MedicalCard({
    variant,
    number,
    holderLabel,
    holderName,
    rightLabel,
    rightValue,
    rightSlot,
}: {
    variant: 'teal' | 'amber';
    number: string;
    holderLabel: string;
    holderName: string;
    rightLabel?: string;
    rightValue?: string;
    rightSlot?: React.ReactNode;
}) {
    return (
        <div
            className={
                'medical-card ' + (variant === 'teal' ? 'card-1' : 'card-2')
            }
        >
            <div className="card-header">
                <div className="card-brand">
                    برايم<small>MEDICAL CARD</small>
                </div>
                <div className="card-chip"></div>
            </div>
            <div className="card-number">{number}</div>
            <div className="card-footer">
                <div>
                    <small>{holderLabel}</small>
                    <strong>{holderName}</strong>
                </div>
                {rightSlot ? (
                    rightSlot
                ) : (
                    <div>
                        <small>{rightLabel}</small>
                        <strong>{rightValue}</strong>
                    </div>
                )}
            </div>
        </div>
    );
}

function Floater({
    position,
    icon,
    title,
    sub,
}: {
    position: 1 | 2;
    icon: React.ReactNode;
    title: string;
    sub: string;
}) {
    return (
        <div className={`floater floater-${position}`}>
            <div className="floater-icon">{icon}</div>
            <div>
                <strong>{title}</strong>
                <span>{sub}</span>
            </div>
        </div>
    );
}

export default function Hero() {
    const { open } = useSubscribeModal();

    return (
        <section className="hero">
            <OrbitingLogos />
            <div className="container hero-grid">
                <div className="hero-text">
                    <span className="hero-eyebrow">
                        <span className="pulse"></span>
                        أكثر من ٣٠٠٠ جهة طبية في الشبكة
                    </span>

                    <h1>
                        صحة عائلتك
                        <br />
                        <span className="accent">تستحق</span> أفضل
                        <br />
                        الخصومات
                    </h1>

                    <p>
                        بطاقة واحدة تفتح لك أبواب أفضل المستشفيات والعيادات
                        والصيدليات ومعامل التحاليل في الجمهورية — بخصومات تصل
                        إلى ٧٠٪ لك ولعائلتك طوال العام.
                    </p>

                    <div className="hero-actions">
                        <button
                            type="button"
                            onClick={open}
                            className="btn btn-amber"
                        >
                            احصل على بطاقتك الآن
                            <ArrowLeftIcon />
                        </button>
                        <a href="#how" className="btn btn-ghost">
                            <PlayIcon />
                            شاهد كيف تعمل
                        </a>
                    </div>

                    <div className="hero-stats">
                        <div>
                            <strong>+١٢٠ ألف</strong>
                            <span>عضو نشط</span>
                        </div>
                        <div>
                            <strong>+٣٠٠٠</strong>
                            <span>جهة طبية معتمدة</span>
                        </div>
                        <div>
                            <strong>٤.٩/٥</strong>
                            <span>تقييم الأعضاء</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="card-stack">
                        <MedicalCard
                            variant="teal"
                            number="5492 •••• •••• 1847"
                            holderLabel="CARDHOLDER"
                            holderName="MOSTAFA HASSAN"
                            rightLabel="VALID THRU"
                            rightValue="12/28"
                        />
                        <MedicalCard
                            variant="amber"
                            number="7821 •••• •••• 4263"
                            holderLabel="FAMILY MEMBER"
                            holderName="NOUR HASSAN"
                            rightSlot={
                                <div className="card-logo-mini">
                                    <HeartIcon width={20} height={20} />
                                </div>
                            }
                        />
                    </div>

                    <Floater
                        position={1}
                        icon={<SavingsIcon />}
                        title="وفرت ٢٤٥٠ جنيه"
                        sub="في آخر زيارة"
                    />
                    <Floater
                        position={2}
                        icon={<CheckShieldIcon />}
                        title="تم قبول البطاقة"
                        sub="مستشفى السلام الدولي"
                    />
                </div>
            </div>
        </section>
    );
}

import { useSubscribeModal } from '@/components/subscribe-modal';
import { usePageContent } from '@/hooks/use-page-content';
import { useSiteSettings } from '@/hooks/use-site-settings';
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
    const { hero_stats } = useSiteSettings();
    const stats = (hero_stats ?? []).filter(
        (s) => s.value && s.label && s.value.trim() && s.label.trim(),
    );
    const eyebrow = usePageContent(
        'hero',
        'eyebrow',
        'أكثر من ٣٠٠٠ جهة طبية في الشبكة',
    );
    const paragraph = usePageContent(
        'hero',
        'paragraph',
        'بطاقة واحدة تفتح لك أبواب أفضل المستشفيات والعيادات والصيدليات ومعامل التحاليل في الجمهورية — بخصومات تصل إلى ٧٠٪ لك ولعائلتك طوال العام.',
    );
    const ctaPrimary = usePageContent(
        'hero',
        'cta_primary',
        'احصل على بطاقتك الآن',
    );
    const ctaSecondary = usePageContent(
        'hero',
        'cta_secondary',
        'شاهد كيف تعمل',
    );

    return (
        <section className="hero" style={{ backgroundImage: 'url(/images/homepage/1.webp)' }}>
            <OrbitingLogos />
            <div className="hero-grid container">
                <div className="hero-text">
                    <span className="hero-eyebrow">
                        <span className="pulse"></span>
                        {eyebrow}
                    </span>

                    <h1>
                        صحة عائلتك
                        <br />
                        <span className="accent">تستحق</span> أفضل
                        <br />
                        الخصومات
                    </h1>

                    <p>{paragraph}</p>

                    <div className="hero-actions">
                        <button
                            type="button"
                            onClick={open}
                            className="btn btn-amber"
                        >
                            {ctaPrimary}
                            <ArrowLeftIcon />
                        </button>
                        <a href="#how" className="btn btn-ghost">
                            <PlayIcon />
                            {ctaSecondary}
                        </a>
                    </div>

                    <div className="hero-stats">
                        {stats.length > 0 && (
                            <>
                                {stats.map((s, i) => (
                                    <div key={i}>
                                        <strong>{s.value}</strong>
                                        <span>{s.label}</span>
                                    </div>
                                ))}
                            </>
                        )}
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

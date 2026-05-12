import type { ReactNode } from 'react';
import { usePageContent } from '@/hooks/use-page-content';
import { CardIcon, HeartBigIcon, UserIcon } from './icons';

type Step = {
    id: number;
    title: string;
    description: string | null;
    icon_key: string;
};

const STEP_ICONS: Record<string, ReactNode> = {
    user: <UserIcon />,
    card: <CardIcon />,
    heart: <HeartBigIcon />,
};

export default function HowItWorks({ items = [] }: { items?: Step[] }) {
    const eyebrow = usePageContent('how_header', 'eyebrow', 'كيف تعمل');
    const paragraph = usePageContent(
        'how_header',
        'paragraph',
        'من الاشتراك حتى استخدام البطاقة في أقرب عيادة — لا أوراق ولا انتظار ولا تعقيدات',
    );

    if (items.length === 0) {
        return null;
    }

    return (
        <section id="how">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">{eyebrow}</span>
                    <h2>
                        ثلاث خطوات بسيطة
                        <br />
                        تفصلك عن <em>التوفير</em>
                    </h2>
                    <p>{paragraph}</p>
                </div>

                <div className="steps">
                    {items.map((step) => (
                        <div className="step" key={step.id}>
                            <div className="step-num">
                                {STEP_ICONS[step.icon_key] ?? <UserIcon />}
                            </div>
                            <h3>{step.title}</h3>
                            {step.description && <p>{step.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

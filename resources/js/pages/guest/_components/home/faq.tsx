type FaqEntry = { id: number; question: string; answer: string };

const FALLBACK: FaqEntry[] = [
    {
        id: -1,
        question: 'هل برايم ميديكال كارد تأمين صحي؟',
        answer: 'لا، برايم ميديكال كارد ليست شركة تأمين صحي. نحن برنامج خصومات طبية يمنحك تخفيضات فورية على الخدمات الطبية في أكثر من ٣٠٠٠ جهة طبية معتمدة.',
    },
];

export default function Faq({ items }: { items?: FaqEntry[] }) {
    const list = items && items.length > 0 ? items : FALLBACK;

    return (
        <section id="faq">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">الأسئلة الشائعة</span>
                    <h2>
                        كل ما تريد <em>معرفته</em>
                    </h2>
                    <p>
                        إجابات سريعة على أكثر الأسئلة شيوعاً. لم تجد إجابتك؟
                        تواصل معنا مباشرة
                    </p>
                </div>

                <div className="faq-wrap">
                    {list.map((item, i) => (
                        <details
                            className="faq-item"
                            key={item.id}
                            open={i === 0}
                        >
                            <summary>{item.question}</summary>
                            <div
                                className="faq-body"
                                style={{ whiteSpace: 'pre-line' }}
                            >
                                {item.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { CardIcon, HeartBigIcon, UserIcon } from './icons';

const STEPS = [
    {
        icon: <UserIcon />,
        title: 'اختر باقتك',
        desc: 'فردية أو عائلية أو مميزة — اختر ما يناسب احتياجك واشترك في دقائق من موقعنا',
    },
    {
        icon: <CardIcon />,
        title: 'استلم بطاقتك',
        desc: 'بطاقة رقمية فوراً على هاتفك، وبطاقة فعلية تصلك خلال ٤٨ ساعة أينما كنت',
    },
    {
        icon: <HeartBigIcon />,
        title: 'استمتع بالخصم',
        desc: 'اعرض بطاقتك في أي جهة من شبكتنا واحصل على خصم فوري يصل إلى ٧٠٪ على كل الخدمات',
    },
];

export default function HowItWorks() {
    return (
        <section id="how">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">كيف تعمل</span>
                    <h2>
                        ثلاث خطوات بسيطة
                        <br />
                        تفصلك عن <em>التوفير</em>
                    </h2>
                    <p>
                        من الاشتراك حتى استخدام البطاقة في أقرب عيادة — لا أوراق
                        ولا انتظار ولا تعقيدات
                    </p>
                </div>

                <div className="steps">
                    {STEPS.map((step) => (
                        <div className="step" key={step.title}>
                            <div className="step-num">{step.icon}</div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

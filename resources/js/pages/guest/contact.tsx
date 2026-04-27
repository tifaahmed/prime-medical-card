import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import FloatingActions from '@/components/floating-actions';
import FloatingLogos from '@/components/floating-logos';
import SeoHead, { breadcrumbSchema } from '@/components/seo-head';
import AnnounceBar from '@/components/home/announce-bar';
import {
    EnvelopeIcon,
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    YoutubeIcon,
} from '@/components/home/icons';
import MobileBottomNav from '@/components/home/mobile-bottom-nav';
import useRevealOnScroll from '@/components/home/reveal-on-scroll';
import SiteFooter from '@/components/home/site-footer';
import SiteNav from '@/components/home/site-nav';
import { homeStyles } from '@/components/home/styles';

const PHONE = '+201156385251';
const PHONE_DISPLAY = '+20 115 638 5251';
const WHATSAPP = '201156385251';
const EMAIL = 'info@primemedicalcard.com';
const ADDRESS = 'القاهرة، جمهورية مصر العربية';
const MAP_LAT = '30.0444';
const MAP_LNG = '31.2357';

export default function Contact() {
    const { auth, appUrl } = usePage<{
        auth: { user: { name: string } | null };
        appUrl: string;
    }>().props;
    const authUser = auth?.user ?? null;
    const [submitted, setSubmitted] = useState(false);

    useRevealOnScroll();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <>
            <SeoHead
                title="تواصل معنا — برايم ميديكال كارد"
                description="تواصل مع فريق برايم ميديكال كارد عبر الهاتف أو الواتساب أو البريد الإلكتروني. نحن هنا للإجابة على أسئلتك ومساعدتك في الاشتراك."
                jsonLd={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'ContactPage',
                        name: 'تواصل معنا',
                        url: `${appUrl ?? ''}/contact`,
                        inLanguage: 'ar-EG',
                        mainEntity: {
                            '@type': 'Organization',
                            name: 'برايم ميديكال كارد',
                            email: EMAIL,
                            telephone: PHONE,
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'القاهرة',
                                addressCountry: 'EG',
                            },
                        },
                    },
                    breadcrumbSchema(appUrl ?? '', [
                        { name: 'الرئيسية', path: '/' },
                        { name: 'تواصل معنا', path: '/contact' },
                    ]),
                ]}
            >
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&family=Tajawal:wght@300;400;500;700;800&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
            </SeoHead>
            <style dangerouslySetInnerHTML={{ __html: homeStyles }} />

            <div className="pm-home" dir="rtl" lang="ar">
                <FloatingLogos />
                <AnnounceBar />
                <SiteNav authUser={authUser} />

                <section className="relative z-[2] py-16 sm:py-24">
                    <div className="container">
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex items-center rounded-full bg-[#d7e8e5] px-4 py-1.5 text-xs font-semibold text-[#0b2e2c]">
                                نسعد بتواصلك معنا
                            </span>
                            <h1 className="mt-4 text-4xl font-bold text-[#0b2e2c] sm:text-5xl">
                                تواصل معنا
                            </h1>
                            <p className="mt-4 text-base leading-relaxed text-[#3d4948] sm:text-lg">
                                لديك سؤال عن البطاقة، الاشتراك، أو الشركاء
                                الطبيين؟ فريقنا جاهز للرد عليك خلال ساعات العمل.
                                اختر وسيلة التواصل الأنسب لك أو أرسل لنا رسالة
                                مباشرة.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                            <ContactCard
                                title="اتصل بنا"
                                value={PHONE_DISPLAY}
                                href={`tel:${PHONE}`}
                                icon={<PhoneIcon />}
                                accent="bg-[#FFA500]"
                            />
                            <ContactCard
                                title="واتساب"
                                value="رد فوري خلال ساعات العمل"
                                href={`https://wa.me/${WHATSAPP}`}
                                icon={<WhatsappIcon />}
                                accent="bg-[#25D366]"
                                external
                            />
                            <ContactCard
                                title="البريد الإلكتروني"
                                value={EMAIL}
                                href={`mailto:${EMAIL}`}
                                icon={<EnvelopeIcon className="h-5 w-5" />}
                                accent="bg-[#236b64]"
                            />
                            <ContactCard
                                title="مقر الشركة"
                                value={ADDRESS}
                                icon={<PinIcon />}
                                accent="bg-[#d68228]"
                            />
                        </div>

                        <div className="mt-16 grid gap-10 lg:grid-cols-5">
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-bold text-[#0b2e2c] sm:text-3xl">
                                    أرسل لنا رسالة
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-[#3d4948]">
                                    املأ النموذج وسيقوم فريقنا بالتواصل معك في
                                    أقرب وقت. نحرص على الرد خلال ٢٤ ساعة عمل.
                                </p>

                                <ul className="mt-8 space-y-4 text-sm text-[#0b2e2c]">
                                    <li className="flex items-start gap-3">
                                        <ClockIcon />
                                        <div>
                                            <div className="font-semibold">
                                                ساعات العمل
                                            </div>
                                            <div className="text-[#3d4948]">
                                                السبت – الخميس، ٩ صباحاً – ٦
                                                مساءً
                                            </div>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <SupportIcon />
                                        <div>
                                            <div className="font-semibold">
                                                دعم الأعضاء
                                            </div>
                                            <div className="text-[#3d4948]">
                                                خط ساخن للأعضاء على مدار الأسبوع
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                                <div className="mt-8 flex items-center gap-3">
                                    <span className="text-sm font-semibold text-[#0b2e2c]">
                                        تابعنا:
                                    </span>
                                    <SocialLinks />
                                </div>
                            </div>

                            <div className="lg:col-span-3">
                                <div className="rounded-3xl border border-[rgba(11,46,44,0.08)] bg-white p-6 shadow-[0_24px_60px_-32px_rgba(11,46,44,0.4)] sm:p-10">
                                    {submitted ? (
                                        <div className="flex flex-col items-center gap-4 py-12 text-center">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d7e8e5] text-[#0b2e2c]">
                                                <CheckIcon />
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#0b2e2c]">
                                                تم استلام رسالتك
                                            </h3>
                                            <p className="max-w-sm text-sm text-[#3d4948]">
                                                شكراً لتواصلك مع برايم ميديكال
                                                كارد. سيتواصل معك أحد ممثلينا
                                                قريباً.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSubmitted(false)
                                                }
                                                className="mt-2 rounded-full bg-[#0b2e2c] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#12403d]"
                                            >
                                                إرسال رسالة أخرى
                                            </button>
                                        </div>
                                    ) : (
                                        <form
                                            onSubmit={onSubmit}
                                            className="grid gap-5"
                                        >
                                            <Field
                                                label="الاسم بالكامل"
                                                name="name"
                                                type="text"
                                                placeholder="الاسم الكامل"
                                                required
                                            />
                                            <Field
                                                label="رقم الهاتف"
                                                name="phone"
                                                type="tel"
                                                placeholder="01xxxxxxxxx"
                                                required
                                            />
                                            <Field
                                                label="الموضوع"
                                                name="subject"
                                                type="text"
                                                placeholder="موضوع الاستفسار"
                                                required
                                                multiline
                                                rows={5}
                                            />
                                            <button
                                                type="submit"
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b2e2c] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#12403d] sm:w-auto sm:self-start"
                                            >
                                                إرسال الرسالة
                                                <ArrowIcon />
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-16">
                            <div className="mb-6 flex flex-col gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#0b2e2c] sm:text-3xl">
                                        موقعنا على الخريطة
                                    </h2>
                                    <p className="mt-2 text-sm text-[#3d4948]">
                                        {ADDRESS}
                                    </p>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_LAT},${MAP_LNG}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-[#0b2e2c] px-5 py-2.5 text-sm font-semibold text-[#0b2e2c] transition hover:bg-[#0b2e2c] hover:text-white sm:self-auto"
                                >
                                    <PinIcon />
                                    احصل على الاتجاهات
                                </a>
                            </div>
                            <div className="overflow-hidden rounded-3xl border border-[rgba(11,46,44,0.08)] shadow-[0_24px_60px_-32px_rgba(11,46,44,0.4)]">
                                <iframe
                                    title="موقع برايم ميديكال كارد"
                                    src={`https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&hl=ar&z=15&output=embed`}
                                    className="h-[360px] w-full sm:h-[440px]"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <SiteFooter />
                <MobileBottomNav />
                <FloatingActions />
            </div>
        </>
    );
}

function ContactCard({
    title,
    value,
    href,
    icon,
    accent,
    external,
}: {
    title: string;
    value: string;
    href?: string;
    icon: React.ReactNode;
    accent: string;
    external?: boolean;
}) {
    const inner = (
        <div className="group flex h-full flex-col gap-3 rounded-2xl border border-[rgba(11,46,44,0.08)] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${accent}`}
            >
                {icon}
            </div>
            <div className="text-sm font-semibold text-[#0b2e2c]">{title}</div>
            <div className="text-sm text-[#3d4948]">{value}</div>
        </div>
    );

    if (!href) {
        return inner;
    }

    return external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {inner}
        </a>
    ) : (
        <a href={href}>{inner}</a>
    );
}

function Field({
    label,
    name,
    type,
    placeholder,
    required,
    multiline,
    rows,
}: {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    multiline?: boolean;
    rows?: number;
}) {
    const sharedClasses =
        'w-full border border-[rgba(11,46,44,0.15)] bg-[#f7f2ea] px-4 py-3 text-sm text-[#0a1a19] outline-none transition focus:border-[#236b64] focus:bg-white focus:ring-2 focus:ring-[#7fb3ad]';

    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-semibold text-[#0b2e2c]"
            >
                {label}
            </label>
            {multiline ? (
                <textarea
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    rows={rows ?? 4}
                    className={`${sharedClasses} resize-y rounded-2xl leading-relaxed`}
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    className={`${sharedClasses} rounded-full`}
                />
            )}
        </div>
    );
}

function SocialLinks() {
    const items: {
        Icon: typeof FacebookIcon;
        label: string;
        className: string;
        style?: React.CSSProperties;
    }[] = [
        {
            Icon: FacebookIcon,
            label: 'Facebook',
            className: 'bg-[#1877F2] hover:bg-[#1466d6]',
        },
        {
            Icon: InstagramIcon,
            label: 'Instagram',
            className: 'hover:brightness-110',
            style: {
                background:
                    'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            },
        },
        {
            Icon: TwitterIcon,
            label: 'Twitter',
            className: 'bg-black hover:bg-[#222]',
        },
        {
            Icon: YoutubeIcon,
            label: 'YouTube',
            className: 'bg-[#FF0000] hover:bg-[#d90000]',
        },
    ];

    return (
        <div className="flex items-center gap-2">
            {items.map(({ Icon, label, className, style }) => (
                <a
                    key={label}
                    href="#"
                    aria-label={label}
                    style={style}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${className}`}
                >
                    <Icon className="h-4 w-4" />
                </a>
            ))}
        </div>
    );
}

function PhoneIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
        >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
    );
}

function WhatsappIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
    );
}

function PinIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
        >
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 h-5 w-5 text-[#236b64]"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function SupportIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 h-5 w-5 text-[#236b64]"
        >
            <path d="M3 18v-6a9 9 0 0118 0v6" />
            <path d="M21 19a2 2 0 01-2 2h-1v-7h3zM3 19a2 2 0 002 2h1v-7H3z" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
        >
            <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
    );
}

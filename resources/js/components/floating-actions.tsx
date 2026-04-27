import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

const WHATSAPP = '201156385251';
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP}`;

const floatingStyles = `
  @keyframes fa-pulse-glow {
    0%   { box-shadow: 0 0 0 0 rgba(232, 168, 74, 0.65), 0 10px 24px -8px rgba(11, 46, 44, 0.35); }
    70%  { box-shadow: 0 0 0 14px rgba(232, 168, 74, 0),    0 10px 24px -8px rgba(11, 46, 44, 0.35); }
    100% { box-shadow: 0 0 0 0 rgba(232, 168, 74, 0),       0 10px 24px -8px rgba(11, 46, 44, 0.35); }
  }
  .animate-pulse-glow { animation: fa-pulse-glow 2.2s ease-out infinite; }

  @keyframes fa-pulse-glow-green {
    0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6), 0 10px 24px -8px rgba(11, 46, 44, 0.35); }
    70%  { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0),  0 10px 24px -8px rgba(11, 46, 44, 0.35); }
    100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0),     0 10px 24px -8px rgba(11, 46, 44, 0.35); }
  }
  .animate-pulse-glow-green { animation: fa-pulse-glow-green 2.4s ease-out infinite; }
`;

export default function FloatingActions() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: floatingStyles }} />
            <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل عبر واتساب"
                className="animate-pulse-glow-green fixed bottom-40 left-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:scale-105 hover:bg-[#1fb358] sm:bottom-6 sm:left-6 sm:h-14 sm:w-14"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 sm:h-7 sm:w-7">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
            </a>

            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="احصل على استشارة مجانية"
                className="animate-pulse-glow fixed left-0 top-1/2 z-[60] inline-flex -translate-y-1/2 flex-col items-center gap-1.5 rounded-l-none rounded-r-2xl bg-[var(--amber-500)] px-1.5 py-3 text-[10px] font-bold text-[var(--teal-900)] transition hover:scale-105 hover:bg-[var(--amber-400)] sm:left-auto sm:right-6 sm:top-auto sm:bottom-6 sm:translate-y-0 sm:flex-row sm:gap-2 sm:rounded-full sm:px-5 sm:py-3.5 sm:text-sm"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="[writing-mode:vertical-rl] sm:[writing-mode:horizontal-tb]">
                    استشارة مجانية
                </span>
            </button>

            {open && <ConsultModal onClose={() => setOpen(false)} />}
        </>
    );
}

function ConsultModal({ onClose }: { onClose: () => void }) {
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="نموذج الاستشارة المجانية"
            className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
            >
                <button
                    type="button"
                    aria-label="إغلاق"
                    onClick={onClose}
                    className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--teal-900)] shadow transition hover:bg-white"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                    </svg>
                </button>

                <div className="bg-gradient-to-br from-[var(--amber-500)] to-[var(--amber-600)] p-6 sm:p-7">
                    <h2 className="text-lg font-bold text-[var(--teal-900)] sm:text-xl">
                        احصل على استشارة مجانية
                    </h2>
                    <p className="mt-1 text-xs text-[rgba(11,46,44,0.75)] sm:text-sm">
                        اترك بياناتك وسيتواصل معك فريقنا خلال ساعات العمل.
                    </p>
                </div>

                <div className="p-5 sm:p-6">
                    {submitted ? (
                        <div className="flex flex-col items-center gap-3 py-8 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--teal-50,_#d7e8e5)] text-[var(--teal-900)]">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <h3 className="text-base font-bold text-[var(--teal-900)]">
                                تم إرسال طلبك بنجاح
                            </h3>
                            <p className="text-sm text-[var(--ink-soft)]">
                                سنتواصل معك في أقرب وقت ممكن.
                            </p>
                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-2 rounded-full bg-[var(--teal-900)] px-5 py-2 text-sm font-semibold text-[var(--cream)] hover:bg-[var(--teal-800)]"
                            >
                                إغلاق
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} className="space-y-3">
                            <Field label="الاسم بالكامل" name="name" required>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full rounded-2xl border border-[rgba(11,46,44,0.15)] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[var(--teal-700)]"
                                />
                            </Field>
                            <Field label="رقم الهاتف" name="phone" required>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    inputMode="tel"
                                    className="w-full rounded-2xl border border-[rgba(11,46,44,0.15)] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[var(--teal-700)]"
                                />
                            </Field>
                            <Field label="البريد (اختياري)" name="email">
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full rounded-2xl border border-[rgba(11,46,44,0.15)] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[var(--teal-700)]"
                                />
                            </Field>
                            <Field label="استفسارك" name="message">
                                <textarea
                                    name="message"
                                    rows={3}
                                    placeholder="أخبرنا كيف يمكننا مساعدتك..."
                                    className="w-full resize-none rounded-2xl border border-[rgba(11,46,44,0.15)] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[var(--teal-700)]"
                                />
                            </Field>
                            <button
                                type="submit"
                                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--teal-900)] px-5 py-3 text-sm font-semibold text-[var(--cream)] transition hover:bg-[var(--teal-800)]"
                            >
                                إرسال الطلب
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

function Field({
    label,
    name,
    required,
    children,
}: {
    label: string;
    name: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <label htmlFor={name} className="block text-sm">
            <span className="mb-1 block text-xs font-semibold text-[var(--teal-900)]">
                {label}
                {required && <span className="text-[var(--amber-600)]"> *</span>}
            </span>
            {children}
        </label>
    );
}

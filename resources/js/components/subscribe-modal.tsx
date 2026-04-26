import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
    
    
} from 'react';
import type {FormEvent, ReactNode} from 'react';

type Ctx = { open: () => void; close: () => void };

const SubscribeModalCtx = createContext<Ctx>({
    open: () => {},
    close: () => {},
});

export function useSubscribeModal() {
    return useContext(SubscribeModalCtx);
}

export function SubscribeModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return (
        <SubscribeModalCtx.Provider value={{ open, close }}>
            {children}
            {isOpen && <SubscribeModal onClose={close} />}
        </SubscribeModalCtx.Provider>
    );
}

function SubscribeModal({ onClose }: { onClose: () => void }) {
    const [submitted, setSubmitted] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', onKey);
        nameRef.current?.focus();
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [onClose]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscribe-modal-title"
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(11,46,44,0.55)] p-4 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
                lang="ar"
                className="relative w-full max-w-md rounded-[2rem] bg-white p-6 shadow-[0_30px_70px_-30px_rgba(11,46,44,0.6)] sm:p-8"
                style={{ fontFamily: "'Tajawal', system-ui, sans-serif" }}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="إغلاق"
                    className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f2ea] text-[#0b2e2c] transition hover:bg-[#d7e8e5]"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                    >
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                    </svg>
                </button>

                {submitted ? (
                    <div className="flex flex-col items-center gap-4 py-8 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d7e8e5] text-[#0b2e2c]">
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
                        </div>
                        <h3
                            className="text-xl font-bold text-[#0b2e2c]"
                            style={{
                                fontFamily:
                                    "'Reem Kufi', 'Tajawal', sans-serif",
                            }}
                        >
                            تم استلام طلبك
                        </h3>
                        <p className="max-w-sm text-sm text-[#3d4948]">
                            شكراً لاهتمامك ببرايم ميديكال كارد. سيتواصل معك أحد
                            ممثلي خدمة العملاء خلال ٢٤ ساعة عمل لإكمال
                            الاشتراك.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-2 rounded-full bg-[#0b2e2c] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#12403d]"
                        >
                            تم
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-center">
                            <span className="inline-flex items-center rounded-full bg-[#fbead2] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d68228]">
                                اشتراك جديد
                            </span>
                            <h2
                                id="subscribe-modal-title"
                                className="mt-3 text-2xl font-bold text-[#0b2e2c]"
                                style={{
                                    fontFamily:
                                        "'Reem Kufi', 'Tajawal', sans-serif",
                                }}
                            >
                                اشترك في برايم ميديكال كارد
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-[#3d4948]">
                                اترك بياناتك وسيتواصل معك فريقنا لإكمال خطوات
                                الاشتراك.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 grid gap-4"
                        >
                            <ModalField
                                label="الاسم بالكامل"
                                name="name"
                                type="text"
                                placeholder="الاسم الكامل"
                                inputRef={nameRef}
                                required
                            />
                            <ModalField
                                label="رقم الهاتف"
                                name="phone"
                                type="tel"
                                placeholder="01xxxxxxxxx"
                                dir="ltr"
                                required
                            />
                            <ModalField
                                label="الموضوع"
                                name="subject"
                                type="text"
                                placeholder="مثال: استفسار عن الباقة العائلية"
                                required
                            />

                            <button
                                type="submit"
                                className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0b2e2c] text-sm font-semibold text-white transition hover:bg-[#12403d]"
                            >
                                إرسال الطلب
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
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

function ModalField({
    label,
    name,
    type,
    placeholder,
    required,
    dir,
    inputRef,
}: {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    dir?: 'ltr' | 'rtl';
    inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
    return (
        <div>
            <label
                htmlFor={`subscribe-${name}`}
                className="mb-1.5 block text-sm font-semibold text-[#0b2e2c]"
            >
                {label}
            </label>
            <input
                ref={inputRef}
                id={`subscribe-${name}`}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                dir={dir}
                className="h-12 w-full rounded-full border border-[rgba(11,46,44,0.15)] bg-[#f7f2ea] px-5 text-sm text-[#0a1a19] outline-none transition placeholder:text-[#3d4948]/60 focus:border-[#236b64] focus:bg-white focus:ring-2 focus:ring-[#7fb3ad]"
            />
        </div>
    );
}

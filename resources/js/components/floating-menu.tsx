import { useEffect, useRef, useState } from 'react';

const WHATSAPP_NUMBER = '201156385251';
const PHONE_NUMBER = '+201156385251';
const LAST_SEEN_KEY = 'pmc:floatingMenuLastSeen';
const REOPEN_AFTER_MS = 200 * 60 * 1000;

export default function FloatingMenu() {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(LAST_SEEN_KEY);
            const last = raw ? Number(raw) : NaN;
            const shouldOpen =
                !raw ||
                Number.isNaN(last) ||
                Date.now() - last >= REOPEN_AFTER_MS;

            if (shouldOpen) {
                setOpen(true);
            }
            window.localStorage.setItem(LAST_SEEN_KEY, String(Date.now()));
        } catch {
            setOpen(true);
        }
    }, []);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleClick = (e: MouseEvent) => {
            if (!rootRef.current) {
                return;
            }

            if (!rootRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, [open]);

    return (
        <div
            ref={rootRef}
            className="fixed bottom-24 left-0 sm:bottom-6 sm:left-auto sm:right-4 z-[60]"
            dir="rtl"
        >
            <div
                className={
                    'pointer-events-none absolute bottom-full left-0 sm:left-auto sm:right-0 mb-2 flex min-w-[9rem] flex-col gap-1.5 transition-all duration-300 ' +
                    (open
                        ? 'translate-y-0 opacity-100 pointer-events-auto'
                        : 'translate-y-2 opacity-0')
                }
            >
                <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center gap-1.5 whitespace-nowrap rounded-md bg-[#25D366] px-2.5 py-1.5 text-start shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#128C7E] hover:shadow-xl"
                >
                    <IconWhatsapp />
                    <span className="text-xs font-medium text-white">
                        تواصل معنا عبر واتساب
                    </span>
                </a>

                <a
                    href="/"
                    className="flex w-full items-center gap-1.5 whitespace-nowrap rounded-md bg-[#0b2e2c] px-2.5 py-1.5 text-start shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#12403d] hover:shadow-xl"
                >
                    <IconIdCard />
                    <span className="text-xs font-medium text-white">
                        كارت العضوية
                    </span>
                </a>

                <a
                    href="#contact"
                    className="flex w-full items-center gap-1.5 whitespace-nowrap rounded-md bg-[#FF6B6B] px-2.5 py-1.5 text-start shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#FF4F4F] hover:shadow-xl"
                >
                    <IconEnvelope />
                    <span className="text-xs font-medium text-white">
                        تواصل معنا
                    </span>
                </a>

                <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex w-full items-center gap-1.5 whitespace-nowrap rounded-md bg-[#FFA500] px-2.5 py-1.5 text-start shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#FF9000] hover:shadow-xl"
                >
                    <IconPhone />
                    <span className="text-xs font-medium text-white">
                        اتصل بنا
                    </span>
                </a>
            </div>

            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'إغلاق القائمة' : 'فتح قائمة التواصل'}
                aria-expanded={open}
                className={
                    'cursor-pointer rounded-full bg-gradient-to-r from-sky-500 to-blue-600 p-3.5 shadow-lg transition-all duration-300 hover:from-sky-600 hover:to-blue-700 ' +
                    (open ? '' : 'animate-float-bob')
                }
            >
                <svg
                    viewBox="0 0 24 24"
                    className={
                        'h-6 w-6 text-white transition-transform duration-300 ' +
                        (open ? 'rotate-45' : 'rotate-0')
                    }
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>
        </div>
    );
}

function IconWhatsapp() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-white"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
    );
}

function IconIdCard() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-white"
        >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <circle cx="8.5" cy="12" r="2" />
            <path d="M14 10h5" />
            <path d="M14 14h4" />
        </svg>
    );
}

function IconEnvelope() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-white"
        >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );
}

function IconPhone() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-white"
        >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
    );
}

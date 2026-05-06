import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <>
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

            <div
                dir="rtl"
                lang="ar"
                className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#f7f2ea] p-4 sm:p-8"
                style={{ fontFamily: "'Tajawal', system-ui, sans-serif" }}
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full bg-[#e8a84a]/30 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#236b64]/25 blur-3xl"
                />

                <div className="relative z-10 w-full max-w-md">
                    <div className="rounded-[2rem] border border-[rgba(11,46,44,0.08)] bg-white p-8 shadow-[0_30px_70px_-40px_rgba(11,46,44,0.5)] sm:p-10">
                        <div className="flex flex-col items-center gap-5 text-center">
                            <Link
                                href={home()}
                                aria-label="برايم ميديكال كارد"
                                className="inline-flex items-center"
                            >
                                <img
                                    src="/images/logos/logo-with-text-without-background.png"
                                    alt="برايم ميديكال كارد"
                                    className="h-14 w-auto max-w-[200px] object-contain"
                                    loading="eager"
                                    decoding="async"
                                />
                            </Link>

                            <div className="space-y-2">
                                <h1
                                    className="text-2xl font-bold text-[#0b2e2c] sm:text-[1.65rem]"
                                    style={{
                                        fontFamily:
                                            "'Reem Kufi', 'Tajawal', sans-serif",
                                    }}
                                >
                                    {title}
                                </h1>
                                {description && (
                                    <p className="text-sm leading-relaxed text-[#3d4948]">
                                        {description}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-8">{children}</div>
                    </div>

                    <div className="mt-6 text-center text-xs text-[#3d4948]">
                        <Link
                            href={home()}
                            className="inline-flex items-center gap-1 text-[#0b2e2c] transition hover:text-[#d68228]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3.5 w-3.5"
                            >
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            العودة إلى الصفحة الرئيسية
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

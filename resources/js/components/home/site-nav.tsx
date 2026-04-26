import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useSubscribeModal } from '@/components/subscribe-modal';
import { dashboard, login } from '@/routes';
import BrandLogo from './brand-logo';
import CardLookupModal from './card-lookup-modal';
import { ArrowLeftIcon, CardIcon } from './icons';

type AuthUser = { name: string } | null;

export default function SiteNav({ authUser }: { authUser: AuthUser }) {
    const [cardOpen, setCardOpen] = useState(false);
    const { open: openSubscribe } = useSubscribeModal();

    useEffect(() => {
        if (!cardOpen) {
            return;
        }

        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = prev;
        };
    }, [cardOpen]);

    return (
        <>
            <nav className="topnav">
                <div className="container nav-inner">
                    <BrandLogo />

                    <ul className="nav-menu">
                        <li>
                            <a href="/">الرئيسية</a>
                        </li>
                        <li>
                            <a href="/about">عن الشركة</a>
                        </li>
                        <li>
                            <a href="/partners">الشركاء</a>
                        </li>
                        <li>
                            <a href="/contact">تواصل معنا</a>
                        </li>
                    </ul>

                    <div className="nav-actions">
                        <button
                            type="button"
                            className="nav-card-btn"
                            onClick={() => setCardOpen(true)}
                            aria-label="ادخل رقم الكارت"
                        >
                            <CardIcon />
                            <span className="nav-card-btn-label">الكارت</span>
                        </button>

                        <div className="nav-cta">
                            {authUser ? (
                                <Link
                                    href={dashboard()}
                                    className="btn btn-ghost"
                                >
                                    لوحة التحكم
                                </Link>
                            ) : (
                                <Link href={login()} className="btn btn-ghost">
                                    تسجيل الدخول
                                </Link>
                            )}
                            <button
                                type="button"
                                onClick={openSubscribe}
                                className="btn btn-primary"
                            >
                                اشترك الآن
                                <ArrowLeftIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {cardOpen && (
                <CardLookupModal onClose={() => setCardOpen(false)} />
            )}
        </>
    );
}

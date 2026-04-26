import { useState } from 'react';
import { EnvelopeIcon, HomeIcon, InfoIcon, UsersIcon } from './icons';

type NavItem = {
    key: string;
    label: string;
    href: string;
    icon: React.ReactNode;
};

const ITEMS: NavItem[] = [
    { key: 'home', label: 'الرئيسية', href: '/', icon: <HomeIcon /> },
    { key: 'about', label: 'عن الشركة', href: '/about', icon: <InfoIcon /> },
    {
        key: 'partners',
        label: 'الشركاء',
        href: '/partners',
        icon: <UsersIcon />,
    },
    {
        key: 'contact',
        label: 'تواصل معنا',
        href: '/contact',
        icon: <EnvelopeIcon />,
    },
];

export default function MobileBottomNav() {
    const [active, setActive] = useState('home');

    return (
        <nav className="mobile-bottom-nav" aria-label="التنقل السريع">
            <div className="mobile-nav-inner">
                {ITEMS.map((item) => (
                    <a
                        key={item.key}
                        href={item.href}
                        className={
                            'mobile-nav-item' +
                            (active === item.key ? ' active' : '')
                        }
                        aria-label={item.label}
                        onClick={() => setActive(item.key)}
                    >
                        <div className="mobile-nav-icon">{item.icon}</div>
                        <span>{item.label}</span>
                    </a>
                ))}
            </div>
        </nav>
    );
}

import { useEffect } from 'react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

function useForceLightMode() {
    useEffect(() => {
        if (typeof document === 'undefined') return;

        const root = document.documentElement;
        const wasDark = root.classList.contains('dark');
        const previousColorScheme = root.style.colorScheme;

        root.classList.remove('dark');
        root.style.colorScheme = 'light';

        return () => {
            if (wasDark) root.classList.add('dark');
            root.style.colorScheme = previousColorScheme;
        };
    }, []);
}

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    useForceLightMode();

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}

import { createInertiaApp } from '@inertiajs/react';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { SubscribeModalProvider } from '@/components/subscribe-modal';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';

declare global {
    interface Window {
        __inertiaRoot?: Root;
        __inertiaSetupCount?: number;
    }
}

const AppLayout = lazy(() => import('@/layouts/app-layout'));
const AuthLayout = lazy(() => import('@/pages/auth/_layouts/auth-layout'));
const SettingsLayout = lazy(
    () => import('@/pages/settings/_layouts/layout'),
);
const FloatingMenu = lazy(() => import('@/components/floating-menu'));

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name.startsWith('guest/'):
                return GuestLayout;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            case name.startsWith('dashboard/'):
                return AppLayout;
            default:
                return AppLayout;
        }
    },
    setup({ el, App, props }) {
        if (typeof window !== 'undefined') {
            window.__inertiaSetupCount = (window.__inertiaSetupCount ?? 0) + 1;
        }

        const app = (
            <StrictMode>
                <Suspense fallback={null}>
                    <TooltipProvider delayDuration={0}>
                        <SubscribeModalProvider>
                            <App {...props} />
                            <Toaster />
                        </SubscribeModalProvider>
                    </TooltipProvider>
                </Suspense>
            </StrictMode>
        );

        if (!el) {
            return app;
        }

        const root = createRoot(el);
        root.render(app);
    },
    progress: {
        color: '#4B5563',
    },
});

function GuestLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Suspense fallback={null}>
                <FloatingMenu />
            </Suspense>
        </>
    );
}

initializeTheme();

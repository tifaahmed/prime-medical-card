import { createInertiaApp } from '@inertiajs/react';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { SubscribeModalProvider } from '@/components/subscribe-modal';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';

const __evalId = Math.random().toString(36).slice(2, 8);
console.log('[app.tsx] module evaluated', {
    id: __evalId,
    time: new Date().toISOString(),
    url: window.location.href,
});

if (import.meta.hot) {
    console.log('[app.tsx] HMR active', { id: __evalId });
    import.meta.hot.on('vite:beforeUpdate', (p) =>
        console.log('[app.tsx] vite:beforeUpdate', __evalId, p),
    );
    import.meta.hot.on('vite:afterUpdate', (p) =>
        console.log('[app.tsx] vite:afterUpdate', __evalId, p),
    );
}

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

console.log('[app.tsx] calling createInertiaApp', {
    id: __evalId,
    existingRoot: window.__inertiaRoot ? 'present' : 'absent',
});

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
        window.__inertiaSetupCount = (window.__inertiaSetupCount ?? 0) + 1;
        const reuse = Boolean(window.__inertiaRoot);
        console.log('[app.tsx] setup', {
            evalId: __evalId,
            setupCount: window.__inertiaSetupCount,
            elId: el?.id,
            elHasChildren: el?.hasChildNodes(),
            mode: reuse ? 'reusing root' : 'creating root',
        });

        if (!el) {
            console.warn('[app.tsx] setup: el is null, skipping render');
            return;
        }

        const root = window.__inertiaRoot ?? createRoot(el);
        window.__inertiaRoot = root;
        root.render(
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

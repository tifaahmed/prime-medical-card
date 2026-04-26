import { useEffect, useRef } from 'react';

const LOGOS = [
    '/images/homepage/logos/1774541281092_15.png',
    '/images/homepage/logos/246366219_5122001357813970_3090785257126649927_n9ebdd6cb-e752-4bf7-8ee4-aeb4df0a6852.png',
    '/images/homepage/logos/Al%20Mokhtabar.jpg',
    '/images/homepage/logos/download.jpg',
    '/images/homepage/logos/images.jpg',
    '/images/homepage/logos/images.png',
];

const styles = `
  .orbiting-logos-container {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    overflow: hidden;
  }
  .orbiting-logo {
    position: absolute;
    pointer-events: auto;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, filter 0.3s ease;
    will-change: transform, left, top;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    border-radius: 50%;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid rgba(214, 130, 40, 0.5);
    cursor: pointer;
    z-index: 1;
  }
  .orbiting-logo:hover {
    z-index: 100;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
    border-color: rgba(214, 130, 40, 0.9);
  }
  .orbiting-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }
  @media (prefers-reduced-motion: reduce) {
    .orbiting-logo { transition: none; }
  }
`;

type Logo = {
    element: HTMLDivElement;
    angle: number;
    angularSpeed: number;
    radius: number;
    size: number;
    isPaused: boolean;
    isHovered: boolean;
    fixedX: number;
    fixedY: number;
};

export default function OrbitingLogos() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const parent =
            (container.closest('section') as HTMLElement | null) ??
            (container.parentElement as HTMLElement | null);

        if (!parent) {
            return;
        }

        let centerX = 0;
        let centerY = 0;
        let baseRadius = 300;
        let rafId = 0;
        const logos: Logo[] = [];

        const computeCenter = () => {
            const rect = parent.getBoundingClientRect();

            centerX = rect.width / 2;
            centerY = rect.height / 2;
            baseRadius = Math.min(rect.width, rect.height) / 2.6;
        };

        const positionLogo = (l: Logo) => {
            if (l.isHovered) {
                l.element.style.left = `${l.fixedX}px`;
                l.element.style.top = `${l.fixedY}px`;
            } else {
                const x =
                    centerX + Math.cos(l.angle) * l.radius - l.size / 2;
                const y =
                    centerY + Math.sin(l.angle) * l.radius - l.size / 2;

                l.element.style.left = `${x}px`;
                l.element.style.top = `${y}px`;
            }

            l.element.style.width = `${l.size}px`;
            l.element.style.height = `${l.size}px`;
        };

        const createLogo = (src: string, i: number, total: number): Logo => {
            const el = document.createElement('div');

            el.className = 'orbiting-logo';
            const img = document.createElement('img');

            img.src = src;
            img.alt = '';
            img.loading = 'lazy';
            img.decoding = 'async';
            img.onerror = () => {
                el.style.display = 'none';
            };
            el.appendChild(img);

            const logo: Logo = {
                element: el,
                angle: (i / total) * Math.PI * 2,
                angularSpeed: 0.0005 + Math.random() * 0.001,
                radius: baseRadius + (Math.random() - 0.5) * 40,
                size: 48 + Math.random() * 28,
                isPaused: false,
                isHovered: false,
                fixedX: 0,
                fixedY: 0,
            };

            el.addEventListener('mouseenter', () => {
                logo.isHovered = true;
                logo.isPaused = true;
                const x = centerX + Math.cos(logo.angle) * logo.radius;
                const y = centerY + Math.sin(logo.angle) * logo.radius;

                logo.fixedX = x - logo.size / 2;
                logo.fixedY = y - logo.size / 2;
                el.style.transform = 'scale(1.8)';
                el.style.zIndex = '100';
            });
            el.addEventListener('mouseleave', () => {
                logo.isHovered = false;
                logo.isPaused = false;
                el.style.transform = 'scale(1)';
                el.style.zIndex = '1';
            });

            positionLogo(logo);
            container.appendChild(el);

            return logo;
        };

        computeCenter();

        const w = window.innerWidth;
        const count = w < 640 ? 8 : w < 1024 ? 12 : w < 1280 ? 16 : 20;

        for (let i = 0; i < count; i++) {
            logos.push(createLogo(LOGOS[i % LOGOS.length], i, count));
        }

        const tick = () => {
            for (const l of logos) {
                if (!l.isPaused) {
                    l.angle += l.angularSpeed;

                    if (l.angle > Math.PI * 2) {
                        l.angle -= Math.PI * 2;
                    }

                    positionLogo(l);
                }
            }

            rafId = requestAnimationFrame(tick);
        };

        tick();

        const handleResize = () => {
            computeCenter();

            for (const l of logos) {
                positionLogo(l);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', handleResize);

            for (const l of logos) {
                l.element.remove();
            }
        };
    }, []);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            <div
                ref={containerRef}
                className="orbiting-logos-container"
                aria-hidden="true"
            />
        </>
    );
}

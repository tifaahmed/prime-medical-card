import { useEffect, useRef } from 'react';

type Options = {
    speed?: number;
    pauseOnHover?: boolean;
    momentumDecay?: number;
};

export function useMarqueeScroll<T extends HTMLElement>({
    speed = 0.5,
    pauseOnHover = true,
    momentumDecay = 0.94,
}: Options = {}) {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const el = ref.current;

        if (!el) {
            return;
        }

        let raf = 0;
        let hovered = false;
        let dragActive = false;
        let pointerId: number | null = null;
        let startX = 0;
        let startScroll = 0;
        let lastX = 0;
        let lastTime = 0;
        let velocity = 0;
        let moved = false;
        let momentum = false;

        const wrap = () => {
            const half = el.scrollWidth / 2;

            if (half <= 0) {
                return;
            }

            if (el.scrollLeft >= half) {
                el.scrollLeft -= half;
                startScroll -= half;
            } else if (el.scrollLeft < 0) {
                el.scrollLeft += half;
                startScroll += half;
            }
        };

        const step = () => {
            if (momentum && Math.abs(velocity) > 0.05) {
                el.scrollLeft -= velocity;
                velocity *= momentumDecay;
                wrap();
            } else {
                if (momentum) {
                    momentum = false;
                }

                const idle = !dragActive && !(pauseOnHover && hovered);

                if (idle) {
                    el.scrollLeft += speed;
                    wrap();
                }
            }

            raf = requestAnimationFrame(step);
        };

        const onPointerDown = (e: PointerEvent) => {
            if (e.pointerType === 'touch') {
                return;
            }

            dragActive = true;
            momentum = false;
            velocity = 0;
            moved = false;
            pointerId = e.pointerId;
            startX = e.clientX;
            startScroll = el.scrollLeft;
            lastX = e.clientX;
            lastTime = performance.now();
            el.setPointerCapture(e.pointerId);
            el.classList.add('is-dragging');
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!dragActive || pointerId !== e.pointerId) {
                return;
            }

            const dx = e.clientX - startX;

            if (Math.abs(dx) > 4) {
                moved = true;
            }

            const now = performance.now();
            const dt = now - lastTime;

            if (dt > 0) {
                const instant = ((e.clientX - lastX) / dt) * 16;
                velocity = velocity * 0.6 + instant * 0.4;
            }

            lastX = e.clientX;
            lastTime = now;
            el.scrollLeft = startScroll - dx;
            wrap();
        };

        const endDrag = (e: PointerEvent) => {
            if (!dragActive || pointerId !== e.pointerId) {
                return;
            }

            el.releasePointerCapture(e.pointerId);
            el.classList.remove('is-dragging');
            dragActive = false;
            pointerId = null;

            if (Math.abs(velocity) > 0.6) {
                momentum = true;
            }
        };

        const onClickCapture = (e: MouseEvent) => {
            if (moved) {
                e.preventDefault();
                e.stopPropagation();
                moved = false;
            }
        };

        const onEnter = () => {
            hovered = true;
        };
        const onLeave = () => {
            hovered = false;
        };
        const onVisibility = () => {
            hovered = document.hidden ? true : hovered;
        };

        el.addEventListener('pointerdown', onPointerDown);
        el.addEventListener('pointermove', onPointerMove);
        el.addEventListener('pointerup', endDrag);
        el.addEventListener('pointercancel', endDrag);
        el.addEventListener('click', onClickCapture, true);
        el.addEventListener('pointerenter', onEnter);
        el.addEventListener('pointerleave', onLeave);
        document.addEventListener('visibilitychange', onVisibility);

        raf = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(raf);
            el.removeEventListener('pointerdown', onPointerDown);
            el.removeEventListener('pointermove', onPointerMove);
            el.removeEventListener('pointerup', endDrag);
            el.removeEventListener('pointercancel', endDrag);
            el.removeEventListener('click', onClickCapture, true);
            el.removeEventListener('pointerenter', onEnter);
            el.removeEventListener('pointerleave', onLeave);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [speed, pauseOnHover, momentumDecay]);

    return ref;
}

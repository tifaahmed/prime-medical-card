import { useCallback, useRef } from 'react';

export function useDragScroll<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const state = useRef({
        active: false,
        startX: 0,
        startScroll: 0,
        pointerId: null as number | null,
        moved: false,
    });

    const onPointerDown = useCallback((e: React.PointerEvent<T>) => {
        if (e.pointerType === 'touch') {
            return;
        }
        const el = ref.current;
        if (!el) {
            return;
        }
        state.current = {
            active: true,
            startX: e.clientX,
            startScroll: el.scrollLeft,
            pointerId: e.pointerId,
            moved: false,
        };
        el.setPointerCapture(e.pointerId);
        el.classList.add('is-dragging');
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent<T>) => {
        const s = state.current;
        if (!s.active || s.pointerId !== e.pointerId) {
            return;
        }
        const el = ref.current;
        if (!el) {
            return;
        }
        const dx = e.clientX - s.startX;
        if (Math.abs(dx) > 4) {
            s.moved = true;
        }
        el.scrollLeft = s.startScroll - dx;
    }, []);

    const endDrag = useCallback((e: React.PointerEvent<T>) => {
        const s = state.current;
        if (!s.active || s.pointerId !== e.pointerId) {
            return;
        }
        const el = ref.current;
        if (el) {
            el.releasePointerCapture(e.pointerId);
            el.classList.remove('is-dragging');
        }
        state.current = { ...s, active: false, pointerId: null };
    }, []);

    const onClickCapture = useCallback((e: React.MouseEvent<T>) => {
        if (state.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            state.current.moved = false;
        }
    }, []);

    return {
        ref,
        handlers: {
            onPointerDown,
            onPointerMove,
            onPointerUp: endDrag,
            onPointerCancel: endDrag,
            onClickCapture,
        },
    };
}

import { QRCodeSVG } from 'qrcode.react';
import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type PointerEvent as ReactPointerEvent,
    type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

export type TextLayout = { top: number; left: number; fontSize: number; hidden?: boolean };
export type ImageLayout = {
    top: number;
    left: number;
    width: number;
    height: number;
    rounded?: boolean;
    hidden?: boolean;
};

export interface CardLayout {
    first_name: TextLayout;
    full_name: TextLayout;
    work_place: TextLayout;
    company: TextLayout;
    date: TextLayout;
    membership_number: TextLayout;
    photo: ImageLayout;
    qr: ImageLayout;
}

export type LayoutKey = keyof CardLayout;
export type TextKey = 'first_name' | 'full_name' | 'work_place' | 'company' | 'date' | 'membership_number';
export type ImageKey = 'photo' | 'qr';

export const TEXT_KEYS: TextKey[] = [
    'first_name',
    'full_name',
    'work_place',
    'company',
    'date',
    'membership_number',
];
export const IMAGE_KEYS: ImageKey[] = ['photo', 'qr'];

export const LABELS: Record<LayoutKey, string> = {
    first_name: 'الاسم الأول (كبير)',
    full_name: 'الاسم الكامل',
    work_place: 'جهة العمل',
    company: 'اسم الشركة',
    date: 'تاريخ الانتهاء',
    membership_number: 'رقم العضوية',
    photo: 'الصورة',
    qr: 'رمز QR',
};

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function sameOrigin(url: string | null | undefined): string | null {
    if (!url) return null;
    try {
        const u = new URL(url, window.location.origin);
        return u.origin === window.location.origin ? url : null;
    } catch {
        return null;
    }
}

function formatDate(value: string): string {
    if (!value) {
        return '00/00/0000';
    }
    const [year, month, day] = value.split('-');
    if (!year || !month || !day) {
        return value;
    }
    return `${day}/${month}/${year}`;
}

/* ── Draggable text element ── */
function DraggableText({
    children,
    style,
    onPointerDown,
    selected,
}: {
    children: ReactNode;
    style: CSSProperties;
    onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
    selected: boolean;
}) {
    return (
        <div
            onPointerDown={onPointerDown}
            className={cn(
                'absolute cursor-move select-none touch-none',
                selected && 'outline outline-2 outline-blue-500/70',
            )}
            style={style}
        >
            {children}
        </div>
    );
}

/* ── Draggable box element (photo / QR) ── */
function DraggableBox({
    children,
    style,
    onPointerDown,
    selected,
    className,
}: {
    children: ReactNode;
    style: CSSProperties;
    onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
    selected: boolean;
    className?: string;
}) {
    return (
        <div
            onPointerDown={onPointerDown}
            className={cn(
                'absolute cursor-move overflow-hidden touch-none',
                selected && 'outline outline-2 outline-blue-500/70',
                className,
            )}
            style={style}
        >
            {children}
        </div>
    );
}

/* ── Interactive card front preview ── */
export function CardFrontPreview({
    backgroundSrc,
    firstName,
    fullName,
    workPlace,
    companyName,
    expirationDate,
    membershipNumber,
    photoUrl,
    qrValue,
    layout,
    onLayoutChange,
    selected,
    onSelect,
}: {
    backgroundSrc: string;
    firstName: string;
    fullName: string;
    workPlace: string;
    companyName: string;
    expirationDate: string;
    membershipNumber: string;
    photoUrl: string | null;
    qrValue: string;
    layout: CardLayout;
    onLayoutChange: <K extends LayoutKey>(
        key: K,
        patch: Partial<CardLayout[K]>,
    ) => void;
    selected: LayoutKey | null;
    onSelect: (key: LayoutKey | null) => void;
}) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const formattedDate = formatDate(expirationDate);
    const [imgRatio, setImgRatio] = useState<number | null>(null);

    useEffect(() => {
        if (!backgroundSrc) return;
        const img = new Image();
        img.onload = () => {
            if (img.naturalWidth && img.naturalHeight) {
                setImgRatio(img.naturalWidth / img.naturalHeight);
            }
        };
        img.src = backgroundSrc;
    }, [backgroundSrc]);

    const layoutRef = useRef(layout);
    const selectedRef = useRef(selected);
    const onLayoutChangeRef = useRef(onLayoutChange);
    useEffect(() => {
        layoutRef.current = layout;
    }, [layout]);
    useEffect(() => {
        selectedRef.current = selected;
    }, [selected]);
    useEffect(() => {
        onLayoutChangeRef.current = onLayoutChange;
    }, [onLayoutChange]);

    const resizeBy = useCallback((direction: number) => {
        const key = selectedRef.current;
        if (!key) {
            return;
        }
        const item = layoutRef.current[key];
        if ('fontSize' in item) {
            onLayoutChangeRef.current(key, {
                fontSize: clamp(item.fontSize + direction * 0.2, 0.4, 30),
            } as Partial<CardLayout[typeof key]>);
            return;
        }
        const scale = 1 + direction * 0.05;
        onLayoutChangeRef.current(key, {
            width: clamp(item.width * scale, 1, 100),
            height: clamp(item.height * scale, 1, 100),
        } as Partial<CardLayout[typeof key]>);
    }, []);

    const scaleSelected = useCallback(
        (ratio: number, baseline: TextLayout | ImageLayout) => {
            const key = selectedRef.current;
            if (!key) {
                return;
            }
            if ('fontSize' in baseline) {
                onLayoutChangeRef.current(key, {
                    fontSize: clamp(baseline.fontSize * ratio, 0.4, 30),
                } as Partial<CardLayout[typeof key]>);
                return;
            }
            onLayoutChangeRef.current(key, {
                width: clamp(baseline.width * ratio, 1, 100),
                height: clamp(baseline.height * ratio, 1, 100),
            } as Partial<CardLayout[typeof key]>);
        },
        [],
    );

    useEffect(() => {
        const el = cardRef.current;
        if (!el) {
            return;
        }

        const onWheel = (e: WheelEvent) => {
            if (!selectedRef.current) {
                return;
            }
            e.preventDefault();
            resizeBy(-Math.sign(e.deltaY));
        };

        let pinchBaseDistance = 0;
        let pinchBaseline: TextLayout | ImageLayout | null = null;

        const distanceOf = (touches: TouchList): number => {
            const a = touches[0];
            const b = touches[1];
            const dx = a.clientX - b.clientX;
            const dy = a.clientY - b.clientY;
            return Math.hypot(dx, dy);
        };

        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2 && selectedRef.current) {
                e.preventDefault();
                pinchBaseDistance = distanceOf(e.touches);
                const item = layoutRef.current[selectedRef.current];
                pinchBaseline = { ...item } as TextLayout | ImageLayout;
            }
        };

        const onTouchMove = (e: TouchEvent) => {
            if (
                e.touches.length === 2 &&
                pinchBaseline &&
                pinchBaseDistance > 0
            ) {
                e.preventDefault();
                const ratio = distanceOf(e.touches) / pinchBaseDistance;
                scaleSelected(ratio, pinchBaseline);
            }
        };

        const onTouchEnd = () => {
            pinchBaseline = null;
            pinchBaseDistance = 0;
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        el.addEventListener('touchstart', onTouchStart, { passive: false });
        el.addEventListener('touchmove', onTouchMove, { passive: false });
        el.addEventListener('touchend', onTouchEnd);
        el.addEventListener('touchcancel', onTouchEnd);

        return () => {
            el.removeEventListener('wheel', onWheel);
            el.removeEventListener('touchmove', onTouchMove);
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchend', onTouchEnd);
            el.removeEventListener('touchcancel', onTouchEnd);
        };
    }, [resizeBy, scaleSelected]);

    const startDrag = (
        e: ReactPointerEvent<HTMLDivElement>,
        key: LayoutKey,
    ) => {
        if (!e.isPrimary) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        onSelect(key);
        const card = cardRef.current;
        if (!card) {
            return;
        }
        const rect = card.getBoundingClientRect();
        const item = layout[key];
        const startX = e.clientX;
        const startY = e.clientY;
        const startTop = item.top;
        const startLeft = item.left;
        const pointerId = e.pointerId;

        const onMove = (moveE: PointerEvent) => {
            if (moveE.pointerId !== pointerId) {
                return;
            }
            const dx = ((moveE.clientX - startX) / rect.width) * 100;
            const dy = ((moveE.clientY - startY) / rect.height) * 100;
            onLayoutChange(key, {
                top: clamp(startTop + dy, 0, 100),
                left: clamp(startLeft + dx, 0, 100),
            } as Partial<CardLayout[typeof key]>);
        };

        const onUp = (upE: PointerEvent) => {
            if (upE.pointerId !== pointerId) {
                return;
            }
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
    };

    const textStyle = (item: TextLayout): CSSProperties => ({
        position: 'absolute',
        top: `${item.top}%`,
        left: `${item.left}%`,
        right: '4%',
        fontSize: `${item.fontSize}cqi`,
        lineHeight: 1.1,
    });

    const imageStyle = (item: ImageLayout): CSSProperties => ({
        position: 'absolute',
        top: `${item.top}%`,
        left: `${item.left}%`,
        width: `${item.width}%`,
        height: `${item.height}%`,
        ...(item.rounded ? { borderRadius: '50%' } : {}),
    });

    const isSelected = (key: LayoutKey) => selected === key;

    return (
        <div
            ref={cardRef}
            className="relative w-full overflow-hidden border shadow-sm select-none"
            style={{
                aspectRatio: imgRatio ? `${imgRatio}` : '1096 / 686',
                containerType: 'inline-size',
            }}
            dir="ltr"
            onPointerDown={(e) => {
                if (e.target === e.currentTarget) {
                    onSelect(null);
                }
            }}
        >
            <img
                src={backgroundSrc}
                alt=""
                draggable={false}
                className="pointer-events-none h-full w-full"
            />

            {!layout.first_name.hidden && (
                <DraggableText
                    onPointerDown={(e) => startDrag(e, 'first_name')}
                    selected={isSelected('first_name')}
                    style={{
                        ...textStyle(layout.first_name),
                        color: '#0d5b58',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.01em',
                    }}
                >
                    {firstName || '—'}
                </DraggableText>
            )}

            {!layout.full_name.hidden && (
                <DraggableText
                    onPointerDown={(e) => startDrag(e, 'full_name')}
                    selected={isSelected('full_name')}
                    style={{
                        ...textStyle(layout.full_name),
                        color: '#0c1f24',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.01em',
                    }}
                >
                    {fullName || ''}
                </DraggableText>
            )}

            {!layout.work_place.hidden && (
                <DraggableText
                    onPointerDown={(e) => startDrag(e, 'work_place')}
                    selected={isSelected('work_place')}
                    style={{
                        ...textStyle(layout.work_place),
                        color: '#0c1f24',
                        fontWeight: 700,
                    }}
                >
                    {workPlace || ''}
                </DraggableText>
            )}

            {!layout.company.hidden && (
                <DraggableText
                    onPointerDown={(e) => startDrag(e, 'company')}
                    selected={isSelected('company')}
                    style={{
                        ...textStyle(layout.company),
                        color: '#0c1f24',
                        fontWeight: 700,
                    }}
                >
                    {companyName || ''}
                </DraggableText>
            )}

            {!layout.date.hidden && (
                <DraggableText
                    onPointerDown={(e) => startDrag(e, 'date')}
                    selected={isSelected('date')}
                    style={{
                        ...textStyle(layout.date),
                        color: '#0c1f24',
                        fontWeight: 600,
                    }}
                >
                    {formattedDate}
                </DraggableText>
            )}

            {!layout.membership_number.hidden && (
                <DraggableText
                    onPointerDown={(e) => startDrag(e, 'membership_number')}
                    selected={isSelected('membership_number')}
                    style={{
                        ...textStyle(layout.membership_number),
                        color: '#0c1f24',
                        fontWeight: 600,
                    }}
                >
                    {membershipNumber}
                </DraggableText>
            )}

            {!layout.photo.hidden && (
                <DraggableBox
                    onPointerDown={(e) => startDrag(e, 'photo')}
                    selected={isSelected('photo')}
                    style={imageStyle(layout.photo)}
                >
                    {photoUrl ? (
                        <img
                            src={photoUrl}
                            alt=""
                            draggable={false}
                            className="pointer-events-none h-full w-full object-cover"
                        />
                    ) : null}
                </DraggableBox>
            )}

            {!layout.qr.hidden && (
                <DraggableBox
                    onPointerDown={(e) => startDrag(e, 'qr')}
                    selected={isSelected('qr')}
                    className="flex items-center justify-center bg-white"
                    style={{ ...imageStyle(layout.qr), padding: '0.6%' }}
                >
                    <QRCodeSVG
                        value={qrValue}
                        level="M"
                        marginSize={0}
                        style={{
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                        }}
                    />
                </DraggableBox>
            )}
        </div>
    );
}

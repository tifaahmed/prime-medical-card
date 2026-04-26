import { useCallback, useEffect, useRef, useState } from 'react';

type LogoEntry = { src: string; name: string };

// Edit the `name` fields here to control the label that appears when a logo freezes.
const LOGOS: LogoEntry[] = [
    {
        src: '/images/homepage/logos/1774541281092_15.png',
        name: 'شعار ١',
    },
    {
        src: '/images/homepage/logos/246366219_5122001357813970_3090785257126649927_n9ebdd6cb-e752-4bf7-8ee4-aeb4df0a6852.png',
        name: 'شعار ٢',
    },
    {
        src: '/images/homepage/logos/Al%20Mokhtabar.jpg',
        name: 'المختبر',
    },
    {
        src: '/images/homepage/logos/download.jpg',
        name: 'شعار ٤',
    },
    {
        src: '/images/homepage/logos/images.jpg',
        name: 'شعار ٥',
    },
    {
        src: '/images/homepage/logos/images.png',
        name: 'شعار ٦',
    },
];

const styles = `
  .drifting-logos-layer {
    position: absolute;
    inset: 0;
    z-index: 5;
    pointer-events: none;
    overflow: hidden;
  }
  .drifting-logo {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.42;
    filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.15));
    will-change: transform;
    transition: opacity 0.35s ease;
    pointer-events: auto;
    cursor: pointer;
  }
  .drifting-logo:hover {
    opacity: 1;
    z-index: 15;
  }
  .drifting-logo:hover .drifting-logo-circle {
    border-color: rgba(214, 130, 40, 1);
    box-shadow: 0 0 0 3px rgba(214, 130, 40, 0.25);
  }
  .drifting-logo:hover .drifting-logo-label {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  .drifting-logo-circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(214, 130, 40, 0.5);
    background: rgba(255, 255, 255, 0.92);
    will-change: transform;
  }
  .drifting-logo-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }
  .drifting-logo-label {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translate(-50%, -4px);
    background: rgba(12, 20, 35, 0.92);
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2px;
    padding: 4px 10px;
    border-radius: 8px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }
  .drifting-logo.label-above .drifting-logo-label {
    top: auto;
    bottom: calc(100% + 8px);
    transform: translate(-50%, 4px);
  }
  .drifting-logo.is-paused {
    opacity: 1;
    z-index: 10;
  }
  .drifting-logo.is-paused .drifting-logo-circle {
    border-color: rgba(214, 130, 40, 1);
    box-shadow: 0 0 0 3px rgba(214, 130, 40, 0.25);
  }
  .drifting-logo.is-paused .drifting-logo-label {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  .drifting-logo.is-paused.label-above .drifting-logo-label {
    transform: translate(-50%, 0);
  }
  @media (max-width: 640px) {
    .drifting-logo { opacity: 0.3; }
  }
`;

type Wanderer = {
    el: HTMLDivElement;
    circle: HTMLDivElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rot: number;
    rotVel: number;
    size: number;
    revealPaused: boolean;
    hoverPaused: boolean;
};

const MIN_COUNT = 50;
const MAX_V = 1.0;
const MIN_V = 0.25;
const V_JITTER = 0.025;

// Timing controls for the random freeze-and-reveal behavior.
const REVEAL_DELAY_MIN_MS = 2500;
const REVEAL_DELAY_MAX_MS = 5500;
const REVEAL_DURATION_MIN_MS = 1800;
const REVEAL_DURATION_MAX_MS = 2800;

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function signedRand() {
    return Math.random() < 0.5 ? -1 : 1;
}

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}

function initVelocity() {
    const base = rand(MIN_V, MAX_V);
    const angle = Math.random() * Math.PI * 2;

    return {
        vx: Math.cos(angle) * base,
        vy: Math.sin(angle) * base,
    };
}

export default function FloatingLogos({ count = 50 }: { count?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

    const openAt = useCallback((idx: number) => {
        setGalleryIndex(idx);
    }, []);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const isMobile = window.matchMedia('(max-width: 640px)').matches;
        const totalCount = isMobile ? 12 : Math.max(count, MIN_COUNT);

        const wanderers: Wanderer[] = [];
        let width = container.offsetWidth || window.innerWidth;
        let height = container.offsetHeight || window.innerHeight;
        let rafId = 0;
        const timers: number[] = [];

        const createOne = (logo: LogoEntry, logoIndex: number): Wanderer => {
            const el = document.createElement('div');
            el.className = 'drifting-logo';
            el.setAttribute('role', 'button');
            el.setAttribute('aria-label', logo.name);
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                openAt(logoIndex);
            });

            const circle = document.createElement('div');
            circle.className = 'drifting-logo-circle';

            const img = document.createElement('img');
            img.src = logo.src;
            img.alt = logo.name;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.onerror = () => {
                el.style.display = 'none';
            };
            circle.appendChild(img);

            const label = document.createElement('span');
            label.className = 'drifting-logo-label';
            label.textContent = logo.name;

            el.appendChild(circle);
            el.appendChild(label);

            const size = rand(44, 78);
            const { vx, vy } = initVelocity();
            const w: Wanderer = {
                el,
                circle,
                x: rand(0, width - size),
                y: rand(0, height - size),
                vx,
                vy,
                rot: rand(0, 360),
                rotVel: rand(-0.2, 0.2) * signedRand(),
                size,
                revealPaused: false,
                hoverPaused: false,
            };

            const applyHoverPause = () => {
                w.hoverPaused = true;
                if (w.y + w.size + 40 > height) {
                    el.classList.add('label-above');
                } else {
                    el.classList.remove('label-above');
                }
            };
            const releaseHoverPause = () => {
                w.hoverPaused = false;
            };

            el.addEventListener('pointerenter', applyHoverPause);
            el.addEventListener('pointerleave', releaseHoverPause);
            el.addEventListener('pointercancel', releaseHoverPause);

            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            container.appendChild(el);

            return w;
        };

        for (let i = 0; i < totalCount; i++) {
            const idx = i % LOGOS.length;
            wanderers.push(createOne(LOGOS[idx], idx));
        }

        const tick = () => {
            for (const w of wanderers) {
                if (!w.revealPaused && !w.hoverPaused) {
                    w.vx += (Math.random() - 0.5) * V_JITTER;
                    w.vy += (Math.random() - 0.5) * V_JITTER;

                    const speed = Math.hypot(w.vx, w.vy);

                    if (speed > MAX_V) {
                        w.vx = (w.vx / speed) * MAX_V;
                        w.vy = (w.vy / speed) * MAX_V;
                    } else if (speed < MIN_V) {
                        const s = speed || 0.0001;

                        w.vx = (w.vx / s) * MIN_V;
                        w.vy = (w.vy / s) * MIN_V;
                    }

                    w.x += w.vx;
                    w.y += w.vy;
                    w.rot += w.rotVel;

                    if (w.x < 0) {
                        w.x = 0;
                        w.vx = Math.abs(w.vx);
                    } else if (w.x > width - w.size) {
                        w.x = width - w.size;
                        w.vx = -Math.abs(w.vx);
                    }

                    if (w.y < 0) {
                        w.y = 0;
                        w.vy = Math.abs(w.vy);
                    } else if (w.y > height - w.size) {
                        w.y = height - w.size;
                        w.vy = -Math.abs(w.vy);
                    }
                }

                w.el.style.transform = `translate3d(${w.x}px, ${w.y}px, 0)`;
                w.circle.style.transform = `rotate(${w.rot}deg)`;
            }

            rafId = requestAnimationFrame(tick);
        };

        tick();

        const scheduleReveal = () => {
            const delay = rand(REVEAL_DELAY_MIN_MS, REVEAL_DELAY_MAX_MS);

            const startId = window.setTimeout(() => {
                const candidates = wanderers.filter(
                    (w) => !w.revealPaused && !w.hoverPaused,
                );

                if (candidates.length === 0) {
                    scheduleReveal();
                    return;
                }

                const picked =
                    candidates[Math.floor(Math.random() * candidates.length)];

                picked.revealPaused = true;

                if (picked.y + picked.size + 40 > height) {
                    picked.el.classList.add('label-above');
                } else {
                    picked.el.classList.remove('label-above');
                }

                picked.el.classList.add('is-paused');

                const duration = rand(
                    REVEAL_DURATION_MIN_MS,
                    REVEAL_DURATION_MAX_MS,
                );
                const endId = window.setTimeout(() => {
                    picked.revealPaused = false;
                    picked.el.classList.remove('is-paused');
                    scheduleReveal();
                }, duration);

                timers.push(endId);
            }, delay);

            timers.push(startId);
        };

        scheduleReveal();

        const remeasure = () => {
            width = container.offsetWidth || window.innerWidth;
            height = container.offsetHeight || window.innerHeight;

            for (const w of wanderers) {
                w.x = clamp(w.x, 0, Math.max(0, width - w.size));
                w.y = clamp(w.y, 0, Math.max(0, height - w.size));
            }
        };

        const resizeObserver = new ResizeObserver(remeasure);

        resizeObserver.observe(container);
        window.addEventListener('resize', remeasure);

        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        );
        const onReducedChange = () => {
            if (prefersReduced.matches) {
                cancelAnimationFrame(rafId);
            } else {
                tick();
            }
        };

        prefersReduced.addEventListener('change', onReducedChange);
        onReducedChange();

        return () => {
            cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
            window.removeEventListener('resize', remeasure);
            prefersReduced.removeEventListener('change', onReducedChange);

            for (const id of timers) {
                clearTimeout(id);
            }

            for (const w of wanderers) {
                w.el.remove();
            }
        };
    }, [count, openAt]);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            <div
                ref={containerRef}
                className="drifting-logos-layer"
                aria-hidden="true"
            />
            {galleryIndex !== null && (
                <LogoGallery
                    logos={LOGOS}
                    index={galleryIndex}
                    onClose={() => setGalleryIndex(null)}
                    onChange={setGalleryIndex}
                />
            )}
        </>
    );
}

function LogoGallery({
    logos,
    index,
    onClose,
    onChange,
}: {
    logos: LogoEntry[];
    index: number;
    onClose: () => void;
    onChange: (next: number) => void;
}) {
    const current = logos[index];
    const prev = useCallback(
        () => onChange((index - 1 + logos.length) % logos.length),
        [index, logos.length, onChange],
    );
    const next = useCallback(
        () => onChange((index + 1) % logos.length),
        [index, logos.length, onChange],
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft') {
                prev();
            } else if (e.key === 'ArrowRight') {
                next();
            }
        };
        window.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [onClose, prev, next]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={current.name}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <button
                type="button"
                aria-label="إغلاق"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
            </button>

            <button
                type="button"
                aria-label="السابق"
                onClick={(e) => {
                    e.stopPropagation();
                    prev();
                }}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-8"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="15,6 9,12 15,18" />
                </svg>
            </button>

            <button
                type="button"
                aria-label="التالي"
                onClick={(e) => {
                    e.stopPropagation();
                    next();
                }}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-8"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="9,6 15,12 9,18" />
                </svg>
            </button>

            <div
                className="flex max-h-full w-full max-w-xl flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl bg-white/95 p-6 shadow-2xl ring-4 ring-white/20">
                    <img
                        key={current.src}
                        src={current.src}
                        alt={current.name}
                        className="h-full w-full rounded-2xl object-contain"
                    />
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-white sm:text-xl">
                        {current.name}
                    </h3>
                    <p className="mt-1 text-xs text-white/60">
                        {index + 1} / {logos.length}
                    </p>
                </div>
            </div>
        </div>
    );
}

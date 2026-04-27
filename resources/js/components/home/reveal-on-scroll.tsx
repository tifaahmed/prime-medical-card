import { useEffect } from 'react';

const STEP_STAGGER_MS = 800;

export default function useRevealOnScroll() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
        );

        const steps = Array.from(
            document.querySelectorAll<HTMLElement>('.pm-home .step'),
        );
        steps.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition =
                'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
            el.style.transitionDelay = `${i * STEP_STAGGER_MS}ms`;
            observer.observe(el);
        });

        const others = document.querySelectorAll<HTMLElement>(
            '.pm-home .service, .pm-home .plan, .pm-home .testimonial',
        );
        others.forEach((el) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition =
                'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);
}

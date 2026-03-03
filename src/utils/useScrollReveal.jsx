import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations using IntersectionObserver.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for early/late trigger
 * @param {boolean} options.once - If true, stays visible once revealed
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = true } = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.unobserve(el);
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return [ref, isVisible];
}

/**
 * ScrollReveal wrapper component for easy declarative usage.
 * Applies fade-in + slide-up animation with configurable delay.
 */
export function ScrollReveal({ children, delay = 0, className = '', direction = 'up', ...props }) {
    const [ref, isVisible] = useScrollReveal();

    const transforms = {
        up: 'translateY(30px)',
        down: 'translateY(-30px)',
        left: 'translateX(30px)',
        right: 'translateX(-30px)',
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translate(0)' : transforms[direction] || transforms.up,
                transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
            }}
            {...props}
        >
            {children}
        </div>
    );
}

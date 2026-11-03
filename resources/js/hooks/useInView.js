import { useEffect, useRef, useState } from 'react';

// Tells you when an element has scrolled into view (used for the reveal animations).
export default function useInView({ threshold = 0.15 } = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // very old browsers: just show the content
        if (!('IntersectionObserver' in window)) {
            setInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect(); // animate once only
                }
            },
            { threshold, rootMargin: '0px 0px -6% 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, inView];
}

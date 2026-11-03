import { useEffect, useRef, useState } from 'react';

// Fades/slides its children in the first time they scroll into view.
// variant: '' (up) | 'left' | 'right' | 'zoom'     delay: milliseconds
export default function Reveal({ as: Tag = 'div', variant = '', delay = 0, className = '', children, ...rest }) {
    const ref = useRef(null);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!('IntersectionObserver' in window)) {
            setSeen(true);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSeen(true);
                    io.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const v = variant ? `reveal-${variant}` : '';

    return (
        <Tag ref={ref} style={{ '--d': `${delay}ms` }} className={`reveal ${v} ${seen ? 'is-visible' : ''} ${className}`} {...rest}>
            {children}
        </Tag>
    );
}

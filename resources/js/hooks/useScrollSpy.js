import { useEffect, useState } from 'react';

// Returns the id of the section that is currently in the middle of the screen,
// so the navbar can highlight the matching link.
export default function useScrollSpy(ids) {
    const [active, setActive] = useState(null);
    const key = ids.join('|');

    useEffect(() => {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px' }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return active;
}

import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PROFILE } from '@/data/profile';

const LINKS = ['about', 'skills', 'projects', 'contact'];

export default function Navbar() {
    const { component } = usePage();
    const onHome = component === 'Portfolio';
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const [active, setActive] = useState('');

    // shadow + progress bar while scrolling
    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setScrolled(window.scrollY > 10);
            setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // highlight the link of the section currently on screen (home page only)
    useEffect(() => {
        if (!onHome) return;
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: '-45% 0px -50% 0px' }
        );
        LINKS.forEach((id) => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
        });
        return () => io.disconnect();
    }, [onHome]);

    const href = (id) => (onHome ? `#${id}` : `${route('portfolio')}#${id}`);

    return (
        <header className={`clay-navbar fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur' : 'backdrop-blur-sm'}`}>
            <div className="clay-progress absolute bottom-0 left-0 h-[2px] transition-[width] duration-100" style={{ width: `${progress}%` }} />
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20">
                <Link href={route('portfolio')} className="font-display text-2xl font-bold">
                    {PROFILE.firstName}<span className="text-[var(--terra)]">.</span>
                </Link>

                <ul className="hidden items-center gap-9 text-[.95rem] md:flex">
                    {LINKS.map((id) => (
                        <li key={id}>
                            <a href={href(id)} className={`nav-link capitalize ${active === id ? 'active' : ''}`}>{id}</a>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="clay-menu-toggle relative h-10 w-10 md:hidden"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    <span className={`absolute left-2 h-0.5 w-6 bg-[var(--ink)] transition-all duration-300 ${open ? 'top-5 rotate-45' : 'top-3'}`} />
                    <span className={`absolute left-2 top-5 h-0.5 w-6 bg-[var(--ink)] transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
                    <span className={`absolute left-2 h-0.5 w-6 bg-[var(--ink)] transition-all duration-300 ${open ? 'top-5 -rotate-45' : 'top-7'}`} />
                </button>
            </nav>

            {/* mobile drawer */}
            <div className={`clay-drawer overflow-hidden transition-[max-height] duration-300 md:hidden ${open ? 'max-h-80' : 'max-h-0'}`}>
                <ul className="flex flex-col gap-1 p-5">
                    {LINKS.map((id) => (
                        <li key={id}>
                            <a href={href(id)} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 capitalize hover:bg-white">{id}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}

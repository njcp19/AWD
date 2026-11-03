import Reveal from '@/Components/Reveal';

// Reusable section heading: small eyebrow, big serif title, optional subtitle.
export default function SectionTitle({ eyebrow, title, subtitle, accent = false, align = 'center' }) {
    return (
        <Reveal className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
            {eyebrow && <p className={`eyebrow mb-4 ${accent ? 'text-[var(--terra)]' : 'muted'}`}>{eyebrow}</p>}
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h2>
            {subtitle && <p className="muted mx-auto mt-4 max-w-xl text-base leading-relaxed">{subtitle}</p>}
        </Reveal>
    );
}

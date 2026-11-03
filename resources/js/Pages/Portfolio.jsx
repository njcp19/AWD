import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import SectionTitle from '@/Components/SectionTitle';
import Card from '@/Components/Card';
import ProjectCard from '@/Components/ProjectCard';
import ContactForm from '@/Components/ContactForm';
import Reveal from '@/Components/Reveal';
import { PROFILE, SKILLS, TOOLS } from '@/data/profile';

export default function Portfolio({ projects }) {
    const { auth } = usePage().props;
    const [photoOk, setPhotoOk] = useState(true);
    const projectScrollerRef = useRef(null);
    const [canScrollProjectsLeft, setCanScrollProjectsLeft] = useState(false);
    const [canScrollProjectsRight, setCanScrollProjectsRight] = useState(false);

    useEffect(() => {
        const scroller = projectScrollerRef.current;
        if (!scroller || projects.length < 4) return undefined;

        scroller.scrollLeft = 0;

        const updateScrollButtons = () => {
            setCanScrollProjectsLeft(scroller.scrollLeft > 1);
            setCanScrollProjectsRight(scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft > 1);
        };

        updateScrollButtons();
        scroller.addEventListener('scroll', updateScrollButtons, { passive: true });
        window.addEventListener('resize', updateScrollButtons);

        return () => {
            scroller.removeEventListener('scroll', updateScrollButtons);
            window.removeEventListener('resize', updateScrollButtons);
        };
    }, [projects.length]);

    const scrollProjects = (direction) => {
        const scroller = projectScrollerRef.current;
        if (!scroller) return;

        const card = scroller.querySelector('.project-card-item');
        const cardWidth = card?.getBoundingClientRect().width ?? 352;
        scroller.scrollBy({ left: direction * (cardWidth + 28), behavior: 'smooth' });
    };

    return (
        <SiteLayout>
            <Head title={`${PROFILE.name} | Designer & Aspiring Data Analyst`} />

            {/* ───────── HERO ───────── */}
            <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
                <div className="blob palette-blob-sage -right-24 top-24 h-[26rem] w-[26rem]" />
                <div className="blob palette-blob-light-sage -bottom-20 right-1/4 h-80 w-80" style={{ animationDelay: '-4s' }} />
                <div className="blob palette-blob-cream left-[-6rem] top-1/3 h-64 w-64" style={{ animationDelay: '-8s' }} />
                <span aria-hidden="true" className="clay-shape clay-sphere hero-clay-sphere" />
                <span aria-hidden="true" className="clay-shape clay-cube hero-clay-cube" />
                <span aria-hidden="true" className="clay-shape clay-ring hero-clay-ring" />

                <div className="relative mx-auto w-full max-w-6xl px-5 py-16">
                    <div className="hero-in mb-8 inline-flex items-center gap-3 rounded-full bg-[var(--sand)] px-5 py-2.5 text-sm font-medium" style={{ '--d': '100ms' }}>
                        <span className="pulse-dot" />
                        {PROFILE.status} ✦
                    </div>

                    <h1 className="font-display text-[2.6rem] font-bold leading-[1.08] sm:text-6xl lg:text-[5.4rem]">
                        <span className="hero-in block" style={{ '--d': '250ms' }}>
                            Hi, I'm <span className="accent draw-underline">{PROFILE.name}</span>
                        </span>
                        <span className="hero-in block" style={{ '--d': '400ms' }}>Designer</span>
                        <span className="hero-in block" style={{ '--d': '550ms' }}>&amp; Aspiring Data Analyst.</span>
                    </h1>

                    <p className="hero-in muted mt-8 max-w-xl text-lg leading-relaxed" style={{ '--d': '750ms' }}>{PROFILE.intro}</p>

                    <div className="hero-in mt-10 flex flex-wrap gap-4" style={{ '--d': '900ms' }}>
                        <a href="#projects" className="btn">View Work</a>
                        <a href="#contact" className="btn-outline">Get in Touch</a>
                    </div>

                    <a href="#about" className="hero-in muted mt-14 inline-flex items-center gap-2 text-sm tracking-widest" style={{ '--d': '1100ms' }}>
                        <span className="bob">↓</span> scroll
                    </a>
                </div>
            </section>

            {/* ───────── ABOUT ───────── */}
            <section id="about" className="clay-section py-24">
                <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1fr_1.15fr]">
                    <Reveal variant="left" className="relative mx-auto w-full max-w-[20rem] md:max-w-[28rem]">
                        <div className="clay-photo about-photo-frame" style={{ aspectRatio: '892 / 958' }}>
                            {photoOk ? (
                                <img src={PROFILE.photo} alt={PROFILE.name} onError={() => setPhotoOk(false)} className="about-photo-image" />
                            ) : (
                                <div className="clay-photo-fallback font-display flex h-full w-full items-center justify-center text-8xl">NP</div>
                            )}
                        </div>
                        <div className="badge-float absolute -bottom-5 -right-3 rounded-2xl bg-[var(--sand)] px-5 py-3 text-sm font-bold shadow-lg sm:-right-6">
                            No exp.
                        </div>
                    </Reveal>

                    <div>
                        <Reveal><p className="eyebrow muted mb-4">About me</p></Reveal>
                        <Reveal delay={100}>
                            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
                                {PROFILE.aboutTitle[0]} <span className="accent">{PROFILE.aboutTitle[1]}</span> {PROFILE.aboutTitle[2]}
                            </h2>
                        </Reveal>
                        {PROFILE.about.map((p, i) => (
                            <Reveal key={i} delay={200 + i * 100}>
                                <p className="muted mt-6 text-[1.02rem] leading-[1.85]">{p}</p>
                            </Reveal>
                        ))}
                        <ul className="mt-8 space-y-4">
                            {PROFILE.facts.map((f, i) => (
                                <Reveal as="li" key={f.text} delay={450 + i * 100} className="fact-row flex items-center gap-4">
                                    <span className="text-xl">{f.icon}</span>
                                    <span className="font-medium">{f.text}</span>
                                </Reveal>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ───────── SKILLS ───────── */}
            <section id="skills" className="palette-skills-section py-24">
                <div className="mx-auto max-w-6xl px-5">
                    <SectionTitle eyebrow="What I know" accent title="Skills & Tools" />

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {SKILLS.map((s, i) => (
                            <Reveal key={s.title} delay={i * 120} variant="zoom" className="h-full">
                                <Card hover className="skill-card flex h-full flex-col p-7" tabIndex={0}>
                                    <div className="skill-emoji mb-6 text-4xl">{s.icon}</div>
                                    <h3 className="font-display mb-3 text-xl font-bold">{s.title}</h3>
                                    <p className="muted mb-7 flex-1 text-[.95rem] leading-relaxed">{s.text}</p>
                                    <div className="mt-auto">
                                        <div className="mb-2 flex justify-end">
                                            <span className="skill-percentage" style={{ '--skill-level': s.level }} aria-label={`${s.level}%`} />
                                        </div>
                                        <div
                                            className="skill-bar"
                                            style={{ '--w': `${s.level}%` }}
                                            role="progressbar"
                                            aria-label={`${s.title} proficiency`}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-valuenow={s.level}
                                        >
                                            <span />
                                        </div>
                                    </div>
                                </Card>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={200} className="marquee mt-14">
                        <div className="marquee-track">
                            {[...TOOLS, ...TOOLS].map((t, i) => (
                                <span key={i} className="chip whitespace-nowrap px-6 py-2.5 text-sm">{t}</span>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ───────── PROJECTS (from the database) ───────── */}
            <section id="projects" className="clay-section scroll-mt-28 py-24">
                <div className="mx-auto max-w-6xl px-5">
                    <div className={`project-heading ${projects.length >= 4 ? 'has-controls' : ''}`}>
                        <Reveal className="project-heading-title text-center">
                            <p className="eyebrow mb-4 text-[var(--terra)]">My work</p>
                            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Featured Projects</h2>
                        </Reveal>
                        {projects.length >= 4 && (
                            <div className="project-heading-controls flex justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => scrollProjects(-1)}
                                    disabled={!canScrollProjectsLeft}
                                    aria-label="Scroll projects left"
                                    className="project-scroll-button"
                                >
                                    ←
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollProjects(1)}
                                    disabled={!canScrollProjectsRight}
                                    aria-label="Scroll projects right"
                                    className="project-scroll-button"
                                >
                                    →
                                </button>
                            </div>
                        )}
                    </div>

                    {projects.length === 0 ? (
                        <p className="muted text-center">
                            No projects yet.
                            {auth?.user && <> <Link href={route('projects.create')} className="text-[var(--terra)] underline">Add your first project</Link></>}
                        </p>
                    ) : (
                        <div
                            ref={projectScrollerRef}
                            className={`projects-row ${projects.length >= 4 ? 'projects-row--scroll' : 'projects-row--center'}`}
                        >
                            {projects.map((p, i) => (
                                <Reveal key={p.id} delay={(i % 3) * 130} className="project-card-item">
                                    <ProjectCard project={p} />
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ───────── CONTACT ───────── */}
            <section id="contact" className="relative py-24">
                <span aria-hidden="true" className="clay-shape clay-sphere contact-clay-sphere" />
                <span aria-hidden="true" className="clay-shape clay-cube contact-clay-cube" />
                <div className="mx-auto max-w-2xl px-5">
                    <SectionTitle
                        title="Let's Work Together"
                        subtitle="Have a project in mind or just want to connect? Fill out the form below or shoot me an email."
                    />
                    <Reveal delay={100}>
                        <Card className="p-6 sm:p-9">
                            <ContactForm />
                        </Card>
                        <p className="muted mt-6 text-center text-sm">
                            or email me directly at <a href={`mailto:${PROFILE.email}`} className="text-[var(--terra)] underline-offset-4 hover:underline">{PROFILE.email}</a>
                        </p>
                    </Reveal>
                </div>
            </section>
        </SiteLayout>
    );
}

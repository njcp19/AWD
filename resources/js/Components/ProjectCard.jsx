import { Link } from '@inertiajs/react';
import Card from '@/Components/Card';

// One project on the public portfolio. Uses the uploaded image, or a colour gradient when there is none.
export default function ProjectCard({ project }) {
    return (
        <Link
            href={route('work.show', project.id)}
            aria-label={`View ${project.title}`}
            className="project-card-link block h-full w-full rounded-[2rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--terra)]"
        >
            <Card hover className="project-card-root flex h-full w-full min-w-0 flex-col overflow-hidden !p-0">
                <div className="project-image zoom-wrap relative">
                    {project.image_url ? (
                        <img src={project.image_url} alt="" className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                        <div className={`h-full w-full grad-${project.gradient}`} />
                    )}
                    <span className="clay-project-badge absolute bottom-4 left-4 rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest backdrop-blur">
                        {project.category}
                    </span>
                    <span aria-hidden="true" className="project-card-cue">
                        View project →
                    </span>
                </div>

                <div className="project-card-content flex min-w-0 flex-col p-6">
                    <h3 className="font-display mb-3 line-clamp-2 text-xl font-bold">{project.title}</h3>
                    <p className="muted line-clamp-3 text-[.95rem] leading-relaxed">{project.description}</p>
                    <div className="project-card-bottom">
                        <div className="project-card-tags flex flex-wrap items-center gap-2 overflow-hidden">
                            {project.tech_list.map((t) => (
                                <span key={t} className="chip">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

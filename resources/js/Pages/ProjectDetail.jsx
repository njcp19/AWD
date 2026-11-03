import { Head, Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import ProjectCard from '@/Components/ProjectCard';

export default function ProjectDetail({ project, related }) {
    const completedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(`${project.date_completed}T00:00:00`));

    return (
        <SiteLayout>
            <Head title={`${project.title} | Project`} />

            <section className="clay-section min-h-screen py-24">
                <div className="mx-auto max-w-6xl px-5">
                    <Link href={`${route('portfolio')}#projects`} className="icon-link mb-8 inline-flex items-center gap-2 text-[var(--terra)]">
                        <span aria-hidden="true">←</span>
                        Back to projects
                    </Link>

                    <div className="grid items-start gap-10 lg:grid-cols-2">
                        <div className="project-detail-image">
                            {project.image_url ? (
                                <img src={project.image_url} alt={project.title} />
                            ) : (
                                <div className={`project-detail-placeholder grad-${project.gradient}`} />
                            )}
                        </div>

                        <div className="hero-in min-w-0" style={{ '--d': '180ms' }}>
                            <p className="eyebrow mb-3 text-[var(--terra)]">Completed {completedDate}</p>
                            <span className="project-detail-category">{project.category}</span>
                            <h1 className="font-display mb-6 break-words text-4xl font-bold leading-tight sm:text-5xl">
                                {project.title}
                            </h1>
                            <p className="muted whitespace-pre-line break-words text-base leading-relaxed">
                                {project.description}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-2">
                                {project.tech_list.map((technology) => (
                                    <span key={technology} className="chip">{technology}</span>
                                ))}
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {project.project_url && (
                                    <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="btn">
                                        Visit project
                                    </a>
                                )}
                                {project.repository_url && (
                                    <a href={project.repository_url} target="_blank" rel="noopener noreferrer" className="btn-outline">
                                        View source code
                                    </a>
                                )}
                                {!project.project_url && !project.repository_url && (
                                    <p className="muted text-sm">No external links for this project.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {related.length > 0 && (
                        <div className="mt-24">
                            <h2 className="font-display mb-10 text-center text-3xl font-bold sm:text-4xl">More projects</h2>
                            <div className="grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
                                {related.map((relatedProject) => (
                                    <div key={relatedProject.id} className="h-full min-w-0">
                                        <ProjectCard project={relatedProject} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </SiteLayout>
    );
}

import { Head, useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import ProjectForm from '@/Components/ProjectForm';

export default function Edit({ project, categories, gradients }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put', // files cannot be sent with a real PUT, so we POST and Laravel treats it as PUT
        title: project.title,
        category: project.category,
        gradient: project.gradient,
        description: project.description,
        tech_stack: project.tech_stack,
        project_url: project.project_url ?? '',
        repository_url: project.repository_url ?? '',
        image: null, // stays null unless a new file is chosen -> the old image is kept
        date_completed: project.date_completed,
        display_order: project.display_order,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.update', project.id), { forceFormData: true });
    };

    return (
        <SiteLayout>
            <Head title={`Edit ${project.title}`} />
            <div className="mx-auto max-w-2xl px-5 pb-20 pt-32">
                <p className="hero-in eyebrow mb-3 text-[var(--terra)]">Admin / Projects / {project.id}</p>
                <h1 className="hero-in font-display mb-8 text-4xl font-bold" style={{ '--d': '100ms' }}>Edit <span className="accent">Project</span></h1>
                <div className="card hero-in p-6 sm:p-9" style={{ '--d': '200ms' }}>
                    <ProjectForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={submit}
                        submitLabel="Save changes"
                        existingImageUrl={project.image_url}
                        categories={categories}
                        gradients={gradients}
                    />
                </div>
            </div>
        </SiteLayout>
    );
}

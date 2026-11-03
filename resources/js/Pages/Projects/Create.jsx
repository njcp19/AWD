import { Head, useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import ProjectForm from '@/Components/ProjectForm';

export default function Create({ categories, gradients, nextOrder = 1 }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: categories?.[0] ?? 'UI Design',
        gradient: 'green',
        description: '',
        tech_stack: '',
        project_url: '',
        repository_url: '',
        image: null,
        date_completed: '',
        display_order: nextOrder,
    });

    const submit = (e) => {
        e.preventDefault();
        // forceFormData sends the image as multipart/form-data.
        // If validation fails, Inertia keeps `data` and fills `errors` - nothing typed is lost.
        post(route('projects.store'), { forceFormData: true });
    };

    return (
        <SiteLayout>
            <Head title="New Project" />
            <div className="mx-auto max-w-2xl px-5 pb-20 pt-32">
                <p className="hero-in eyebrow mb-3 text-[var(--terra)]">Admin / Projects</p>
                <h1 className="hero-in font-display mb-8 text-4xl font-bold" style={{ '--d': '100ms' }}>New <span className="accent">Project</span></h1>
                <div className="card hero-in p-6 sm:p-9" style={{ '--d': '200ms' }}>
                    <ProjectForm data={data} setData={setData} errors={errors} processing={processing} onSubmit={submit} submitLabel="Create project" categories={categories} gradients={gradients} />
                </div>
            </div>
        </SiteLayout>
    );
}

import { Link } from '@inertiajs/react';
import Field from '@/Components/Field';
import { CATEGORIES, GRADIENTS } from '@/data/profile';

// ONE form used by BOTH Create and Edit. The page owns the data (useForm)
// and passes it in; this component only renders the inputs and the errors.
export default function ProjectForm({ data, setData, errors, processing, onSubmit, submitLabel, existingImageUrl = null, categories = CATEGORIES, gradients = GRADIENTS }) {
    const cls = (name) => `input ${errors[name] ? 'has-error' : ''}`;

    return (
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
            <Field label="Title" htmlFor="title" error={errors.title} required>
                <input id="title" type="text" className={cls('title')} value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="School Student Portal" />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Category" htmlFor="category" error={errors.category} required>
                    <select id="category" className={cls('category')} value={data.category} onChange={(e) => setData('category', e.target.value)}>
                        {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </Field>
                <Field label="Card colour" htmlFor="gradient" error={errors.gradient} hint="Shown when there is no image.">
                    <select id="gradient" className={cls('gradient')} value={data.gradient} onChange={(e) => setData('gradient', e.target.value)}>
                        {gradients.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                </Field>
            </div>

            <Field label="Description" htmlFor="description" error={errors.description} hint="20 to 1000 characters." required>
                <textarea id="description" rows={4} className={cls('description')} value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="What is the project about?" />
            </Field>

            <Field label="Tech stack / tags" htmlFor="tech_stack" error={errors.tech_stack} hint="Separate with commas." required>
                <input id="tech_stack" type="text" className={cls('tech_stack')} value={data.tech_stack} onChange={(e) => setData('tech_stack', e.target.value)} placeholder="UI Design, Figma, Web" />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Project URL" htmlFor="project_url" error={errors.project_url}>
                    <input id="project_url" type="text" className={cls('project_url')} value={data.project_url} onChange={(e) => setData('project_url', e.target.value)} placeholder="https://example.com" />
                </Field>
                <Field label="Repository URL" htmlFor="repository_url" error={errors.repository_url}>
                    <input id="repository_url" type="text" className={cls('repository_url')} value={data.repository_url} onChange={(e) => setData('repository_url', e.target.value)} placeholder="https://github.com/you/repo" />
                </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Date completed" htmlFor="date_completed" error={errors.date_completed} required>
                    <input id="date_completed" type="date" className={cls('date_completed')} value={data.date_completed} onChange={(e) => setData('date_completed', e.target.value)} />
                </Field>
                <Field label="Display order" htmlFor="display_order" error={errors.display_order} hint="1 appears first on the public page." required>
                    <input id="display_order" type="number" className={cls('display_order')} value={data.display_order} onChange={(e) => setData('display_order', e.target.value)} />
                </Field>
            </div>

            <Field label="Image" htmlFor="image" error={errors.image} hint="JPG, PNG or WEBP, max 2 MB. Leave empty to keep the current one.">
                {existingImageUrl && <img src={existingImageUrl} alt="Current project" className="mb-3 h-28 rounded-xl border border-[var(--line)] object-cover" />}
                <input id="image" type="file" accept="image/*" className={cls('image')} onChange={(e) => setData('image', e.target.files[0] ?? null)} />
            </Field>

            <div className="flex flex-wrap items-center gap-3 pt-2">
                <button type="submit" className="btn" disabled={processing}>{processing ? 'Saving...' : submitLabel}</button>
                <Link href={route('projects.index')} className="btn-ghost">Cancel</Link>
            </div>
        </form>
    );
}

import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import ConfirmModal from '@/Components/ConfirmModal';

const rowsPerPage = 5;

export default function Index({ projects }) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const filteredProjects = useMemo(() => {
        const query = search.trim().toLocaleLowerCase();

        if (!query) {
            return projects;
        }

        return projects.filter((project) => {
            const searchable = [
                project.title,
                project.category,
                project.tech_stack,
                ...(project.tech_list ?? []),
            ];

            return searchable.some((value) => String(value ?? '').toLocaleLowerCase().includes(query));
        });
    }, [projects, search]);

    const pageCount = Math.ceil(filteredProjects.length / rowsPerPage);
    const currentPage = Math.min(page, Math.max(pageCount, 1));
    const visibleProjects = filteredProjects.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage,
    );

    const confirmDelete = () => {
        setDeleting(true);
        router.delete(route('projects.destroy', toDelete.id), {
            preserveScroll: true,
            onFinish: () => {
                setDeleting(false);
                setToDelete(null);
            },
        });
    };

    return (
        <SiteLayout>
            <Head title="Manage Projects" />

            <div className="mx-auto max-w-6xl px-5 pb-20 pt-32">
                <div className="hero-in mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="eyebrow mb-3 text-[var(--terra)]">Admin</p>
                        <h1 className="font-display text-4xl font-bold">Manage <span className="accent">Projects</span></h1>
                    </div>
                    <Link href={route('projects.create')} className="btn">+ New project</Link>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="mb-6 flex flex-wrap gap-3">
                    <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search title, category or tech…" className="input max-w-sm" autoComplete="off" />
                    {search && <button type="button" onClick={() => { setSearch(''); setPage(1); }} className="btn-ghost">Clear</button>}
                </form>

                <div className="card min-h-[22rem] overflow-hidden p-0">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <colgroup>
                                <col style={{ width: '3.5rem' }} />
                                <col style={{ width: '6.5rem' }} />
                                <col style={{ width: '14rem' }} />
                                <col style={{ width: '9.5rem' }} />
                                <col style={{ minWidth: '12rem' }} />
                                <col style={{ width: '8.5rem' }} />
                                <col style={{ width: '14rem' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Preview</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Tags</th>
                                    <th>Completed</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.length === 0 && (
                                    <tr><td colSpan={7} className="muted py-12 text-center">No projects found.</td></tr>
                                )}
                                {visibleProjects.map((p) => (
                                    <tr key={p.id}>
                                        <td className="muted">{p.display_order}</td>
                                        <td>
                                            {p.image_url ? (
                                                <img src={p.image_url} alt="" className="h-11 w-16 rounded-lg object-cover" />
                                            ) : (
                                                <div className={`h-11 w-16 rounded-lg grad-${p.gradient}`} />
                                            )}
                                        </td>
                                        <td className="font-display font-bold break-words">{p.title}</td>
                                        <td><span className="chip">{p.category}</span></td>
                                        <td>
                                            <div className="flex max-w-[14rem] flex-wrap gap-1">
                                                {p.tech_list.map((t) => <span key={t} className="chip">{t}</span>)}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap muted">{p.date_completed}</td>
                                        <td className="whitespace-nowrap">
                                            <div className="actions-buttons">
                                                <Link href={route('projects.edit', p.id)} className="btn-ghost btn-sm">Edit</Link>
                                                <button type="button" onClick={() => setToDelete(p)} className="btn-danger btn-sm">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {pageCount > 1 && (
                    <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Pagination">
                        <button type="button" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} className={`${currentPage === 1 ? 'btn-ghost opacity-40' : 'btn-ghost'} btn-sm`}>Previous</button>
                        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                            <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} aria-current={currentPage === pageNumber ? 'page' : undefined} className={`${currentPage === pageNumber ? 'btn' : 'btn-ghost'} btn-sm`}>
                                {pageNumber}
                            </button>
                        ))}
                        <button type="button" onClick={() => setPage(currentPage + 1)} disabled={currentPage === pageCount} className={`${currentPage === pageCount ? 'btn-ghost opacity-40' : 'btn-ghost'} btn-sm`}>Next</button>
                    </nav>
                )}
            </div>

            <ConfirmModal
                show={toDelete !== null}
                title="Delete this project?"
                message={toDelete ? `"${toDelete.title}" will be removed from your portfolio permanently. This cannot be undone.` : ''}
                processing={deleting}
                onConfirm={confirmDelete}
                onCancel={() => setToDelete(null)}
            />
        </SiteLayout>
    );
}

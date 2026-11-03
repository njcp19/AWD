import { Link, usePage } from '@inertiajs/react';
import { PROFILE } from '@/data/profile';

export default function Footer() {
    const { auth } = usePage().props;

    return (
        <footer className="border-t border-[var(--line)] py-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm muted sm:flex-row">
                <p>&copy; {new Date().getFullYear()} {PROFILE.name}. Built with Laravel, Inertia &amp; React.</p>
                {auth?.user ? (
                    <Link href={route('projects.index')} className="underline-offset-4 hover:text-[var(--terra)] hover:underline">Manage projects</Link>
                ) : (
                    <Link href={route('login')} className="underline-offset-4 hover:text-[var(--terra)] hover:underline">Admin login</Link>
                )}
            </div>
        </footer>
    );
}

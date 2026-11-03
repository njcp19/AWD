import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-[var(--terra)] text-[var(--terra)] focus:border-[var(--terra)]'
                    : 'border-transparent text-[var(--muted)] hover:border-[var(--sage)] hover:text-[var(--terra)] focus:border-[var(--sage)] focus:text-[var(--terra)]') +
                className
            }
        >
            {children}
        </Link>
    );
}

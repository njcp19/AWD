import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-[var(--terra)] bg-[var(--light-sage)] text-[var(--ink)] focus:border-[var(--terra)]'
                    : 'border-transparent text-[var(--muted)] hover:border-[var(--sage)] hover:bg-[var(--light-sage)] hover:text-[var(--ink)] focus:border-[var(--sage)] focus:bg-[var(--light-sage)] focus:text-[var(--ink)]'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}

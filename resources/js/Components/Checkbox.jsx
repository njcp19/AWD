export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-[var(--sage)] text-[var(--terra)] shadow-sm focus:ring-[var(--terra)] ' +
                className
            }
        />
    );
}

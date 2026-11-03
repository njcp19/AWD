export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `label block text-sm font-medium ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}

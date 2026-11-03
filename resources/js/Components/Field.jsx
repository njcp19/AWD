// Label + input slot + validation error beside it, so every field looks and behaves the same.
export default function Field({ label, htmlFor, error, hint, required = false, children }) {
    return (
        <div>
            <label htmlFor={htmlFor} className="label">
                {label}
                {required && <span className="text-[var(--terra)]"> *</span>}
            </label>
            {children}
            {hint && !error && <p className="muted mt-1.5 text-xs">{hint}</p>}
            {error && <p className="error" role="alert">{error}</p>}
        </div>
    );
}

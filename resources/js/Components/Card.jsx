// White rounded panel. `hover` adds the lift + shadow effect.
export default function Card({ children, className = '', hover = false, ...props }) {
    return (
        <div className={`card ${hover ? 'card-hover' : ''} ${className}`} {...props}>
            {children}
        </div>
    );
}

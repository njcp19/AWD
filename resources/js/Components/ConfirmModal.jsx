// Confirmation step shown before a record is deleted.
export default function ConfirmModal({ show, title, message, confirmLabel = 'Delete', processing = false, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1f2d22]/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
            <div className="modal w-full max-w-md p-7">
                <div className="modal-icon mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl">🗑️</div>
                <h3 className="font-display mb-2 text-2xl font-bold">{title}</h3>
                <p className="muted mb-7 text-[.95rem] leading-relaxed">{message}</p>
                <div className="flex justify-end gap-3">
                    <button type="button" className="btn-ghost" onClick={onCancel} disabled={processing}>Cancel</button>
                    <button type="button" className="btn-danger" onClick={onConfirm} disabled={processing}>
                        {processing ? 'Deleting...' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

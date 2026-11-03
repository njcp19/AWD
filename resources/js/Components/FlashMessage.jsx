import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Shows the one-time "success" message sent by the controller, then hides itself.
export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!flash?.success) return;
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 4500);
        return () => clearTimeout(timer);
    }, [flash]);

    if (!visible || !flash?.success) return null;

    return (
        <div role="status" className="toast fixed right-4 top-24 z-[70] flex max-w-sm items-start gap-3 rounded-2xl px-5 py-4 text-sm">
            <span className="toast-icon mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs">✓</span>
            <p className="flex-1">{flash.success}</p>
            <button type="button" onClick={() => setVisible(false)} className="muted hover:text-[var(--ink)]" aria-label="Dismiss">×</button>
        </div>
    );
}

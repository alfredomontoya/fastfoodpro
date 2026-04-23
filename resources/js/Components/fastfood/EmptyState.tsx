import type { ReactNode } from 'react';

interface EmptyStateProps {
    title: string;
    description: string;
    action?: ReactNode;
}

export default function EmptyState({
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/80 px-8 py-12 text-center shadow-sm">
            <div className="mx-auto max-w-xl space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                    FASTFOOD
                </p>
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {title}
                </h3>
                <p className="text-sm leading-7 text-slate-600">{description}</p>
                {action && <div className="pt-4">{action}</div>}
            </div>
        </div>
    );
}

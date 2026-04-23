interface MetricCardProps {
    label: string;
    value: string;
    hint: string;
}

export default function MetricCard({ label, value, hint }: MetricCardProps) {
    return (
        <div className="rounded-3xl border border-slate-200/70 bg-slate-950 px-5 py-5 text-white shadow-[0_24px_50px_-32px_rgba(15,23,42,0.9)]">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                {label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
            <p className="mt-2 text-sm text-slate-400">{hint}</p>
        </div>
    );
}

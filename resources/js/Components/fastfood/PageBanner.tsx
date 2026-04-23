import type { PropsWithChildren, ReactNode } from 'react';

interface PageBannerProps extends PropsWithChildren {
    eyebrow: string;
    title: string;
    description: string;
    actions?: ReactNode;
}

export default function PageBanner({
    eyebrow,
    title,
    description,
    actions,
    children,
}: PageBannerProps) {
    return (
        <section className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-500">
                        {eyebrow}
                    </p>
                    <div className="space-y-3">
                        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                            {title}
                        </h1>
                        <p className="max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                            {description}
                        </p>
                    </div>
                </div>

                {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
            </div>

            {children && <div className="mt-8 grid gap-4 md:grid-cols-3">{children}</div>}
        </section>
    );
}

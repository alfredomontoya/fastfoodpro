import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const navigation = [
        {
            label: 'Dashboard',
            href: route('dashboard'),
            active: route().current('dashboard'),
        },
        {
            label: 'POS',
            href: route('catalog.visual'),
            active: route().current('catalog.visual'),
        },
        {
            label: 'Categorias',
            href: route('categories.index'),
            active: route().current('categories.*'),
        },
        {
            label: 'Productos',
            href: route('products.index'),
            active: route().current('products.*'),
        },
        {
            label: 'Perfil',
            href: route('profile.edit'),
            active: route().current('profile.*'),
        },
    ];

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_25%),linear-gradient(180deg,#fff7ed_0%,#f8fafc_48%,#eef2ff_100%)]">
            <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:grid-cols-[280px,1fr] lg:px-6">
                <aside className="overflow-hidden rounded-[2rem] border border-white/60 bg-slate-950 px-6 py-8 text-white shadow-[0_32px_80px_-40px_rgba(15,23,42,0.95)]">
                    <Link href={route('dashboard')} className="flex items-center gap-3">
                        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                            <ApplicationLogo className="h-8 w-8 fill-current text-white" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-300">
                                FASTFOOD
                            </p>
                            <p className="text-sm text-slate-400">
                                Punto de venta visual
                            </p>
                        </div>
                    </Link>

                    <div className="mt-10 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                                    item.active
                                        ? 'bg-white text-slate-950 shadow-lg'
                                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <span>{item.label}</span>
                                {item.active && (
                                    <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-600">
                                        Activo
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                            Sesion
                        </p>
                        <div className="mt-4">
                            <p className="text-lg font-semibold">{user.name}</p>
                            <p className="text-sm text-slate-400">{user.email}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="rounded-full bg-orange-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                                {user.role}
                            </span>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm text-slate-300 transition hover:text-white"
                            >
                                Cerrar sesion
                            </Link>
                        </div>
                    </div>
                </aside>

                <div className="space-y-6 py-2">
                    {flash.status && (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800 shadow-sm">
                            {flash.status}
                        </div>
                    )}

                    {header}

                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}

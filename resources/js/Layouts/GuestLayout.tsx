import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.30),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.22),_transparent_30%),linear-gradient(135deg,#fff7ed_0%,#f8fafc_50%,#eef2ff_100%)] px-4 py-6 md:px-8">
            <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/70 shadow-[0_32px_90px_-40px_rgba(15,23,42,0.65)] backdrop-blur xl:grid-cols-[1.05fr,0.95fr]">
                <div className="relative hidden overflow-hidden bg-slate-950 px-10 py-12 text-white xl:block">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.35),_transparent_25%),radial-gradient(circle_at_bottom,_rgba(249,115,22,0.32),_transparent_30%)]" />
                    <div className="relative flex h-full flex-col justify-between">
                        <div className="space-y-8">
                            <Link href={route('home')} className="inline-flex items-center gap-3">
                                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                                    <ApplicationLogo className="h-8 w-8 fill-current text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-300">
                                        FASTFOOD
                                    </p>
                                    <p className="text-sm text-slate-300">
                                        Gestion comercial moderna
                                    </p>
                                </div>
                            </Link>

                            <div className="space-y-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-300">
                                    Control centralizado
                                </p>
                                <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight">
                                    Ventas rapidas, catalogo visual y operacion limpia.
                                </h1>
                                <p className="max-w-lg text-base leading-8 text-slate-300">
                                    Un panel hecho para atender pedidos, administrar
                                    productos y tomar decisiones con velocidad.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                                    Catalogo
                                </p>
                                <p className="mt-3 text-lg font-semibold">
                                    Interfaces visuales tipo app de pedidos
                                </p>
                            </div>
                            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                                    Operacion
                                </p>
                                <p className="mt-3 text-lg font-semibold">
                                    Arquitectura lista para crecer por modulos
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center px-6 py-10 md:px-12">
                    <div className="w-full max-w-xl">{children}</div>
                </div>
            </div>
        </div>
    );
}

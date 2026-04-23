import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MetricCard from '@/Components/fastfood/MetricCard';
import PageBanner from '@/Components/fastfood/PageBanner';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <PageBanner
                    eyebrow="Centro de control"
                    title="Panel principal de FASTFOOD"
                    description="Desde aqui centralizas la configuracion del catalogo y preparas el terreno para ventas, clientes y caja con una experiencia visual mas clara."
                    actions={
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={route('categories.index')}
                                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                            >
                                Ver categorias
                            </Link>
                            <Link
                                href={route('products.index')}
                                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-orange-200 hover:text-orange-600"
                            >
                                Explorar productos
                            </Link>
                        </div>
                    }
                >
                    <MetricCard
                        label="Estado"
                        value="Base lista"
                        hint="Autenticacion, roles y password obligatorio ya integrados."
                    />
                    <MetricCard
                        label="Catalogo"
                        value="2 modulos"
                        hint="Categorias y productos ya pueden gestionarse desde UI."
                    />
                    <MetricCard
                        label="Sesion"
                        value={auth.user.role}
                        hint="Tu rol actual define el nivel de edicion disponible."
                    />
                </PageBanner>
            }
        >
            <Head title="Dashboard" />

            <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
                <section className="rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.55)] backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
                        Siguiente fase
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                        El catalogo ya esta listo para ser conectado con ventas.
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                        La siguiente iteracion natural es clientes, ventas y pagos.
                        La base visual y la arquitectura separada ya quedaron
                        listas para escalar sin meter logica en controllers.
                    </p>
                </section>

                <section className="rounded-[2rem] border border-slate-200/70 bg-slate-950 p-8 text-white shadow-[0_24px_50px_-32px_rgba(15,23,42,0.9)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                        Operador activo
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold">
                        {auth.user.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">{auth.user.email}</p>
                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                        Usa el menu lateral para administrar categorias y
                        productos. Si entras como `ADMIN`, podras crear, editar
                        y eliminar elementos del catalogo.
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}

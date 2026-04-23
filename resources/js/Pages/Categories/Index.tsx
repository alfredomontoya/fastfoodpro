import EmptyState from '@/Components/fastfood/EmptyState';
import MetricCard from '@/Components/fastfood/MetricCard';
import PageBanner from '@/Components/fastfood/PageBanner';
import Pagination from '@/Components/fastfood/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { categoryGradient } from '@/services/catalog';
import type { Category, PaginatedResponse } from '@/types/catalog';
import type { PageProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';

interface CategoriesIndexProps extends PageProps {
    categories: PaginatedResponse<Category>;
    filters: {
        search?: string | null;
    };
}

export default function CategoriesIndex({
    categories,
    filters,
}: CategoriesIndexProps) {
    const { auth } = usePage<PageProps>().props;
    const canManage = auth.user.role === 'ADMIN';

    return (
        <AuthenticatedLayout
            header={
                <PageBanner
                    eyebrow="Modulo de categorias"
                    title="Organiza el menu con una estructura clara."
                    description="Cada categoria actua como punto de entrada visual para tu catalogo de productos. Aqui puedes agrupar hamburguesas, combos, bebidas o cualquier linea comercial."
                    actions={
                        canManage ? (
                            <Link
                                href={route('categories.create')}
                                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                            >
                                Nueva categoria
                            </Link>
                        ) : null
                    }
                >
                    <MetricCard
                        label="Categorias"
                        value={String(categories.total)}
                        hint="Total registradas actualmente en el catalogo."
                    />
                    <MetricCard
                        label="Pagina"
                        value={`${categories.current_page}/${categories.last_page}`}
                        hint="Navegacion paginada para crecer sin ruido."
                    />
                    <MetricCard
                        label="Edicion"
                        value={canManage ? 'ADMIN' : 'LECTURA'}
                        hint="Solo administradores pueden modificar este modulo."
                    />
                </PageBanner>
            }
        >
            <Head title="Categorias" />

            <div className="space-y-6">
                <section className="rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.55)] backdrop-blur">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-900">
                                Buscador de categorias
                            </p>
                            <p className="text-sm text-slate-500">
                                Filtra rapidamente por nombre.
                            </p>
                        </div>

                        <div className="flex w-full max-w-xl gap-3">
                            <input
                                type="text"
                                defaultValue={filters.search ?? ''}
                                placeholder="Ej. hamburguesas, bebidas, combos"
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        router.get(
                                            route('categories.index'),
                                            {
                                                search: (
                                                    event.target as HTMLInputElement
                                                ).value,
                                            },
                                            { preserveState: true, replace: true },
                                        );
                                    }
                                }}
                                className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                            />
                            <Link
                                href={route('categories.index')}
                                className="rounded-full border border-slate-200 px-5 py-3 text-sm text-slate-600 transition hover:border-orange-200 hover:text-orange-600"
                            >
                                Limpiar
                            </Link>
                        </div>
                    </div>
                </section>

                {categories.data.length === 0 ? (
                    <EmptyState
                        title="Aun no hay categorias cargadas"
                        description="Empieza creando la primera categoria para estructurar el catalogo visual de FASTFOOD."
                        action={
                            canManage ? (
                                <Link
                                    href={route('categories.create')}
                                    className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                                >
                                    Crear primera categoria
                                </Link>
                            ) : null
                        }
                    />
                ) : (
                    <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
                        {categories.data.map((category) => (
                            <article
                                key={category.id}
                                className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.55)]"
                            >
                                <div
                                    className={`relative flex h-52 items-end bg-gradient-to-br ${categoryGradient(
                                        category.name,
                                    )} p-5`}
                                >
                                    {category.image_url ? (
                                        <img
                                            src={category.image_url}
                                            alt={category.name}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    ) : null}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                                    <div className="relative flex w-full items-end justify-between">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                                                Categoria
                                            </p>
                                            <h3 className="mt-2 text-2xl font-semibold text-white">
                                                {category.name}
                                            </h3>
                                        </div>
                                        <div className="rounded-full bg-white/15 px-3 py-2 text-sm font-medium text-white backdrop-blur">
                                            {category.products_count ?? 0} productos
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 p-5">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                                            Estado
                                        </p>
                                        <p className="mt-2 text-sm font-medium text-slate-700">
                                            Disponible para el catalogo visual
                                        </p>
                                    </div>

                                    {canManage && (
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route('categories.edit', category.id)}
                                                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-orange-200 hover:text-orange-600"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            `Se eliminara la categoria "${category.name}".`,
                                                        )
                                                    ) {
                                                        router.delete(
                                                            route(
                                                                'categories.destroy',
                                                                category.id,
                                                            ),
                                                        );
                                                    }
                                                }}
                                                className="rounded-full border border-rose-200 px-4 py-2 text-sm text-rose-600 transition hover:bg-rose-50"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </section>
                )}

                <Pagination links={categories.links} />
            </div>
        </AuthenticatedLayout>
    );
}

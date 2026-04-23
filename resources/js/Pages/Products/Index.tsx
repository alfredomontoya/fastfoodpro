import EmptyState from '@/Components/fastfood/EmptyState';
import MetricCard from '@/Components/fastfood/MetricCard';
import PageBanner from '@/Components/fastfood/PageBanner';
import Pagination from '@/Components/fastfood/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { categoryGradient, formatCurrency } from '@/services/catalog';
import type { Category, PaginatedResponse, Product } from '@/types/catalog';
import type { PageProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';

interface ProductsIndexProps extends PageProps {
    products: PaginatedResponse<Product>;
    categories: Pick<Category, 'id' | 'name'>[];
    filters: {
        search?: string | null;
        category_id?: number | null;
    };
}

export default function ProductsIndex({
    products,
    categories,
    filters,
}: ProductsIndexProps) {
    const { auth } = usePage<PageProps>().props;
    const canManage = auth.user.role === 'ADMIN';

    const applyFilters = (payload: { search?: string; category_id?: number | '' }) => {
        router.get(
            route('products.index'),
            {
                search: payload.search ?? filters.search ?? '',
                category_id:
                    payload.category_id === ''
                        ? null
                        : payload.category_id ?? filters.category_id ?? null,
            },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <PageBanner
                    eyebrow="Catalogo de productos"
                    title="Convierte el menu en una vitrina comercial."
                    description="Gestiona productos con fotos, descripcion, precio y categoria. La interfaz esta pensada para sentirse cercana a una app de pedidos."
                    actions={
                        canManage ? (
                            <Link
                                href={route('products.create')}
                                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                            >
                                Nuevo producto
                            </Link>
                        ) : null
                    }
                >
                    <MetricCard
                        label="Productos"
                        value={String(products.total)}
                        hint="Items activos en el catalogo visual."
                    />
                    <MetricCard
                        label="Categorias"
                        value={String(categories.length)}
                        hint="Tipos de menu disponibles para filtrar."
                    />
                    <MetricCard
                        label="Precio medio"
                        value={
                            products.data.length > 0
                                ? formatCurrency(
                                      products.data.reduce(
                                          (sum, product) =>
                                              sum + Number(product.price),
                                          0,
                                      ) / products.data.length,
                                  )
                                : formatCurrency(0)
                        }
                        hint="Promedio de la pagina actual del catalogo."
                    />
                </PageBanner>
            }
        >
            <Head title="Productos" />

            <div className="space-y-6">
                <section className="rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.55)] backdrop-blur">
                    <div className="grid gap-4 lg:grid-cols-[1fr,280px]">
                        <input
                            type="text"
                            defaultValue={filters.search ?? ''}
                            placeholder="Buscar por nombre o descripcion"
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    applyFilters({
                                        search: (event.target as HTMLInputElement)
                                            .value,
                                    });
                                }
                            }}
                            className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                        />

                        <select
                            defaultValue={filters.category_id ?? ''}
                            onChange={(event) =>
                                applyFilters({
                                    category_id: event.target.value
                                        ? Number(event.target.value)
                                        : '',
                                })
                            }
                            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                        >
                            <option value="">Todas las categorias</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                {products.data.length === 0 ? (
                    <EmptyState
                        title="No hay productos para mostrar"
                        description="Carga los primeros productos del menu y utiliza el filtro por categoria para convertir esta vista en un catalogo rapido para ventas."
                        action={
                            canManage ? (
                                <Link
                                    href={route('products.create')}
                                    className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                                >
                                    Crear primer producto
                                </Link>
                            ) : null
                        }
                    />
                ) : (
                    <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
                        {products.data.map((product) => (
                            <article
                                key={product.id}
                                className="group overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:shadow-[0_32px_70px_-36px_rgba(15,23,42,0.65)]"
                            >
                                <div
                                    className={`relative h-64 overflow-hidden bg-gradient-to-br ${categoryGradient(
                                        product.category.name,
                                    )}`}
                                >
                                    {product.image_url ? (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-end p-6">
                                            <div className="rounded-3xl bg-slate-950/75 px-5 py-4 text-white backdrop-blur">
                                                <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                                                    Producto
                                                </p>
                                                <p className="mt-2 text-2xl font-semibold">
                                                    {product.name}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                                    <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                                            {product.category.name}
                                        </span>
                                        <span className="rounded-full bg-slate-950/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                                            {formatCurrency(product.price)}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4 p-5">
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-950">
                                            {product.name}
                                        </h3>
                                        <p className="mt-2 text-sm leading-7 text-slate-600">
                                            {product.description ||
                                                'Sin descripcion registrada por ahora.'}
                                        </p>
                                    </div>

                                    {canManage && (
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route('products.edit', product.id)}
                                                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-orange-200 hover:text-orange-600"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            `Se eliminara el producto "${product.name}".`,
                                                        )
                                                    ) {
                                                        router.delete(
                                                            route(
                                                                'products.destroy',
                                                                product.id,
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

                <Pagination links={products.links} />
            </div>
        </AuthenticatedLayout>
    );
}

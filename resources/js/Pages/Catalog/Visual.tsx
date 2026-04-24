import CategoryEditorModal from '@/Components/catalog/CategoryEditorModal';
import ProductEditorModal from '@/Components/catalog/ProductEditorModal';
import EmptyState from '@/Components/fastfood/EmptyState';
import MetricCard from '@/Components/fastfood/MetricCard';
import PageBanner from '@/Components/fastfood/PageBanner';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { categoryGradient, formatCurrency } from '@/services/catalog';
import type { PageProps } from '@/types';
import type { Category, Product } from '@/types/catalog';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { startTransition, useDeferredValue, useState } from 'react';

interface CatalogVisualProps extends PageProps {
    categories: Category[];
    products: Product[];
    selectedCategory: Category | null;
    filters: {
        category_id?: number | null;
    };
}

type CategoryModalState =
    | { mode: 'create'; category?: null }
    | { mode: 'edit'; category: Category }
    | null;

type ProductModalState =
    | { mode: 'create'; product?: null }
    | { mode: 'edit'; product: Product }
    | null;

export default function CatalogVisual({
    categories,
    products,
    selectedCategory,
    filters,
}: CatalogVisualProps) {
    const { auth } = usePage<PageProps>().props;
    const canManage = auth.user.role === 'ADMIN';
    const [categorySearch, setCategorySearch] = useState('');
    const [productSearch, setProductSearch] = useState('');
    const [categoryModal, setCategoryModal] = useState<CategoryModalState>(null);
    const [productModal, setProductModal] = useState<ProductModalState>(null);
    const deferredCategorySearch = useDeferredValue(categorySearch);
    const deferredProductSearch = useDeferredValue(productSearch);
    const redirectTo = selectedCategory
        ? route('catalog.visual', { category_id: selectedCategory.id })
        : route('catalog.visual');

    const visibleCategories = categories.filter((category) => {
        const term = deferredCategorySearch.trim().toLowerCase();

        if (!term) {
            return true;
        }

        return [category.name, category.description ?? '']
            .join(' ')
            .toLowerCase()
            .includes(term);
    });

    const visibleProducts = products.filter((product) => {
        const term = deferredProductSearch.trim().toLowerCase();

        if (!term) {
            return true;
        }

        return [product.name, product.description ?? '']
            .join(' ')
            .toLowerCase()
            .includes(term);
    });

    const selectCategory = (categoryId: number | null) => {
        startTransition(() => {
            router.get(
                route('catalog.visual'),
                categoryId ? { category_id: categoryId } : {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ['filters', 'selectedCategory', 'products'],
                },
            );
        });
    };

    const submitDelete = (
        resource: 'category' | 'product',
        id: number,
        label: string,
    ) => {
        const messages = {
            category: `Se eliminara la categoria "${label}".`,
            product: `Se eliminara el producto "${label}".`,
        };

        if (!confirm(messages[resource])) {
            return;
        }

        router.delete(
            route(resource === 'category' ? 'categories.destroy' : 'products.destroy', id),
            {
                data: { redirect_to: redirectTo },
                preserveScroll: true,
            },
        );
    };

    const toggleStatus = (
        resource: 'category' | 'product',
        id: number,
        redirectOverride?: string,
    ) => {
        router.patch(
            route(
                resource === 'category'
                    ? 'categories.toggle-status'
                    : 'products.toggle-status',
                id,
            ),
            {
                redirect_to: redirectOverride ?? redirectTo,
            },
            { preserveScroll: true },
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <PageBanner
                    eyebrow="Catalogo operativo"
                    title="Interfaz tipo POS para navegar el menu con velocidad."
                    description="Selecciona una categoria, revisa el inventario visual y gestiona altas o ajustes sin salir de la misma pantalla."
                    actions={
                        <div className="flex flex-wrap gap-3">
                            {canManage ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCategoryModal({ mode: 'create' })
                                    }
                                    className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                                >
                                    Nueva categoria
                                </button>
                            ) : null}
                            {canManage ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setProductModal({ mode: 'create' })
                                    }
                                    disabled={!selectedCategory}
                                    className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Nuevo producto
                                </button>
                            ) : null}
                        </div>
                    }
                >
                    <MetricCard
                        label="Categorias"
                        value={String(categories.filter((item) => item.is_active).length)}
                        hint="Categorias activas listas para operar."
                    />
                    <MetricCard
                        label="Productos visibles"
                        value={String(products.length)}
                        hint="Solo productos activos de la categoria seleccionada."
                    />
                    <MetricCard
                        label="Seleccion"
                        value={selectedCategory?.name ?? 'Sin categoria'}
                        hint="Cambia de categoria para refrescar el panel derecho."
                    />
                </PageBanner>
            }
        >
            <Head title="Catalogo POS" />

            <div className="grid gap-6 xl:grid-cols-[360px,1fr]">
                <section className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.55)]">
                    <div className="border-b border-slate-100 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_55%,#ffedd5_100%)] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
                            Panel categorias
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                            Maestro
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Activa una categoria para revelar sus productos en el
                            panel de detalle.
                        </p>
                        <input
                            type="text"
                            value={categorySearch}
                            onChange={(event) =>
                                setCategorySearch(event.target.value)
                            }
                            placeholder="Buscar categorias"
                            className="mt-4 w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                        />
                    </div>

                    <div className="max-h-[calc(100vh-17rem)] space-y-3 overflow-y-auto p-4">
                        {visibleCategories.length === 0 ? (
                            <EmptyState
                                title="No hay categorias para mostrar"
                                description="Prueba otra busqueda o crea una categoria nueva para iniciar el flujo de venta visual."
                            />
                        ) : (
                            visibleCategories.map((category) => {
                                const isSelected =
                                    filters.category_id === category.id;
                                const isActive = category.is_active ?? true;

                                return (
                                    <article
                                        key={category.id}
                                        className={`overflow-hidden rounded-[1.75rem] border transition ${
                                            isSelected
                                                ? 'border-orange-300 bg-orange-50/80 shadow-lg shadow-orange-100/70'
                                                : 'border-slate-200 bg-white'
                                        } ${!isActive ? 'opacity-70' : ''}`}
                                    >
                                        <button
                                            type="button"
                                            disabled={!isActive}
                                            onClick={() => selectCategory(category.id)}
                                            className="block w-full text-left disabled:cursor-not-allowed"
                                        >
                                            <div
                                                className={`relative h-36 bg-gradient-to-br ${categoryGradient(
                                                    category.name,
                                                )}`}
                                            >
                                                {category.image_url ? (
                                                    <img
                                                        src={category.image_url}
                                                        alt={category.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : null}
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                                                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                                                    <div>
                                                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                                                            Categoria
                                                        </p>
                                                        <p className="mt-2 text-xl font-semibold text-white">
                                                            {category.name}
                                                        </p>
                                                    </div>
                                                    <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                                                        {isActive ? 'Activa' : 'Pausa'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-3 p-4">
                                                <p className="text-sm leading-6 text-slate-600">
                                                    {category.description ||
                                                        'Sin descripcion registrada.'}
                                                </p>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                                                        {category.active_products_count ?? 0} visibles
                                                    </span>
                                                    <span className="text-slate-500">
                                                        {category.products_count ?? 0} total
                                                    </span>
                                                </div>
                                            </div>
                                        </button>

                                        {canManage ? (
                                            <div className="flex flex-wrap gap-2 border-t border-slate-100 px-4 py-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setCategoryModal({
                                                            mode: 'edit',
                                                            category,
                                                        })
                                                    }
                                                    className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-orange-200 hover:text-orange-600"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleStatus(
                                                            'category',
                                                            category.id,
                                                            route('catalog.visual'),
                                                        )
                                                    }
                                                    className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-amber-200 hover:text-amber-700"
                                                >
                                                    {isActive
                                                        ? 'Desactivar'
                                                        : 'Activar'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        submitDelete(
                                                            'category',
                                                            category.id,
                                                            category.name,
                                                        )
                                                    }
                                                    className="rounded-full border border-rose-200 px-4 py-2 text-sm text-rose-600 transition hover:bg-rose-50"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        ) : null}
                                    </article>
                                );
                            })
                        )}
                    </div>
                </section>

                <section className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.55)]">
                    <div className="border-b border-slate-100 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_55%,#dbeafe_100%)] p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">
                                    Panel productos
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                                    {selectedCategory
                                        ? selectedCategory.name
                                        : 'Detalle'}
                                </h2>
                                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                                    {selectedCategory
                                        ? selectedCategory.description ||
                                          'Catalogo activo para esta categoria.'
                                        : 'Selecciona una categoria activa para cargar el detalle de productos.'}
                                </p>
                            </div>

                            {selectedCategory ? (
                                <div className="w-full max-w-sm">
                                    <input
                                        type="text"
                                        value={productSearch}
                                        onChange={(event) =>
                                            setProductSearch(event.target.value)
                                        }
                                        placeholder="Buscar producto en esta categoria"
                                        className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="max-h-[calc(100vh-17rem)] overflow-y-auto p-5">
                        {!selectedCategory ? (
                            <EmptyState
                                title="Seleccione una categoria"
                                description="El panel derecho se activara automaticamente cuando elijas una categoria del maestro."
                                action={
                                    categories.some((item) => item.is_active) ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const firstActiveCategory = categories.find(
                                                    (item) => item.is_active,
                                                );

                                                if (firstActiveCategory) {
                                                    selectCategory(
                                                        firstActiveCategory.id,
                                                    );
                                                }
                                            }}
                                            className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                                        >
                                            Ir a la primera activa
                                        </button>
                                    ) : null
                                }
                            />
                        ) : visibleProducts.length === 0 ? (
                            <EmptyState
                                title="No hay productos visibles"
                                description="Los productos inactivos se ocultan aqui. Crea uno nuevo o reactiva un item desde administracion."
                                action={
                                    canManage ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setProductModal({ mode: 'create' })
                                            }
                                            className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                                        >
                                            Crear producto
                                        </button>
                                    ) : null
                                }
                            />
                        ) : (
                            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                                {visibleProducts.map((product) => (
                                    <article
                                        key={product.id}
                                        className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
                                    >
                                        <div
                                            className={`relative h-56 bg-gradient-to-br ${categoryGradient(
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
                                                <div className="flex h-full items-end p-5">
                                                    <div className="rounded-3xl bg-slate-950/75 px-4 py-3 text-white backdrop-blur">
                                                        <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                                                            Producto
                                                        </p>
                                                        <p className="mt-2 text-xl font-semibold">
                                                            {product.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                                                        {product.category.name}
                                                    </p>
                                                    <p className="mt-2 text-2xl font-semibold text-white">
                                                        {formatCurrency(product.price)}
                                                    </p>
                                                </div>
                                                <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                                                    Stock {product.stock ?? 0}
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

                                            <div className="flex items-center justify-between text-sm">
                                                <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                                                    Activo
                                                </span>
                                                <span className="text-slate-500">
                                                    Categoria #{product.category_id}
                                                </span>
                                            </div>

                                            {canManage ? (
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setProductModal({
                                                                mode: 'edit',
                                                                product,
                                                            })
                                                        }
                                                        className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleStatus(
                                                                'product',
                                                                product.id,
                                                            )
                                                        }
                                                        className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-amber-200 hover:text-amber-700"
                                                    >
                                                        Desactivar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            submitDelete(
                                                                'product',
                                                                product.id,
                                                                product.name,
                                                            )
                                                        }
                                                        className="rounded-full border border-rose-200 px-4 py-2 text-sm text-rose-600 transition hover:bg-rose-50"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            ) : null}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                <Link
                    href={route('categories.index')}
                    className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-orange-200 hover:text-orange-600"
                >
                    Vista administrativa de categorias
                </Link>
                <Link
                    href={route('products.index')}
                    className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
                >
                    Vista administrativa de productos
                </Link>
            </div>

            <CategoryEditorModal
                key={`category-${categoryModal?.mode}-${categoryModal?.mode === 'edit' ? categoryModal.category.id : 'new'}`}
                show={categoryModal !== null}
                category={
                    categoryModal?.mode === 'edit' ? categoryModal.category : null
                }
                redirectTo={redirectTo}
                onClose={() => setCategoryModal(null)}
            />

            <ProductEditorModal
                key={`product-${productModal?.mode}-${productModal?.mode === 'edit' ? productModal.product.id : 'new'}`}
                show={productModal !== null}
                product={
                    productModal?.mode === 'edit' ? productModal.product : null
                }
                categories={categories
                    .filter((category) => category.is_active)
                    .map((category) => ({ id: category.id, name: category.name }))}
                preselectedCategoryId={selectedCategory?.id ?? null}
                redirectTo={redirectTo}
                onClose={() => setProductModal(null)}
            />
        </AuthenticatedLayout>
    );
}

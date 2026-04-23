import ProductForm from '@/Components/products/ProductForm';
import PageBanner from '@/Components/fastfood/PageBanner';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useProductForm } from '@/hooks/useProductForm';
import type { Category } from '@/types/catalog';
import { Head, Link } from '@inertiajs/react';

interface ProductsCreateProps {
    categories: Pick<Category, 'id' | 'name'>[];
}

export default function ProductsCreate({ categories }: ProductsCreateProps) {
    const form = useProductForm();

    return (
        <AuthenticatedLayout
            header={
                <PageBanner
                    eyebrow="Nuevo producto"
                    title="Agrega un item que se vea listo para vender."
                    description="Configura categoria, descripcion, precio e imagen para construir un catalogo mucho mas comercial desde el backend."
                    actions={
                        <Link
                            href={route('products.index')}
                            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-orange-200 hover:text-orange-600"
                        >
                            Volver
                        </Link>
                    }
                />
            }
        >
            <Head title="Nuevo producto" />

            <ProductForm
                title="Disena una ficha de producto clara"
                description="Cuida precio, descripcion y foto. Ese trio hace que el catalogo se sienta mucho mas vendible."
                submitLabel="Guardar producto"
                form={form}
                categories={categories}
                endpoint={route('products.store')}
                method="post"
            />
        </AuthenticatedLayout>
    );
}

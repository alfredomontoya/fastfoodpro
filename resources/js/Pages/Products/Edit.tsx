import ProductForm from '@/Components/products/ProductForm';
import PageBanner from '@/Components/fastfood/PageBanner';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useProductForm } from '@/hooks/useProductForm';
import type { Category, Product } from '@/types/catalog';
import { Head, Link } from '@inertiajs/react';

interface ProductsEditProps {
    product: Product;
    categories: Pick<Category, 'id' | 'name'>[];
}

export default function ProductsEdit({
    product,
    categories,
}: ProductsEditProps) {
    const form = useProductForm(product);

    return (
        <AuthenticatedLayout
            header={
                <PageBanner
                    eyebrow="Editar producto"
                    title={`Actualiza "${product.name}"`}
                    description="Refina el producto para mejorar la presentacion del catalogo y mantener el menu consistente."
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
            <Head title={`Editar ${product.name}`} />

            <ProductForm
                title="Ajusta precio, texto o imagen"
                description="Puedes mover el producto de categoria, renovar su foto o pulir la descripcion para hacerlo mas claro."
                submitLabel="Actualizar producto"
                form={form}
                categories={categories}
                endpoint={route('products.update', product.id)}
                method="put"
            />
        </AuthenticatedLayout>
    );
}

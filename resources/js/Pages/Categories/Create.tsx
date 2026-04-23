import CategoryForm from '@/Components/categories/CategoryForm';
import PageBanner from '@/Components/fastfood/PageBanner';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useCategoryForm } from '@/hooks/useCategoryForm';
import { Head, Link } from '@inertiajs/react';

export default function CategoriesCreate() {
    const form = useCategoryForm();

    return (
        <AuthenticatedLayout
            header={
                <PageBanner
                    eyebrow="Nueva categoria"
                    title="Crea una nueva puerta de entrada para el menu."
                    description="Una categoria bien presentada mejora la navegacion del catalogo y hace que el operador encuentre los productos con menos friccion."
                    actions={
                        <Link
                            href={route('categories.index')}
                            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-orange-200 hover:text-orange-600"
                        >
                            Volver
                        </Link>
                    }
                />
            }
        >
            <Head title="Nueva categoria" />

            <CategoryForm
                title="Disena una categoria memorable"
                description="Asigna un nombre claro y, si quieres, una imagen llamativa para que el catalogo se vea mas comercial desde el primer vistazo."
                submitLabel="Guardar categoria"
                form={form}
                endpoint={route('categories.store')}
                method="post"
            />
        </AuthenticatedLayout>
    );
}

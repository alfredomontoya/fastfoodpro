import CategoryForm from '@/Components/categories/CategoryForm';
import PageBanner from '@/Components/fastfood/PageBanner';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useCategoryForm } from '@/hooks/useCategoryForm';
import type { Category } from '@/types/catalog';
import { Head, Link } from '@inertiajs/react';

interface CategoriesEditProps {
    category: Category;
}

export default function CategoriesEdit({ category }: CategoriesEditProps) {
    const form = useCategoryForm(category);

    return (
        <AuthenticatedLayout
            header={
                <PageBanner
                    eyebrow="Editar categoria"
                    title={`Refina "${category.name}"`}
                    description="Ajusta nombre e imagen para mantener el catalogo consistente y atractivo."
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
            <Head title={`Editar ${category.name}`} />

            <CategoryForm
                title="Actualiza la identidad visual"
                description="Puedes reemplazar la imagen existente, cambiar el nombre o limpiar la portada actual si quieres simplificar la grilla."
                submitLabel="Actualizar categoria"
                form={form}
                endpoint={route('categories.update', category.id)}
                method="put"
            />
        </AuthenticatedLayout>
    );
}

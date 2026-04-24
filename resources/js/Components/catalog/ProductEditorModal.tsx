import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ImagePicker from '@/Components/fastfood/ImagePicker';
import { useProductForm } from '@/hooks/useProductForm';
import type { Category, Product } from '@/types/catalog';
import { useEffect } from 'react';

interface ProductEditorModalProps {
    categories: Pick<Category, 'id' | 'name'>[];
    product?: Product | null;
    preselectedCategoryId?: number | null;
    redirectTo: string;
    show: boolean;
    onClose: () => void;
}

export default function ProductEditorModal({
    categories,
    product,
    preselectedCategoryId,
    redirectTo,
    show,
    onClose,
}: ProductEditorModalProps) {
    const form = useProductForm(product ?? undefined);

    useEffect(() => {
        form.setData('redirect_to', redirectTo);
    }, [redirectTo]);

    useEffect(() => {
        if (!product && form.data.category_id === '' && preselectedCategoryId) {
            form.setData('category_id', preselectedCategoryId);
        }
    }, [preselectedCategoryId, product]);

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <form
                onSubmit={(event) =>
                    form.submit(
                        event,
                        product
                            ? route('products.update', product.id)
                            : route('products.store'),
                        product ? 'put' : 'post',
                    )
                }
                className="space-y-6 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-6 sm:p-8"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">
                            Producto
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                            {product ? 'Editar producto' : 'Nuevo producto'}
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Registra precio, stock y una imagen comercial para la
                            vitrina operativa.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:border-slate-300 hover:text-slate-800"
                    >
                        Cerrar
                    </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="visual-product-name" value="Nombre" />
                            <TextInput
                                id="visual-product-name"
                                value={form.data.name}
                                className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 shadow-none focus:border-sky-400 focus:ring-sky-400"
                                onChange={(event) =>
                                    form.setData('name', event.target.value)
                                }
                            />
                            <InputError message={form.errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="visual-product-category"
                                value="Categoria"
                            />
                            <select
                                id="visual-product-category"
                                value={form.data.category_id}
                                onChange={(event) =>
                                    form.setData(
                                        'category_id',
                                        event.target.value
                                            ? Number(event.target.value)
                                            : '',
                                    )
                                }
                                className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 text-sm shadow-none focus:border-sky-400 focus:ring-sky-400"
                            >
                                <option value="">Selecciona una categoria</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={form.errors.category_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="visual-product-price" value="Precio" />
                            <TextInput
                                id="visual-product-price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.data.price}
                                className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 shadow-none focus:border-sky-400 focus:ring-sky-400"
                                onChange={(event) =>
                                    form.setData('price', event.target.value)
                                }
                            />
                            <InputError
                                message={form.errors.price}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="visual-product-stock" value="Stock" />
                            <TextInput
                                id="visual-product-stock"
                                type="number"
                                min="0"
                                step="1"
                                value={form.data.stock}
                                className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 shadow-none focus:border-sky-400 focus:ring-sky-400"
                                onChange={(event) =>
                                    form.setData(
                                        'stock',
                                        event.target.value
                                            ? Number(event.target.value)
                                            : '',
                                    )
                                }
                            />
                            <InputError
                                message={form.errors.stock}
                                className="mt-2"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <InputLabel
                                htmlFor="visual-product-description"
                                value="Descripcion"
                            />
                            <textarea
                                id="visual-product-description"
                                value={form.data.description}
                                rows={5}
                                onChange={(event) =>
                                    form.setData('description', event.target.value)
                                }
                                className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 text-sm shadow-none focus:border-sky-400 focus:ring-sky-400"
                            />
                            <InputError
                                message={form.errors.description}
                                className="mt-2"
                            />
                        </div>

                        <label className="md:col-span-2 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
                            <div>
                                <p className="text-sm font-medium text-slate-950">
                                    Producto activo
                                </p>
                                <p className="text-xs text-slate-500">
                                    Los productos inactivos se ocultan del panel
                                    principal por defecto.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={form.data.is_active}
                                onChange={(event) =>
                                    form.setData('is_active', event.target.checked)
                                }
                                className="h-5 w-5 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                            />
                        </label>
                    </div>

                    <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-4 shadow-sm">
                        <ImagePicker
                            label="Imagen del producto"
                            accentClass="from-sky-300 via-cyan-300 to-blue-400"
                            previewUrl={form.previewUrl}
                            removeImage={form.data.remove_image}
                            onToggleRemove={(value) =>
                                form.setData('remove_image', value)
                            }
                            onFileChange={(file) => {
                                form.setData('image', file);
                                if (file) {
                                    form.setData('remove_image', false);
                                }
                            }}
                            error={form.errors.image}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-slate-200 px-5 py-3 text-sm text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                    >
                        Cancelar
                    </button>
                    <PrimaryButton
                        className="rounded-full bg-slate-950 px-6 py-3 text-sm normal-case tracking-normal hover:bg-slate-800 focus:bg-slate-800"
                        disabled={form.processing}
                    >
                        {product ? 'Guardar cambios' : 'Crear producto'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}

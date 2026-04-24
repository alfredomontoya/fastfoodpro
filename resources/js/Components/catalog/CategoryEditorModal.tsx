import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ImagePicker from '@/Components/fastfood/ImagePicker';
import { useCategoryForm } from '@/hooks/useCategoryForm';
import type { Category } from '@/types/catalog';
import { useEffect } from 'react';

interface CategoryEditorModalProps {
    category?: Category | null;
    redirectTo: string;
    show: boolean;
    onClose: () => void;
}

export default function CategoryEditorModal({
    category,
    redirectTo,
    show,
    onClose,
}: CategoryEditorModalProps) {
    const form = useCategoryForm(category ?? undefined);

    useEffect(() => {
        form.setData('redirect_to', redirectTo);
    }, [redirectTo]);

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <form
                onSubmit={(event) =>
                    form.submit(
                        event,
                        category
                            ? route('categories.update', category.id)
                            : route('categories.store'),
                        category ? 'put' : 'post',
                    )
                }
                className="space-y-6 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] p-6 sm:p-8"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
                            Categoria
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                            {category ? 'Editar categoria' : 'Nueva categoria'}
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Ajusta imagen, descripcion y disponibilidad dentro
                            del catalogo POS.
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
                    <div className="space-y-5">
                        <div>
                            <InputLabel htmlFor="visual-category-name" value="Nombre" />
                            <TextInput
                                id="visual-category-name"
                                value={form.data.name}
                                className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 shadow-none focus:border-orange-400 focus:ring-orange-400"
                                onChange={(event) =>
                                    form.setData('name', event.target.value)
                                }
                            />
                            <InputError message={form.errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="visual-category-description"
                                value="Descripcion"
                            />
                            <textarea
                                id="visual-category-description"
                                value={form.data.description}
                                rows={5}
                                onChange={(event) =>
                                    form.setData('description', event.target.value)
                                }
                                className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 text-sm shadow-none focus:border-orange-400 focus:ring-orange-400"
                            />
                            <InputError
                                message={form.errors.description}
                                className="mt-2"
                            />
                        </div>

                        <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
                            <div>
                                <p className="text-sm font-medium text-slate-950">
                                    Categoria activa
                                </p>
                                <p className="text-xs text-slate-500">
                                    Solo las categorias activas pueden
                                    seleccionarse en el panel.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={form.data.is_active}
                                onChange={(event) =>
                                    form.setData('is_active', event.target.checked)
                                }
                                className="h-5 w-5 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                            />
                        </label>
                    </div>

                    <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-4 shadow-sm">
                        <ImagePicker
                            label="Imagen de categoria"
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
                        {category ? 'Guardar cambios' : 'Crear categoria'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}

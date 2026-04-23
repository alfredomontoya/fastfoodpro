import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ImagePicker from '@/Components/fastfood/ImagePicker';
import { useProductForm } from '@/hooks/useProductForm';
import type { Category } from '@/types/catalog';

interface ProductFormProps {
    title: string;
    description: string;
    submitLabel: string;
    form: ReturnType<typeof useProductForm>;
    categories: Pick<Category, 'id' | 'name'>[];
    endpoint: string;
    method: 'post' | 'put';
}

export default function ProductForm({
    title,
    description,
    submitLabel,
    form,
    categories,
    endpoint,
    method,
}: ProductFormProps) {
    return (
        <form
            onSubmit={(event) => form.submit(event, endpoint, method)}
            className="space-y-8"
        >
            <div className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
                <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.55)] backdrop-blur">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
                            Producto
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                            {title}
                        </h2>
                        <p className="text-sm leading-7 text-slate-600">
                            {description}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="name" value="Nombre" />
                            <TextInput
                                id="name"
                                value={form.data.name}
                                className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 shadow-none focus:border-orange-400 focus:ring-orange-400"
                                isFocused
                                onChange={(event) =>
                                    form.setData('name', event.target.value)
                                }
                            />
                            <InputError
                                message={form.errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="category_id" value="Categoria" />
                            <select
                                id="category_id"
                                value={form.data.category_id}
                                onChange={(event) =>
                                    form.setData(
                                        'category_id',
                                        event.target.value
                                            ? Number(event.target.value)
                                            : '',
                                    )
                                }
                                className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 text-sm shadow-none focus:border-orange-400 focus:ring-orange-400"
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
                            <InputLabel htmlFor="price" value="Precio" />
                            <TextInput
                                id="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.data.price}
                                className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 shadow-none focus:border-orange-400 focus:ring-orange-400"
                                onChange={(event) =>
                                    form.setData('price', event.target.value)
                                }
                            />
                            <InputError
                                message={form.errors.price}
                                className="mt-2"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <InputLabel
                                htmlFor="description"
                                value="Descripcion"
                            />
                            <textarea
                                id="description"
                                value={form.data.description}
                                rows={5}
                                onChange={(event) =>
                                    form.setData(
                                        'description',
                                        event.target.value,
                                    )
                                }
                                className="mt-2 block w-full rounded-2xl border-slate-200 px-4 py-3 text-sm shadow-none focus:border-orange-400 focus:ring-orange-400"
                            />
                            <InputError
                                message={form.errors.description}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <PrimaryButton
                        className="rounded-full bg-slate-950 px-6 py-3 text-sm normal-case tracking-normal hover:bg-slate-800 focus:bg-slate-800"
                        disabled={form.processing}
                    >
                        {submitLabel}
                    </PrimaryButton>
                </div>

                <div className="rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.55)] backdrop-blur">
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
        </form>
    );
}

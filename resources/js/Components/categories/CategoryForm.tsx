import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ImagePicker from '@/Components/fastfood/ImagePicker';
import { useCategoryForm } from '@/hooks/useCategoryForm';

interface CategoryFormProps {
    title: string;
    description: string;
    submitLabel: string;
    form: ReturnType<typeof useCategoryForm>;
    endpoint: string;
    method: 'post' | 'put';
}

export default function CategoryForm({
    title,
    description,
    submitLabel,
    form,
    endpoint,
    method,
}: CategoryFormProps) {
    return (
        <form
            onSubmit={(event) => form.submit(event, endpoint, method)}
            className="space-y-8"
        >
            <div className="grid gap-8 lg:grid-cols-[1fr,1.1fr]">
                <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.55)] backdrop-blur">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
                            Categoria
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                            {title}
                        </h2>
                        <p className="text-sm leading-7 text-slate-600">
                            {description}
                        </p>
                    </div>

                    <div>
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
                        <InputError message={form.errors.name} className="mt-2" />
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
        </form>
    );
}

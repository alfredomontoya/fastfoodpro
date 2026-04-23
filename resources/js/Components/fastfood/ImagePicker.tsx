import InputError from '@/Components/InputError';

interface ImagePickerProps {
    previewUrl: string | null;
    onFileChange: (file: File | null) => void;
    removeImage: boolean;
    onToggleRemove: (value: boolean) => void;
    error?: string;
    label: string;
    accentClass?: string;
}

export default function ImagePicker({
    previewUrl,
    onFileChange,
    removeImage,
    onToggleRemove,
    error,
    label,
    accentClass = 'from-orange-400 via-amber-300 to-rose-400',
}: ImagePickerProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-900">{label}</p>
                    <p className="text-xs text-slate-500">
                        JPG, PNG o WEBP. Maximo 2MB.
                    </p>
                </div>

                {previewUrl && (
                    <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            checked={removeImage}
                            onChange={(event) =>
                                onToggleRemove(event.target.checked)
                            }
                            className="rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                        />
                        Quitar imagen actual
                    </label>
                )}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-orange-300 hover:bg-orange-50">
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(event) =>
                            onFileChange(event.target.files?.[0] ?? null)
                        }
                    />
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-900">
                            Seleccionar imagen
                        </p>
                        <p className="text-xs leading-6 text-slate-500">
                            Arrastra o haz clic para cargar una portada que haga
                            destacar el catalogo.
                        </p>
                    </div>
                </label>

                <div
                    className={`relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${accentClass} p-[1px]`}
                >
                    <div className="flex h-full min-h-56 items-center justify-center rounded-[1.7rem] bg-slate-950/90 p-4">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Vista previa"
                                className="h-56 w-full rounded-[1.2rem] object-cover"
                            />
                        ) : (
                            <div className="space-y-2 text-center text-white">
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                                    Preview
                                </p>
                                <p className="text-lg font-semibold">
                                    Tu imagen aparecera aqui
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <InputError message={error} />
        </div>
    );
}

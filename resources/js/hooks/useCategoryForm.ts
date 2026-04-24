import { useImagePreview } from '@/hooks/useImagePreview';
import type { Category, CategoryFormData } from '@/types/catalog';
import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export function useCategoryForm(category?: Category) {
    const form = useForm<CategoryFormData>({
        name: category?.name ?? '',
        description: category?.description ?? '',
        is_active: category?.is_active ?? true,
        image: null,
        remove_image: false,
        redirect_to: '',
    });

    const previewUrl = useImagePreview(
        form.data.image,
        category?.image_url ?? null,
        form.data.remove_image,
    );

    const submit = (
        event: FormEvent<HTMLFormElement>,
        endpoint: string,
        method: 'post' | 'put',
    ) => {
        event.preventDefault();

        form[method](endpoint, {
            forceFormData: true,
        });
    };

    return {
        ...form,
        previewUrl,
        submit,
    };
}

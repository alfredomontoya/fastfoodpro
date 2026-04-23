import { useImagePreview } from '@/hooks/useImagePreview';
import type { Product, ProductFormData } from '@/types/catalog';
import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export function useProductForm(product?: Product) {
    const form = useForm<ProductFormData>({
        category_id: product?.category_id ?? '',
        name: product?.name ?? '',
        description: product?.description ?? '',
        price: product?.price ?? '',
        image: null,
        remove_image: false,
    });

    const previewUrl = useImagePreview(
        form.data.image,
        product?.image_url ?? null,
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

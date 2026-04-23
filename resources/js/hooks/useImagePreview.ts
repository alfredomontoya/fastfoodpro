import { useEffect, useState } from 'react';

export function useImagePreview(
    file: File | null,
    currentImageUrl: string | null,
    removeImage = false,
) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        removeImage ? null : currentImageUrl,
    );

    useEffect(() => {
        if (removeImage) {
            setPreviewUrl(null);
            return;
        }

        if (!file) {
            setPreviewUrl(currentImageUrl);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [currentImageUrl, file, removeImage]);

    return previewUrl;
}

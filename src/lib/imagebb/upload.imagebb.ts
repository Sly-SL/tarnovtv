'use server'

import {CONSTANTS} from "@/shared/consts/consts.consts";

export async function UploadImageAction(imageFile: File | null) {
    if (!imageFile) return null;

    if (!imageFile.type.startsWith('image/')) {
        console.error('file is not image');
        return null;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${CONSTANTS.IMAGEBB_API_KEY}`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json();

        if (data?.success) {
            return data.data.url;
        }

        console.error('Error during uploading on ImgBB:', data?.error);
        return null;

    } catch (error) {
        console.error('Error during uploading on ImgBB:', error);
        return null;
    }
}
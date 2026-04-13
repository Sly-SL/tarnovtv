'use client'

import {type SubmitEvent, useState} from 'react';
import {AddDocumentAction} from "@/app/admin/documents/action";
import {UploadImageAction} from "@/lib/imagebb/upload.imagebb";
import {toast} from "sonner";
import {BasicH3} from "@/shared/components/libs/basic/text/h3.text";

const AddDocumentForm = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = await UploadImageAction(file);
        await AddDocumentAction({
            image:url,
        })
        toast.info(<BasicH3>Dokument został wysłany</BasicH3>)
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="relative z-10 flex flex-col gap-4 p-6">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="relative z-10 px-4 py-2 border rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition"
                />

                <button
                    type="submit"
                    className="relative z-10 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm shadow-lg hover:bg-white/30 transition"
                >
                    Dodaj
                </button>
            </div>
        </form>
    );
};

export default AddDocumentForm;
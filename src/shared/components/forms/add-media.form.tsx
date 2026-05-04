'use client'

import {type ChangeEvent, useState} from 'react';
import {UploadImageAction} from "@/lib/imagebb/upload.imagebb";
import {toast} from "sonner";
import {AddMediaAction} from "@/actions/admin/add-media.action";
import {ImageIcon, UploadSimpleIcon} from "@phosphor-icons/react";
import Image from "next/image";

const AddMediaForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        setFile(f);
        setPreview(f ? URL.createObjectURL(f) : null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return toast.error("Wybierz zdjęcie");

        setLoading(true);
        try {
            const url = await UploadImageAction(file);
            await AddMediaAction({ image: url });
            toast.success("Zdjęcie zostało dodane");
            setFile(null);
            setPreview(null);
        } catch {
            toast.error("Nie udało się dodać zdjęcia");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Preview */}
            {preview && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.07]">
                    <Image src={preview} alt="Podgląd" fill className="object-cover" />
                </div>
            )}

            {/* Upload area */}
            <label className={[
                "flex flex-col items-center justify-center gap-2 w-full py-8 rounded-xl border-2 border-dashed transition-all duration-150 cursor-pointer",
                file
                    ? "border-(--contrast-color)/30 bg-(--contrast-color)/[0.04]"
                    : "border-white/[0.08] hover:border-(--contrast-color)/30 hover:bg-(--contrast-color)/[0.03]",
            ].join(" ")}>
                <ImageIcon size={22} className="text-white/25" />
                <span className="text-sm text-white/40">
                    {file ? file.name : "Kliknij aby wybrać zdjęcie"}
                </span>
                <span className="text-[10px] text-white/20">PNG, JPG, WEBP</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

            <button
                type="submit"
                disabled={!file || loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-br from-amber-500 to-(--contrast-color) text-white text-sm font-semibold shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:opacity-90 disabled:opacity-40 transition-all duration-150"
            >
                {loading
                    ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <><UploadSimpleIcon size={15} /> Dodaj zdjęcie</>
                }
            </button>
        </form>
    );
};

export default AddMediaForm;
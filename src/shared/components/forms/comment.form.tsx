"use client";

import {type ChangeEvent, memo, useCallback, useRef, useState} from "react";
import Image from "next/image";
import {useFormStatus} from "react-dom";
import {CommentBodyProps} from "@/shared/types/comment-body.type";
import {UploadImageAction} from "@/lib/imagebb/upload.imagebb";
import {ChatCircleDotsIcon, ImagesSquareIcon, SpinnerIcon} from "@phosphor-icons/react";
import {XIcon} from "@/shared/consts/icons/x.icon";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import {AddCommentAction} from "@/actions/comments/add-comment.action";

export const CommentForm = memo(function CommentForm() {
    const [comment, setNewComment] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { pending } = useFormStatus();

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // =========================
    // 🔹 INTERNAL SUBMIT LOGIC
    // =========================

    const submitForm = useCallback(
        async (data: Omit<CommentBodyProps, "id">) => {
            setIsSubmitting(true);

            try {
                await AddCommentAction(data);
                console.log("Submitting...",data);
            } catch (err) {
                console.error("Submit error:", err);
            } finally {
                setIsSubmitting(false);
            }
        },
        []
    );

    // =========================
    // 🔹 HANDLERS
    // =========================

    const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) return;

        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    }, []);

    const handleTextareaChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    const handleSubmit = useCallback(
        async (e: ChangeEvent) => {
            e.preventDefault();
            if (!comment.trim() || !name.trim()) return;

            const image = await UploadImageAction(imageFile)

            await submitForm({comment, name, image, created_at:Date.now()});

            setNewComment("");
            setName("");
            setImagePreview(null);
            setImageFile(null);

            if (fileInputRef.current) fileInputRef.current.value = "";
            if (textareaRef.current) textareaRef.current.style.height = "auto";
        },
        [comment, name, imageFile, submitForm]
    );

    // =========================
    // 🔹 UI
    // =========================

    return (
        <form onSubmit={handleSubmit} className="space-y-6 pt-8 ring-1 ring-(--contrast-color)/50 p-4 rounded-2xl">
            {/* Name */}
            <Animate
                duration={700}
                preset={"fadeDown"}
                className="space-y-2">
                <label
                    className="block text-sm font-medium text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white">
                    Imię <span className="text-blue-400">*</span>
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Wpisz imię"
                    className="w-full p-3 rounded-xl bg-white/5 border dark:border-white/10 border-black/80 text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white placeholder-gray-400 focus:outline-none focus:border-(--contrast-color)-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    required
                />
            </Animate>

            {/* Message */}
            <Animate
                duration={700}
                preset={"fadeDown"}
                className="space-y-2">
                <label
                    className="block text-sm font-medium text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white">
                    Wiadomość <span className="text-blue-400">*</span>
                </label>

                <textarea
                    ref={textareaRef}
                    value={comment}
                    onChange={handleTextareaChange}
                    placeholder="Napisz wiadomość..."
                    className="w-full p-4 rounded-xl bg-white/5 border dark:border-white/10 border-black/80 text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white  placeholder-gray-400 focus:outline-none focus:border-(--contrast-color)-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none min-h-[120px]"
                    required
                />
            </Animate>

            {/* Profile Image */}
            <Animate
                duration={700}
                preset={"fadeLeft"}
                className="space-y-2">
                <label
                    className="block text-sm font-medium text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white">
                    Zdjęcie profilowe <span className="text-gray-400">(optional)</span>
                </label>

                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                    {imagePreview ? (
                        <div className="flex items-center gap-4">
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-full object-cover border-2 border-orange-500/50"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    setImageFile(null);
                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                            >
                                <XIcon/>

                                Usuń zdjęcie
                            </button>
                        </div>
                    ) : (
                        <div className="w-full">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500/20 text-(--contrast-color) hover:bg-orange-500/30 transition-all border border-dashed border-orange-500/50 hover:border-(--contrast-color)"
                            >
                                <ImagesSquareIcon className="w-5 h-5"/>
                                Wybierz zdjęcie profilowe
                            </button>

                            <p className="text-center text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white text-sm mt-2">
                                Maksymalny rozmiar: 5MB
                            </p>
                        </div>
                    )}
                </div>
            </Animate>

            {/* Submit */}
            <Animate
                duration={700}
                preset={"fadeDown"}>
                <button
                    type="submit"
                    disabled={pending || isSubmitting}
                    className="relative w-full h-12 bg-linear-to-r from-blue-600 via-purple-400 to-red-600 rounded-xl font-medium text-white transition-all">
                    <div className="relative flex items-center justify-center gap-2">
                        {pending || isSubmitting ? (
                            <>
                                <SpinnerIcon className="w-4 h-4 animate-spin"/>
                                Wysyłanie...
                            </>
                        ) : (
                            <>
                                <ChatCircleDotsIcon className="w-4 h-4"/>
                                Wyślij Opinię
                            </>
                        )}
                    </div>
                </button>
            </Animate>
        </form>
    );
});
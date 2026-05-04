"use client";

import {useEffect, useState} from "react";
import {mediaGet} from "@/lib/firebase/get/media.get";
import type {MediaType} from "@/shared/types/domen/media.type";
import Image from "next/image";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import {ImagesSquareIcon} from "@phosphor-icons/react";

const Page = () => {
    const [media, setMedia] = useState<MediaType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<MediaType | null>(null);

    useEffect(() => {
        mediaGet().then((data) => {
            setMedia(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-transparent">

            {/* Background */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-(--contrast-color)/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.07] blur-[100px] pointer-events-none" />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
                }}
            />

            {/* Header */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-8 pb-6
                            border-b border-gray-100 dark:border-white/[0.06]">
                <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full text-[10px] font-semibold tracking-widest uppercase
                                        bg-indigo-50 border border-indigo-200 text-indigo-600
                                        dark:bg-(--contrast-color)/10 dark:border-(--contrast-color)/20 dark:text-(--contrast-color)/85">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse" />
                            Galeria
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight
                                       text-gray-900 dark:text-white">
                            Nasze{" "}
                            <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                                Media
                            </span>
                        </h1>
                        <p className="text-sm font-light mt-1 text-gray-500 dark:text-white/30">
                            Zdjęcia i materiały z naszych działań.
                        </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl
                                    border border-gray-200 bg-gray-50
                                    dark:border-white/[0.07] dark:bg-white/[0.028]">
                        <ImagesSquareIcon size={12} className="text-gray-400 dark:text-white/30" />
                        <span className="text-[10px] uppercase tracking-widest font-semibold
                                         text-gray-400 dark:text-white/30">
                            {media.length} zdjęć
                        </span>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-8">
                <div className="max-w-screen-xl mx-auto">

                    {loading && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="aspect-square rounded-2xl animate-pulse
                                                        bg-gray-100 dark:bg-white/[0.04]" />
                            ))}
                        </div>
                    )}

                    {!loading && media.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
                            <ImagesSquareIcon size={40} className="text-gray-200 dark:text-white/10" />
                            <p className="text-sm text-gray-400 dark:text-white/25">Brak zdjęć w galerii</p>
                        </div>
                    )}

                    {!loading && media.length > 0 && (
                        <Animate preset="fadeDown">
                            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                                {media.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelected(item)}
                                        className="relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200
                                                   border border-gray-200 hover:border-indigo-300
                                                   dark:border-white/[0.07] dark:hover:border-(--contrast-color)/30"
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.id}
                                            width={400}
                                            height={400}
                                            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                                        bg-black/20 dark:bg-black/40" />
                                    </div>
                                ))}
                            </div>
                        </Animate>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {selected && (
                <div
                    className="fixed inset-0 z-[99999] flex items-center justify-center px-4
                               bg-white/80 backdrop-blur-xl
                               dark:bg-black/80"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative max-w-4xl w-full rounded-2xl overflow-hidden
                                   border border-gray-200 shadow-[0_32px_80px_rgba(0,0,0,0.15)]
                                   dark:border-white/[0.07] dark:shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selected.image}
                            alt={selected.id}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain max-h-[85vh]"
                        />
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-xl backdrop-blur flex items-center justify-center transition-colors
                                       border border-gray-300 bg-white/80 text-gray-400 hover:text-gray-700
                                       dark:border-white/[0.10] dark:bg-black/60 dark:text-white/50 dark:hover:text-white"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
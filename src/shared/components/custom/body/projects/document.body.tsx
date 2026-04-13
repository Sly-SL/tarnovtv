"use client"

import {type FC, useEffect, useState} from "react"
import Image from "next/image"
import Portal from "@/shared/components/custom/portal.custom";

interface DocumentProps {
    Img: string
}

const Document: FC<DocumentProps> = ({ Img }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [open])

    return (
        <div className="w-full h-full">
            {/* Thumbnail */}
            <div
                className="overflow-hidden rounded-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <div className="relative w-full aspect-[9/19]">
                    <Image
                        src={Img}
                        alt="Document"
                        fill
                        sizes="100vw, 33vw"
                        className="object-cover w-full h-full filter contrast-[1.1] brightness-[0.9] saturate-[1.1] transition-all duration-300 ease-in-out hover:contrast-[1.05] hover:brightness-100 hover:saturate-[1.1]"
                    />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white opacity-0 hover:opacity-100 transition-all duration-300">
                    <div className="text-center -translate-y-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 mb-2 drop-shadow-md"
                            fill="white"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 11V3H13v2h5.59L3 21.59 4.41 23 21 6.41V11z" />
                        </svg>
                        <div className="font-semibold drop-shadow-md">
                            Zobacz Document
                        </div>
                    </div>
                </div>
            </div>

            {open && (
                <Portal>
                    <div
                        className="fixed inset-0 z-[9999] bg-black/60"
                        onClick={() => setOpen(false)}
                    >
                        <div
                            className="relative w-screen h-screen"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close */}
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-4 right-4 z-10 bg-black/60 text-white rounded-full px-3 py-1 text-2xl hover:scale-110 transition"
                            >
                                ×
                            </button>

                            {/* Image */}
                            <Image
                                src={Img}
                                alt="Full"
                                fill
                                sizes="100vw"
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </Portal>
            )}
        </div>
    )
}

export default Document
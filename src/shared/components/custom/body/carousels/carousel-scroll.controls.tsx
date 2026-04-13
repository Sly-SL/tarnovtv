'use client'

import {ArrowFatLineLeftIcon, ArrowFatLineRightIcon} from "@phosphor-icons/react/ssr";

export default function CarouselScrollControls({
                                                   targetId,
                                               }: {
    targetId: string;
}) {
    const scroll = (dir: "left" | "right") => {
        const el = document.getElementById(targetId);
        if (!el) return;

        const amount = el.clientWidth * 0.6;

        el.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    scroll("left");
                }}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-lg transition-all duration-300 active:scale-95"
            >
                <ArrowFatLineLeftIcon/>
            </button>

            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    scroll("right");
                }}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 dark:border-white/10  bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white dark:hover:bg-black active:scale-95"
            >
                <ArrowFatLineRightIcon/>
            </button>
        </>
    );
}
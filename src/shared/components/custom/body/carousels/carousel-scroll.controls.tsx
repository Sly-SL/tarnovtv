'use client'

import {ArrowFatLineLeftIcon, ArrowFatLineRightIcon} from "@phosphor-icons/react/ssr";

export default function CarouselScrollControls({ targetId }: { targetId: string }) {
    const scroll = (dir: "left" | "right") => {
        const el = document.getElementById(targetId);
        if (!el) return;
        el.scrollBy({ left: dir === "left" ? -el.clientWidth * 0.6 : el.clientWidth * 0.6, behavior: "smooth" });
    };

    const btnCls = "absolute top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.07] bg-black/[0.028] backdrop-blur-xl text-black/35 hover:text-(--contrast-color) hover:border-(--contrast-color)/25 hover:bg-(--contrast-color)/[0.06] transition-all duration-200 active:scale-95 dark:border-white/[0.07] dark:bg-white/[0.028] dark:text-white/35";

    return (
        <>
            <button type="button" onClick={(e) => { e.preventDefault(); scroll("left"); }} aria-label="Previous slide" className={btnCls + " left-3"}>
                <ArrowFatLineLeftIcon size={16}/>
            </button>
            <button type="button" onClick={(e) => { e.preventDefault(); scroll("right"); }} aria-label="Next slide" className={btnCls + " right-3"}>
                <ArrowFatLineRightIcon size={16}/>
            </button>
        </>
    );
}
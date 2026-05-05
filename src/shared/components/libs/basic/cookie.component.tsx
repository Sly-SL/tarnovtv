'use client'

import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {useLayoutEffect, useState} from "react";

export default function Cookie() {
    const [isShown, setIsShown] = useState<boolean>(false);

    useLayoutEffect(() => {
        setIsShown(document.cookie.includes("functional-cookie-banner=shown"));
    }, []);

    const accept = () => {
        document.cookie = "functional-cookie-banner=shown; path=/; max-age=31536000";
        setIsShown(true);
    };

    if (isShown) return null;

    const banner = (pos: "top-4" | "bottom-4") => (
        <div className={`max-w-xl left-1/2 -translate-x-1/2 mx-2 ${pos} flex justify-between flex-wrap items-end flex-col bg-black/10 border gap-2 border-white/10 backdrop-blur-lg backdrop-saturate-150 rounded-2xl p-6 fixed w-full z-[999]`}>
            <p className="text-base flex-[1_0_300px] tracking-tight self-start">
                Używamy pliki cookie
            </p>
            <BasicButton type="button" onClick={accept} className="py-3 px-6 whitespace-nowrap font-bold transition-all duration-500">
                Okej
            </BasicButton>
        </div>
    );

    return (
        <>
            <div className="[display:var(--new)]">{banner("top-4")}</div>
            <div className="[display:var(--legacy)]">{banner("bottom-4")}</div>
        </>
    );
}
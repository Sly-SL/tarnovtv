'use client'

import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {useLayoutEffect, useState} from "react";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {CookieIcon} from "@phosphor-icons/react";

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
        <div className={`max-w-xl left-1/2 -translate-x-1/2 mx-2 ${pos} flex items-center justify-between gap-4 bg-white/80 border border-gray-200 shadow-sm backdrop-blur-xl rounded-2xl px-5 py-4 fixed w-full z-[999] dark:bg-white/[0.06] dark:border-white/[0.08] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]`}>
            <div className="flex items-center gap-3 min-w-0">
                <CookieIcon size={18} className="text-amber-500 shrink-0"/>
                <p className="text-xs text-gray-500 leading-relaxed dark:text-white/40">
                    Używamy cookie, aby serwis działał poprawnie. Więcej w{" "}
                    <Link href={shortcuts.privacy} className="text-indigo-500 hover:underline dark:text-(--contrast-color)">
                        polityce prywatności
                    </Link>
                    .
                </p>
            </div>
            <BasicButton type="button" onClick={accept} className="shrink-0 py-2 px-4 text-xs whitespace-nowrap font-semibold transition-all duration-200">
                Rozumiem
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
'use client'

import {BasicButton} from "@/shared/components/libs/basic/button.component";

export default function Cookie () {
    return (
        <>
            <div className={"[display:var(--new)]"}>
                <div
                    className="max-w-xl max-h-1/8 left-1/2 transform top-4 mx-2 -translate-x-1/2 flex justify-between flex-wrap items-end flex-col bg-black/10 border gap-2 border-white/10 backdrop-filter backdrop-blur-lg backdrop-saturate-150 rounded-2xl p-6 fixed w-full z-999"
                    style={{}}>
                    <p className="text-base text-body flex-[1_0_300px] tracking-tight self-start">
                        Używamy pliki cookie
                    </p>
                    <BasicButton
                        type={'button'}
                        onClick={() => {
                            document.cookie = "functional-cookie-banner=shown; path=/; max-age=31536000";
                        }}
                        className="py-3 px-6 gap-2 whitespace-nowrap rounded-button font-bold transition-all  duration-500 button-shadow"
                    >
                        Okej
                    </BasicButton>
                </div>
            </div>
            <div className={"[display:var(--legacy)]"}>
            <div
                className="max-w-xl max-h-1/8 left-1/2 transform bottom-4 mx-2 -translate-x-1/2 flex justify-between flex-wrap items-end flex-col bg-black/10 border gap-2 border-white/10 backdrop-filter backdrop-blur-lg backdrop-saturate-150 rounded-2xl p-6 fixed w-full z-999"
                style={{}}>
                <p className="text-base text-body flex-[1_0_300px] tracking-tight self-start">
                    Używamy pliki cookie
                </p>
                <BasicButton
                    type={'button'}
                    onClick={() => {
                        localStorage.setItem("functional-cookie-banner", "shown");
                    }}
                    className="py-3 px-6 gap-2 whitespace-nowrap rounded-button font-bold transition-all  duration-500 button-shadow"
                >
                    Okej
                </BasicButton>
            </div>
            </div>
        </>
    );
};


'use client';

import {useEffect, useState} from 'react';
import {BasicButton} from "@/shared/components/libs/basic/button.component";

export default function Cookie () {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        queueMicrotask(() => {
            setMounted(true);

            const alreadyShown = localStorage.getItem("functional-cookie-banner");
            if (!alreadyShown) {
                setVisible(true);
            }
        });
    }, []);

    if (!mounted || !visible) return null;

    return (
        <div className="max-w-xl max-h-1/8 left-1/2 transform bottom-4 mx-2 -translate-x-1/2 flex justify-between flex-wrap items-end flex-col bg-black/10 border gap-2 border-white/10 backdrop-filter backdrop-blur-lg backdrop-saturate-150 rounded-2xl p-6 fixed w-full z-999" style={{
        }}>
            <p className="text-base text-body flex-[1_0_300px] tracking-tight self-start">
                Używamy pliki cookie
            </p>
            <BasicButton
                type={'button'}
                themaHex={''}
                onClick={() => {
                    localStorage.setItem("functional-cookie-banner", "shown");
                    setVisible(false);
                }}
                className="py-3 px-6 gap-2 whitespace-nowrap rounded-button font-bold transition-all  duration-500 button-shadow dark:border-gradient dark:shadow-gradient bg-[#E9E9E9] text-black hover:bg-linear-to-r hover:from-[#b12ef2] hover:to-[#5f3175] dark:text-white dark:bg-black dark:text-head dark:hover:bg-none"
            >
                Okej
            </BasicButton>
        </div>
    );
};


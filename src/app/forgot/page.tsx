"use client";

import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {ArrowLeftIcon, EnvelopeIcon, HeadsetIcon, KeyIcon} from "@phosphor-icons/react";
import type {JSX} from "react";

interface OptionProps {
    text: string;
    description: string;
    href: string;
    icon: JSX.Element;
}

const options: OptionProps[] = [
    {
        text: "Zapomniałem hasła",
        description: "Wyślemy link resetujący na Twój e-mail",
        href: shortcuts.forgot + shortcuts.password,
        icon: <KeyIcon size={20} weight="duotone"/>,
    },
    {
        text: "Zapomniałem e-maila",
        description: "Znajdziemy konto na podstawie danych profilu",
        href: shortcuts.forgot + shortcuts.email,
        icon: <EnvelopeIcon size={20} weight="duotone"/>,
    },
    {
        text: "Skontaktuj się z administratorem",
        description: "Napisz do nas — pomożemy odzyskać dostęp",
        href: shortcuts.forgot + shortcuts.contact,
        icon: <HeadsetIcon size={20} weight="duotone"/>,
    },
];

const ForgetPage = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">

            <div className="absolute -top-40 -right-28 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[350px] h-[350px] rounded-full bg-violet-500/[0.07] blur-[90px] pointer-events-none"/>
            <div
                className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-100"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                }}
            />

            <div
                className="relative z-10 w-full max-w-[440px] rounded-3xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.028] backdrop-blur-2xl shadow-[0_32px_72px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_72px_rgba(0,0,0,0.55)] p-10"
                style={{animation: "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both"}}
            >
                <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-(--contrast-color)/10 border border-indigo-500/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                    Odzyskiwanie
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-black dark:text-white leading-tight mb-1">
                    Co{" "}
                    <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                        zapomniałeś?
                    </span>
                </h1>
                <p className="text-sm text-black/40 dark:text-white/30 font-light mb-7">
                    Wybierz opcję — pomożemy Ci odzyskać dostęp do konta.
                </p>

                <div className="flex flex-col gap-2">
                    {options.map((opt) => (
                        <Link
                            key={opt.href}
                            href={opt.href}
                            className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.018] dark:bg-white/[0.018] hover:border-(--contrast-color)/30 hover:bg-(--contrast-color)/[0.05] transition-all duration-150"
                        >
                            <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] group-hover:border-(--contrast-color)/25 group-hover:bg-(--contrast-color)/10 transition-all duration-150 text-black/40 dark:text-white/40 group-hover:text-(--contrast-color)">
                                {opt.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors">
                                    {opt.text}
                                </p>
                                <p className="text-xs text-black/25 dark:text-white/25 group-hover:text-black/40 dark:group-hover:text-white/40 transition-colors mt-0.5">
                                    {opt.description}
                                </p>
                            </div>
                            <div className="text-black/15 dark:text-white/15 group-hover:text-(--contrast-color)/50 group-hover:translate-x-0.5 transition-all duration-150">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>

                <Link
                    href={shortcuts.login}
                    className="mt-6 flex items-center justify-center gap-2 text-xs text-black/25 dark:text-white/25 hover:text-(--contrast-color)/65 transition-colors"
                >
                    <ArrowLeftIcon size={12}/>
                    Wróć do logowania
                </Link>
            </div>
        </div>
    );
};

export default ForgetPage;
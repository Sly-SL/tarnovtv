"use server"

import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import {
    ArrowLeftIcon,
    FilmStripIcon,
    FolderOpenIcon,
    GavelIcon,
    ScalesIcon,
    ShieldWarningIcon,
} from "@phosphor-icons/react/ssr";
import {ModeratorMiddleware} from "@/middlewares/moderator.middleware";
import type {JSX} from "react";

const sections: {label: string; href: string; icon: JSX.Element; delay: number}[] = [
    {
        label: "Projekty",
        href: shortcuts.moderator + shortcuts.projects,
        icon: <FolderOpenIcon size={18} weight="duotone"/>,
        delay: 0,
    },
    {
        label: "Media",
        href: shortcuts.moderator + shortcuts.media,
        icon: <FilmStripIcon size={18} weight="duotone"/>,
        delay: 60,
    },
    {
        label: "Głosowania",
        href: shortcuts.moderator + shortcuts.voting,
        icon: <GavelIcon size={18} weight="duotone"/>,
        delay: 120,
    },
    {
        label: "Oferta",
        href: shortcuts.moderator + shortcuts.offers,
        icon: <ScalesIcon size={18} weight="duotone"/>,
        delay: 180,
    },
];

const Page = async () => {
    await ModeratorMiddleware();

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">

            {/* Orbs */}
            <div className="absolute -top-40 -right-28 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[350px] h-[350px] rounded-full bg-amber-500/[0.06] blur-[90px] pointer-events-none"/>

            {/* Grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                }}
            />

            <div
                className="relative z-10 w-full max-w-[420px] rounded-3xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-2xl shadow-[0_32px_72px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.035)_inset] p-10"
                style={{animation: "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both"}}
            >
                <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold tracking-widest uppercase text-amber-300/85">
                    <ShieldWarningIcon size={10} weight="fill"/>
                    Panel moderatora
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight mb-1">
                    Wybierz{" "}
                    <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                        sekcję
                    </span>
                </h1>
                <p className="text-sm text-white/30 font-light mb-1">
                    Zarządzaj treściami na stronie.
                </p>

                {/* Warning */}
                <div className="flex items-start gap-2.5 px-3.5 py-3 mb-7 rounded-xl border border-amber-500/15 bg-amber-500/[0.05]">
                    <ShieldWarningIcon size={14} weight="duotone" className="text-amber-400/70 mt-0.5 flex-shrink-0"/>
                    <p className="text-xs text-amber-300/50 leading-relaxed">
                        Działaj z rozwagą — zmiany są widoczne natychmiast dla wszystkich użytkowników.
                    </p>
                </div>

                {/* Sections */}
                <div className="flex flex-col gap-2">
                    {sections.map((s) => (
                        <Animate key={s.href} preset="fadeUp" delay={s.delay} once>
                            <Link
                                href={shortcuts.settings+s.href}
                                className="group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.018] hover:border-(--contrast-color)/30 hover:bg-(--contrast-color)/[0.05] transition-all duration-150"
                            >
                                <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.06] group-hover:border-(--contrast-color)/25 group-hover:bg-(--contrast-color)/10 transition-all duration-150 text-white/40 group-hover:text-(--contrast-color)">
                                    {s.icon}
                                </div>
                                <span className="flex-1 text-sm font-medium text-white/65 group-hover:text-white transition-colors">
                                    {s.label}
                                </span>
                                <svg className="text-white/15 group-hover:text-(--contrast-color)/50 group-hover:translate-x-0.5 transition-all duration-150" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </Animate>
                    ))}
                </div>

                {/* Back */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent my-5"/>
                <Link
                    href={shortcuts.home}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/[0.07] bg-white/[0.025] text-sm font-medium text-white/40 hover:text-white hover:border-(--contrast-color)/25 hover:bg-(--contrast-color)/[0.04] transition-all duration-150"
                >
                    <ArrowLeftIcon size={14}/>
                    Wróć na stronę główną
                </Link>
            </div>
        </div>
    );
};

export default Page;
import {BUTTONSNEW} from "@/shared/consts/enums/buttons-header.enum";
import ButtonHeader from "@/shared/components/custom/header/button.header";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const NewMode = () => {
    return (
        <nav className="[display:var(--new)] fixed z-[9999] md:top-3 md:left-3 md:bottom-auto md:right-auto bottom-3 left-2 right-2 md:w-fit rounded-2xl">
            <h1 className="hidden">Tarnov TV</h1>
            <Animate preset="fadeDown" className="h-full">

                {/* ── Desktop: vertical sidebar ── */}
                <div className="relative hidden md:flex flex-col group rounded-2xl overflow-hidden h-[calc(100vh-24px)]
                                transition-all duration-500 ease-in-out p-2 w-20 hover:w-54
                                border border-gray-200 bg-white/80 shadow-sm hover:backdrop-blur-sm
                                dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.035)_inset]">

                    {/* Top gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl pointer-events-none
                                    bg-gradient-to-r from-transparent to-transparent
                                    via-(--contrast-color)/30"/>

                    <ul className="flex flex-col gap-0.5 flex-1 justify-center">
                        {BUTTONSNEW.filter((btn) => btn.mobile !== true).map((button, i) => (
                            <ButtonHeader
                                key={i}
                                link={button.link}
                                className={
                                    (button.className ?? "") +
                                    " flex items-center gap-3 w-full p-2 rounded-xl transition-all duration-200 hover:bg-(--contrast-color)/10"
                                }
                            >
                                {/* Icon */}
                                <span className="w-10 flex items-center justify-center shrink-0
                                                 text-(--contrast-color)">
                                    {button.children}
                                </span>
                                {/* Label */}
                                <span className="whitespace-nowrap text-sm font-medium opacity-0 -translate-x-2 pt-2
                                                 group-hover:opacity-100 group-hover:translate-x-0
                                                 transition-all duration-500
                                                 text-gray-600 group-hover:text-gray-900
                                                 dark:text-white/70 dark:group-hover:text-white/90">
                                    {button.label}
                                </span>
                            </ButtonHeader>
                        ))}
                    </ul>
                </div>

                {/* ── Mobile: horizontal bottom bar ── */}
                <div className="flex md:hidden rounded-2xl px-4 py-1.5
                                border border-gray-200 bg-white/90 backdrop-blur-md! shadow-sm
                                dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.035)_inset]">
                    <ul className="flex justify-between items-center w-full">
                        {BUTTONSNEW.filter((btn) => btn.mobile !== false).map((button, i) => (
                            <ButtonHeader
                                key={i}
                                link={button.link}
                                aria-label={button.label}
                                className={
                                    (button.className ?? "") +
                                    " flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-xl transition-all duration-200" +
                                    " hover:bg-(--contrast-color)/10"
                                }
                            >
                                <div className="flex flex-col">
                                    <span className="w-8 h-8 flex items-center justify-center text-(--contrast-color)">
                                        {button.children}
                                    </span>
                                    <span className="text-[9px] font-medium leading-none tracking-wide
                                                     text-gray-400 dark:text-white/40">
                                        {button.label}
                                    </span>
                                </div>
                            </ButtonHeader>
                        ))}
                    </ul>
                </div>

            </Animate>
        </nav>
    );
};

export default NewMode;
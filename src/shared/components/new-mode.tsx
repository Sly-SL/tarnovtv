import {BUTTONSNEW} from "@/shared/consts/enums/buttons-header.enum";
import ButtonHeader from "@/shared/components/custom/header/button.header";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const NewMode = () => {
    return (
        <nav className="[display:var(--new)] fixed z-[9999] md:top-3 md:left-3 md:bottom-auto md:right-auto bottom-3 left-2 right-2 md:w-fit rounded-2xl">
            <h1 className="hidden">Tarnov TV</h1>
            <Animate preset="fadeDown" className="h-full">

                {/* ── Desktop: vertical sidebar ── */}
                <div className="relative hidden md:flex flex-col group rounded-2xl border border-white/[0.07] bg-white/[0.028] hover:backdrop-blur-sm shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.035)_inset] p-2 w-20 hover:w-54 transition-all duration-500 ease-in-out overflow-hidden h-[calc(100vh-24px)]">

                    {/* Top gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-(--contrast-color)/30 to-transparent rounded-t-2xl pointer-events-none"/>

                    <ul className="flex flex-col gap-0.5 flex-1 justify-center">
                        {BUTTONSNEW.filter((btn) => btn.mobile !== true).map((button, i) => (
                            <ButtonHeader
                                key={i}
                                link={button.link}
                                className={
                                    (button.className ?? "") +
                                    " flex items-center gap-3 w-full p-2 rounded-xl hover:bg-(--contrast-color)/10 border border-transparent hover:border-white/[0.06] transition-all duration-200"
                                }
                            >
                                {/* Icon */}
                                <span className="w-10 flex items-center justify-center shrink-0 text-(--contrast-color)">
                                    {button.children}
                                </span>
                                {/* Label — same vertical center as icon */}
                                <span className="whitespace-nowrap text-sm font-medium text-white/70 group-hover:text-white/90 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pt-2 transition-all duration-500">
                                    {button.label}
                                </span>
                            </ButtonHeader>
                        ))}
                    </ul>
                </div>

                {/* ── Mobile: horizontal bottom bar ── */}
                <div className="flex md:hidden rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-md! shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.035)_inset] px-4 py-1.5">
                    <ul className="flex justify-between items-center w-full">
                        {BUTTONSNEW.filter((btn) => btn.mobile !== false).map((button, i) => (
                            <ButtonHeader
                                key={i}
                                link={button.link}
                                aria-label={button.label}
                                className={
                                    (button.className ?? "") +
                                    " flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-xl hover:bg-(--contrast-color)/10 transition-all duration-200"
                                }
                            >
                                <div className={"flex flex-col"}>
                                    <span className="w-8 h-8 flex items-center justify-center text-(--contrast-color)">
                                    {button.children}
                                </span>
                                    <span className="text-[9px] font-medium text-white/40 leading-none tracking-wide">
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
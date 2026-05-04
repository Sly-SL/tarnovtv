import Link from "next/link";
import {BUTTONSLEGACY} from "@/shared/consts/enums/buttons-header.enum";
import LiquidGlassCustom from "@/shared/components/custom/liquid-glass.custom";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const presets = ["fadeRight", "fadeDown", "fadeUp", "fadeLeft"] as const;

const Page = () => {
    return (
        <div className="relative min-h-screen px-4 py-16 overflow-hidden">

            {/* Orbs */}
            <div className="absolute -top-40 -right-28 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[350px] h-[350px] rounded-full bg-violet-500/[0.07] blur-[90px] pointer-events-none"/>

            {/* Grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                }}
            />

            <div className="relative z-10 max-w-2xl mx-auto">

                {/* Header */}
                <div
                    className="mb-10"
                    style={{animation: "fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both"}}
                >
                    <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-(--contrast-color)/10 border border-indigo-500/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                        Nawigacja
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
                        Więcej{" "}
                        <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                            opcji
                        </span>
                    </h1>
                    <p className="text-sm text-white/30 font-light mt-1">
                        Wszystkie sekcje w jednym miejscu.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {BUTTONSLEGACY.filter((btn) => btn.mobile !== true).map((button, i) => (
                        <Animate
                            key={i}
                            className="h-full w-full"
                            preset={presets[i % 4]}
                            delay={i * 60}
                            once
                        >
                            <Link href={button.link} className="block h-full group">
                                <LiquidGlassCustom className="h-full min-h-[100px] flex flex-col items-center justify-center gap-2 group-hover:border-(--contrast-color)/30 group-hover:bg-(--contrast-color)/[0.04] transition-all duration-300">
                                    <div className="text-white/50 group-hover:text-(--contrast-color) transition-colors duration-300">
                                        {button.children}
                                    </div>
                                </LiquidGlassCustom>
                            </Link>
                        </Animate>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
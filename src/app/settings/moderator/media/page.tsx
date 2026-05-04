import {ModeratorMiddleware} from "@/middlewares/moderator.middleware";
import AddMediaForm from "@/shared/components/forms/add-media.form";
import {ArrowLeftIcon, ImageSquareIcon} from "@phosphor-icons/react/ssr";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";

const Page = async () => {
    await ModeratorMiddleware();

    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden">

            {/* Background */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/[0.07] blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.07] blur-[100px] pointer-events-none" />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
                }}
            />

            {/* Header */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-8 pb-6 border-b border-white/[0.06]">
                <div className="max-w-screen-xl mx-auto">
                    <Link
                        href={shortcuts.settings+shortcuts.moderator}
                        className="inline-flex items-center gap-5 text-xs text-white/30 hover:text-white/60 transition-colors mb-6"
                    >
                        <ArrowLeftIcon size={12} />
                        Wróć do panelu
                    </Link>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold tracking-widest uppercase text-amber-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b] animate-pulse" />
                        Panel moderatora
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                        Dodaj{" "}
                        <span className="bg-linear-to-br from-amber-400 to-orange-400 bg-clip-text text-transparent">
                            zdjęcie
                        </span>
                    </h1>
                    <p className="text-sm text-white/30 font-light mt-1">
                        Plik zostanie automatycznie umieszczony na stronie.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="max-w-lg">

                        {/* Info card */}
                        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)] p-5 mb-4 flex items-center gap-4">
                            <div className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20">
                                <ImageSquareIcon size={20} className="text-amber-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Nowe zdjęcie do galerii</p>
                                <p className="text-[11px] text-white/30 mt-0.5">
                                    Obsługiwane formaty: PNG, JPG, WEBP. Zdjęcie pojawi się natychmiast.
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)] p-6">
                            <AddMediaForm />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
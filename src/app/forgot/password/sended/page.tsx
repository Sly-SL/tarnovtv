import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {ArrowLeftIcon, CheckCircleIcon} from "@phosphor-icons/react/dist/ssr";

const Page = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden
                        bg-white dark:bg-transparent">

            <div className="absolute -top-40 -right-28 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[350px] h-[350px] rounded-full bg-violet-500/[0.07] blur-[90px] pointer-events-none"/>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                }}
            />

            <div
                className="relative z-10 w-full max-w-[420px] rounded-3xl p-10 text-center
                           border border-gray-200 bg-white shadow-sm
                           dark:border-white/[0.07] dark:bg-white/[0.028] dark:backdrop-blur-2xl
                           dark:shadow-[0_32px_72px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.035)_inset]"
                style={{animation: "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both"}}
            >
                <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center
                                    bg-indigo-50 border border-indigo-200 text-indigo-500
                                    dark:bg-(--contrast-color)/10 dark:border-(--contrast-color)/20 dark:text-(--contrast-color)">
                        <CheckCircleIcon size={28} weight="duotone"/>
                    </div>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full text-[10px] font-semibold tracking-widest uppercase
                                bg-indigo-50 border border-indigo-200 text-indigo-600
                                dark:bg-(--contrast-color)/10 dark:border-indigo-500/20 dark:text-(--contrast-color)/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                    Wysłano
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-2
                               text-gray-900 dark:text-white">
                    Link{" "}
                    <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                        wysłany
                    </span>
                </h1>
                <p className="text-sm font-light mb-8 text-gray-500 dark:text-white/30">
                    Sprawdź swoją skrzynkę e-mail. Link do resetowania hasła powinien dotrzeć w ciągu kilku minut. Pamiętaj sprawdzić folder spam.
                </p>

                {/* Divider */}
                <div className="w-full h-px mb-6
                                bg-gray-100
                                dark:bg-gradient-to-r dark:from-transparent dark:via-white/[0.07] dark:to-transparent"/>

                <Link
                    href={shortcuts.home}
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border text-sm font-medium transition-all duration-150
                               border-gray-200 bg-gray-50 text-gray-500 hover:text-gray-800 hover:border-indigo-300 hover:bg-indigo-50
                               dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-white/60 dark:hover:text-white dark:hover:border-(--contrast-color)/25 dark:hover:bg-(--contrast-color)/[0.04]"
                >
                    <ArrowLeftIcon size={14}/>
                    Wróć na stronę główną
                </Link>
            </div>
        </div>
    );
};

export default Page;
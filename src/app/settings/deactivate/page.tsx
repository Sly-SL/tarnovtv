"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {
    ArrowLeftIcon,
    BellSlashIcon,
    EyeSlashIcon,
    LockKeyIcon,
    ShieldSlashIcon,
    UserMinusIcon,
    WarningDiamondIcon,
} from "@phosphor-icons/react";
import {toast} from "sonner";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import {deactivateAccountAction} from "@/actions/auth/deactivate-account.action";

const losses = [
    {
        icon: <EyeSlashIcon size={16} className="text-red-400"/>,
        title: "Profil stanie się niewidoczny",
        desc: "Nikt nie będzie mógł Cię znaleźć ani zobaczyć Twojego konta.",
    },
    {
        icon: <BellSlashIcon size={16} className="text-red-400"/>,
        title: "Powiadomienia zostaną wyłączone",
        desc: "Nie będziesz otrzymywać żadnych powiadomień e-mail ani push.",
    },
    {
        icon: <ShieldSlashIcon size={16} className="text-red-400"/>,
        title: "Sesje zostaną zakończone",
        desc: "Wszystkie aktywne sesje zostaną natychmiast unieważnione.",
    },
    {
        icon: <LockKeyIcon size={16} className="text-red-400"/>,
        title: "Dostęp do konta zostanie zablokowany",
        desc: "Możesz przywrócić konto w ciągu 30 dni logując się ponownie.",
    },
];

const Page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const handleDeactivate = async () => {
        if (!confirmed) return;
        setLoading(true);
        try {
            await deactivateAccountAction();
            toast.success("Konto zostało dezaktywowane");
            router.push("/");
        } catch (e) {
            toast.error(e instanceof Error ? e.message : "Nie udało się dezaktywować konta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden">

            {/* Background */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-red-500/[0.07] blur-[120px] pointer-events-none"/>
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.05] blur-[100px] pointer-events-none"/>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
                }}
            />

            {/* Header */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-8 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="max-w-screen-xl mx-auto">
                    <Link href={shortcuts.settings} className="inline-flex items-center gap-2 text-xs text-black/30 dark:text-white/30 hover:text-black/60 dark:hover:text-white/60 transition-colors mb-6">
                        <ArrowLeftIcon size={12}/>
                        Wróć do ustawień
                    </Link>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-semibold tracking-widest uppercase text-red-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_6px_#f87171] animate-pulse"/>
                        Strefa niebezpieczna
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-black dark:text-white leading-tight">
                        Dezaktywacja{" "}
                        <span className="bg-linear-to-br from-red-400 to-rose-400 bg-clip-text text-transparent">
                            konta
                        </span>
                    </h1>
                    <p className="text-sm text-black/30 dark:text-white/30 font-light mt-1">
                        Przeczytaj uważnie zanim przejdziesz dalej.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-8">
                <div className="max-w-lg mx-auto flex flex-col gap-4">
                    <Animate preset="fadeDown">

                        {/* What you lose */}
                        <div className="
                            rounded-2xl overflow-hidden backdrop-blur-xl
                            border border-black/[0.07] bg-black/[0.028] shadow-[0_16px_48px_rgba(0,0,0,0.08)]
                            dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)]
                        ">
                            <div className="px-6 py-4 border-b border-black/[0.05] dark:border-white/[0.05] flex items-center gap-2">
                                <WarningDiamondIcon size={14} className="text-red-400/70"/>
                                <span className="text-[11px] font-medium tracking-widest uppercase text-black/35 dark:text-white/35">
                                    Co stracisz
                                </span>
                            </div>
                            <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                                {losses.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 px-6 py-4">
                                        <div className="w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center bg-red-500/[0.06] border border-red-500/[0.12] mt-0.5">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-black/80 dark:text-white/80">{item.title}</p>
                                            <p className="text-xs text-black/30 dark:text-white/30 mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recovery info — amber, одинаково на обоих фонах */}
                        <div className="rounded-xl border border-[#f59e0b22] bg-[#f59e0b08] px-5 py-4">
                            <p className="text-xs text-[#f59e0b99] leading-relaxed m-0">
                                Konto można przywrócić w ciągu <span className="text-amber-400 font-medium">30 dni</span> od dezaktywacji —
                                wystarczy zalogować się ponownie. Po tym czasie dane mogą zostać trwale usunięte.
                            </p>
                        </div>

                        {/* Confirm checkbox */}
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div
                                onClick={() => setConfirmed(v => !v)}
                                className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded-md border transition-all duration-150 flex items-center justify-center ${
                                    confirmed
                                        ? "bg-red-500 border-red-500"
                                        : "border-black/20 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.03] group-hover:border-red-500/40"
                                }`}
                            >
                                {confirmed && (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                            <span className="text-sm text-black/40 dark:text-white/40 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors leading-relaxed">
                                Rozumiem konsekwencje i chcę dezaktywować konto
                            </span>
                        </label>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-1">
                            <Link href={shortcuts.settings} className="flex-1">
                                <BasicButton
                                    variant="ghost"
                                    size="lg"
                                    className="w-full border border-black/[0.07] dark:border-white/[0.07]"
                                >
                                    <ArrowLeftIcon size={14}/>
                                    Anuluj
                                </BasicButton>
                            </Link>
                            <BasicButton
                                size="lg"
                                loading={loading}
                                disabled={!confirmed || loading}
                                onClick={handleDeactivate}
                                className="flex-1 border-red-500/30 bg-red-500/[0.08] text-red-400 hover:bg-red-500/20 disabled:opacity-30"
                            >
                                {!loading && (
                                    <>
                                        <UserMinusIcon size={14}/>
                                        Dezaktywuj konto
                                    </>
                                )}
                            </BasicButton>
                        </div>

                    </Animate>
                </div>
            </div>
        </div>
    );
};

export default Page;
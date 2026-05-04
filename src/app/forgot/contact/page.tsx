"use client";

import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {ArrowLeftIcon, CopyIcon, EnvelopeIcon} from "@phosphor-icons/react";
import {useState} from "react";

const ADMIN_EMAIL = "tarnovtv@gmail.com";

const ContactAdminPage = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(ADMIN_EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">

            <div className="absolute -top-40 -left-28 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -right-20 w-[350px] h-[350px] rounded-full bg-violet-500/[0.07] blur-[90px] pointer-events-none"/>
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-(--contrast-color)/10 border border-indigo-500/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                    Wsparcie
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight mb-1">
                    Napisz do{" "}
                    <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                        administratora
                    </span>
                </h1>
                <p className="text-sm text-white/30 font-light mb-7">
                    Masz problem z dostępem do konta? Opisz sytuację — odezwiemy się najszybciej jak możemy.
                </p>

                {/* Email block */}
                <div className="flex flex-col gap-2 mb-6">
                    <span className="text-[11px] font-medium tracking-widest uppercase text-white/35">
                        Adres e-mail administratora
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-(--contrast-color)/20 bg-(--contrast-color)/[0.05]">
                            <EnvelopeIcon size={15} className="text-(--contrast-color)/60 flex-shrink-0"/>
                            <span className="text-sm text-(--contrast-color) font-mono tracking-wide">
                                {ADMIN_EMAIL}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className={[
                                "flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150",
                                copied
                                    ? "border-(--contrast-color)/40 bg-(--contrast-color)/15 text-(--contrast-color)"
                                    : "border-white/[0.07] bg-white/[0.025] text-white/30 hover:border-(--contrast-color)/25 hover:text-(--contrast-color)/70",
                            ].join(" ")}
                            title="Kopiuj adres"
                        >
                            {copied
                                ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                : <CopyIcon size={14}/>
                            }
                        </button>
                    </div>
                </div>

                {/* Tip */}
                <div className="flex gap-3 px-4 py-3.5 rounded-xl border border-white/[0.05] bg-white/[0.015] mb-6">
                    <span className="text-lg leading-none mt-0.5">💡</span>
                    <p className="text-xs text-white/30 leading-relaxed">
                        W wiadomości podaj swoje <span className="text-white/50">imię, nazwisko</span> oraz <span className="text-white/50">adres e-mail</span> użyty przy rejestracji — przyspieszy to weryfikację Twojej tożsamości.
                    </p>
                </div>

                {/* CTA */}
                <a
                    href={`mailto:${ADMIN_EMAIL}?subject=Problem z dostępem do konta&body=Imię i nazwisko: %0ANumer telefonu (opcjonalnie): %0AOpis problemu: `}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-linear-to-br from-(--contrast-color) to-indigo-500 text-white text-sm font-semibold tracking-wide shadow-[0_4px_24px_rgba(99,102,241,0.25)] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-150"
                >
                    <EnvelopeIcon size={16} weight="bold"/>
                    Otwórz klienta poczty
                </a>

                <Link
                    href={shortcuts.forgot}
                    className="mt-6 flex items-center justify-center gap-2 text-xs text-white/25 hover:text-(--contrast-color)/65 transition-colors"
                >
                    <ArrowLeftIcon size={12}/>
                    Wróć do wyboru opcji
                </Link>
            </div>
        </div>
    );
};

export default ContactAdminPage;
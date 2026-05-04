'use client'

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {VerifyEmailAction} from "@/actions/user/verify-email.action";
import NotFound from "@/app/not-found";
import {CheckCircleIcon, CircleNotchIcon, XCircleIcon} from "@phosphor-icons/react";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";

type Status = "loading" | "success" | "error";

const Page = () => {
    const params = useParams();
    const router = useRouter();
    const token = typeof params.token === "string" ? params.token : params.token?.[0];

    const [status, setStatus] = useState<Status>("loading");

    useEffect(() => {
        if (!token) return;

        const verify = async () => {
            try {
                await VerifyEmailAction(token);
                setStatus("success");
                setTimeout(() => router.push(shortcuts.settings), 3000);
            } catch {
                setStatus("error");
            }
        };

        verify();
    }, [token]);

    if (!token) return <NotFound />;

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden
                        bg-white dark:bg-transparent">

            {/* Background */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-(--contrast-color)/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.07] blur-[100px] pointer-events-none" />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
                }}
            />

            <div className="relative z-10 w-full max-w-sm mx-auto px-4">
                <div className="rounded-2xl border p-8 flex flex-col items-center gap-5 text-center
                                border-gray-200 bg-white shadow-sm
                                dark:border-white/[0.07] dark:bg-white/[0.028] dark:backdrop-blur-xl
                                dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)]">

                    {status === "loading" && (
                        <>
                            <CircleNotchIcon size={40} className="text-indigo-500 animate-spin dark:text-(--contrast-color)" />
                            <div>
                                <p className="text-base font-semibold text-gray-900 dark:text-white">
                                    Weryfikacja adresu...
                                </p>
                                <p className="text-xs mt-1 text-gray-400 dark:text-white/30">
                                    Proszę czekać, trwa potwierdzanie.
                                </p>
                            </div>
                        </>
                    )}

                    {status === "success" && (
                        <>
                            <CheckCircleIcon size={40} className="text-emerald-500 dark:text-emerald-400" />
                            <div>
                                <p className="text-base font-semibold text-gray-900 dark:text-white">
                                    E-mail potwierdzony!
                                </p>
                                <p className="text-xs mt-1 text-gray-400 dark:text-white/30">
                                    Za chwilę zostaniesz przekierowany do ustawień.
                                </p>
                            </div>
                            <Link
                                href={shortcuts.settings}
                                className="text-xs transition-colors
                                           text-emerald-600 hover:text-emerald-700
                                           dark:text-emerald-400/70 dark:hover:text-emerald-400"
                            >
                                Przejdź teraz →
                            </Link>
                        </>
                    )}

                    {status === "error" && (
                        <>
                            <XCircleIcon size={40} className="text-red-500 dark:text-red-400" />
                            <div>
                                <p className="text-base font-semibold text-gray-900 dark:text-white">
                                    Weryfikacja nie powiodła się
                                </p>
                                <p className="text-xs mt-1 text-gray-400 dark:text-white/30">
                                    Link może być nieważny lub wygasł.
                                </p>
                            </div>
                            <Link
                                href={shortcuts.settings}
                                className="text-xs transition-colors
                                           text-red-500 hover:text-red-600
                                           dark:text-red-400/70 dark:hover:text-red-400"
                            >
                                Wróć do ustawień →
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Page;
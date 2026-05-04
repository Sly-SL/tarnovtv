"use client";

import {useEffect, useState, useTransition} from "react";
import {getBlockedUsersAction} from "@/actions/admin/get-blocked-users.action";
import {userPatch} from "@/lib/firebase/patch/user.patch";
import type {UserType} from "@/shared/types/domen/user.type";
import {ArrowLeftIcon, LockKeyOpenIcon, UserIcon, WarningDiamondIcon} from "@phosphor-icons/react";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import Link from "next/link";
import {toast} from "sonner";

export default function BlockedUsersPage() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [isPending, startTransition] = useTransition();

    const load = async () => {
        const data = await getBlockedUsersAction();
        setUsers(data);
    };

    useEffect(() => {load();}, []);

    const handleReset = (userId: string) => {
        startTransition(async () => {
            try {
                await userPatch({badAttempts: 0}, userId);
                toast.success("Zresetowano próby logowania");
                await load();
            } catch {
                toast.error("Błąd przy resetowaniu");
            }
        });
    };

    const handleResetAll = () => {
        startTransition(async () => {
            try {
                await Promise.all(users.map(u => userPatch({badAttempts: 0}, u.id)));
                toast.success(`Zresetowano ${users.length} kont`);
                await load();
            } catch {
                toast.error("Błąd przy resetowaniu");
            }
        });
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden">

            {/* Orbs */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-orange-500/[0.06] blur-[120px] pointer-events-none"/>
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-red-500/[0.05] blur-[100px] pointer-events-none"/>
            <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",backgroundSize:"48px 48px",maskImage:"radial-gradient(ellipse 100% 100% at 50% 0%,black 40%,transparent 100%)"}}/>

            {/* Header */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-8 pb-6 border-b border-white/[0.06]">
                <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-semibold tracking-widest uppercase text-orange-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"/>
                            Panel administratora
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                            Zablokowane{" "}
                            <span className="bg-linear-to-br from-orange-400 to-red-400 bg-clip-text text-transparent">
                                konta
                            </span>
                        </h1>
                        <p className="text-sm text-white/30 font-light mt-1">
                            {users.length} kont z nieprawidłowymi próbami logowania
                        </p>
                    </div>
                    {users.length > 1 && (
                        <button
                            onClick={handleResetAll}
                            disabled={isPending}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-orange-500/20 bg-orange-500/[0.05] text-orange-400 text-xs font-semibold hover:bg-orange-500/[0.1] disabled:opacity-40 transition-all duration-150"
                        >
                            <LockKeyOpenIcon size={14}/>
                            Resetuj wszystkie
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-6">
                <div className="max-w-screen-xl mx-auto">

                    {users.length === 0 ? (
                        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-2xl p-16 text-center">
                            <LockKeyOpenIcon size={32} className="text-white/15 mx-auto mb-3"/>
                            <p className="text-sm text-white/25">Brak zablokowanych kont</p>
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.018] backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.4)] overflow-hidden">
                            <div className="hidden md:grid grid-cols-[1fr_2fr_80px_120px] gap-4 px-6 py-3 border-b border-white/[0.05] text-[10px] font-medium tracking-widest uppercase text-white/25">
                                <span>Użytkownik</span>
                                <span>E-mail</span>
                                <span>Próby</span>
                                <span>Akcja</span>
                            </div>

                            {users.map((user, i) => (
                                <div
                                    key={user.id}
                                    className={[
                                        "grid grid-cols-1 md:grid-cols-[1fr_2fr_80px_120px] gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors",
                                        i !== users.length - 1 ? "border-b border-white/[0.04]" : "",
                                    ].join(" ")}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 text-white/30 overflow-hidden">
                                            {user.image
                                                ? <img src={user.image} alt="" className="w-full h-full object-cover"/>
                                                : <UserIcon size={14}/>
                                            }
                                        </div>
                                        <p className="text-sm font-medium text-white/80 truncate">{user.name} {user.surname}</p>
                                    </div>

                                    <p className="hidden md:block text-sm text-white/40 truncate">{user.email}</p>

                                    <div className="flex items-center gap-1.5">
                                        <WarningDiamondIcon size={13} className="text-orange-400/70"/>
                                        <span className="text-sm font-bold text-orange-400">{user.badAttempts}</span>
                                    </div>

                                    <button
                                        onClick={() => handleReset(user.id)}
                                        disabled={isPending}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-orange-500/20 bg-orange-500/[0.05] text-orange-400 text-xs font-medium hover:bg-orange-500/[0.12] disabled:opacity-40 transition-all duration-150"
                                    >
                                        <LockKeyOpenIcon size={12}/>
                                        Resetuj
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <Link
                        href={shortcuts.settings + shortcuts.admin}
                        className="mt-6 inline-flex items-center gap-2 text-xs text-white/25 hover:text-white/60 transition-colors"
                    >
                        <ArrowLeftIcon size={12}/>
                        Wróć do panelu admina
                    </Link>
                </div>
            </div>
        </div>
    );
}
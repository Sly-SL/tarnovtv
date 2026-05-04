"use server"

import {AdminMiddleware} from "@/middlewares/admin.middleware";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ChartBarIcon,
    GlobeIcon,
    LockKeyIcon,
    ShieldCheckIcon,
    UsersIcon,
    WarningDiamondIcon,
} from "@phosphor-icons/react/ssr";
import {getAdminStatsAction} from "@/actions/admin/get-admin-stats.action";

const Page = async () => {
    await AdminMiddleware();
    const stats = await getAdminStatsAction();

    const statCards = stats ? [
        {label: "Wszyscy użytkownicy",  value: stats.totalUsers,          icon: <UsersIcon size={18} weight="duotone"/>,       color: "text-(--contrast-color) bg-(--contrast-color)/10 border-(--contrast-color)/20"},
        {label: "Aktywne sesje",         value: stats.totalSessions,       icon: <ShieldCheckIcon size={18} weight="duotone"/>, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"},
        {label: "Zablokowane konta",     value: stats.blockedUsers,        icon: <LockKeyIcon size={18} weight="duotone"/>,     color: "text-red-400 bg-red-500/10 border-red-500/20"},
        {label: "Rejestracje (7 dni)",   value: stats.recentRegistrations, icon: <ChartBarIcon size={18} weight="duotone"/>,    color: "text-amber-400 bg-amber-500/10 border-amber-500/20"},
    ] : [];

    const sections = [
        {
            label: "Użytkownicy",
            description: "Zarządzaj kontami i uprawnieniami",
            href: shortcuts.settings + shortcuts.admin + shortcuts.users,
            icon: <UsersIcon size={20} className="text-red-400"/>,
            border: "border-red-500/[0.12] hover:border-red-500/25",
            bg: "bg-red-500/[0.03] hover:bg-red-500/[0.07]",
            iconBg: "bg-red-500/10 border-red-500/20 group-hover:bg-red-500/20",
        },
        {
            label: "Zablokowane konta",
            description: `${stats?.blockedUsers ?? 0} kont z nieprawidłowymi próbami logowania`,
            href: shortcuts.settings + shortcuts.admin + shortcuts.blocked,
            icon: <LockKeyIcon size={20} className="text-orange-400"/>,
            border: "border-orange-500/[0.12] hover:border-orange-500/25",
            bg: "bg-orange-500/[0.03] hover:bg-orange-500/[0.07]",
            iconBg: "bg-orange-500/10 border-orange-500/20 group-hover:bg-orange-500/20",
        },
    ];

    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden">

            {/* Orbs */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-(--contrast-color)/10 blur-[120px] pointer-events-none"/>
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-red-500/[0.07] blur-[100px] pointer-events-none"/>
            <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",backgroundSize:"48px 48px",maskImage:"radial-gradient(ellipse 100% 100% at 50% 0%,black 40%,transparent 100%)"}}/>

            {/* Header */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-8 pb-6 border-b border-white/[0.06]">
                <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-semibold tracking-widest uppercase text-red-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_6px_#f87171] animate-pulse"/>
                            Panel administratora
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                            Witaj w{" "}
                            <span className="bg-linear-to-br from-red-400 to-rose-400 bg-clip-text text-transparent">
                                panelu admina
                            </span>
                        </h1>
                        <p className="text-sm text-white/30 font-light mt-1">
                            Pełna kontrola nad stroną — działaj z rozsądkiem.
                        </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-red-500/20 bg-red-500/[0.04]">
                        <WarningDiamondIcon size={12} className="text-red-400/70"/>
                        <span className="text-[10px] uppercase tracking-widest text-red-400/70 font-semibold">Krytyczna strefa</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-8">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-8">

                    {/* Stats grid */}
                    {stats && (
                        <Animate preset="fadeUp" once>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {statCards.map((s, i) => (
                                    <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-xl p-4">
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center border mb-3 ${s.color}`}>
                                            {s.icon}
                                        </div>
                                        <p className="text-2xl font-extrabold text-white">{s.value}</p>
                                        <p className="text-xs text-white/30 mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </Animate>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                        {/* Sections */}
                        <Animate preset="fadeUp" delay={60} once>
                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium tracking-widest uppercase text-white/35 mb-1">Sekcje</p>
                                {sections.map((s) => (
                                    <Link key={s.href} href={s.href}>
                                        <div className={`group rounded-2xl border ${s.border} ${s.bg} backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)] p-5 flex items-center gap-4 transition-all duration-200 cursor-pointer`}>
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${s.iconBg} transition-colors`}>
                                                {s.icon}
                                            </div>
                                            <div className="flex flex-col gap-0.5 flex-1">
                                                <span className="text-sm font-semibold text-white">{s.label}</span>
                                                <span className="text-xs text-white/30">{s.description}</span>
                                            </div>
                                            <ArrowRightIcon size={14} className="text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-150"/>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </Animate>

                        {/* Sidebar — roles + top countries */}
                        <Animate preset="fadeLeft" delay={120} once>
                            <div className="flex flex-col gap-4">

                                {/* Roles breakdown */}
                                {stats && (
                                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-xl p-5">
                                        <p className="text-[11px] font-medium tracking-widest uppercase text-white/35 mb-4">Podział ról</p>
                                        <div className="flex flex-col gap-2">
                                            {Object.entries(stats.byRole).map(([role, count]) => {
                                                const pct = stats.totalUsers > 0 ? Math.round((count / stats.totalUsers) * 100) : 0;
                                                const colors: Record<string, string> = {
                                                    admin: "bg-red-400",
                                                    moderator: "bg-amber-400",
                                                    user: "bg-(--contrast-color)",
                                                };
                                                return (
                                                    <div key={role}>
                                                        <div className="flex justify-between text-xs mb-1">
                                                            <span className="text-white/50 capitalize">{role}</span>
                                                            <span className="text-white/30">{count}</span>
                                                        </div>
                                                        <div className="w-full h-1.5 rounded-full bg-white/[0.06]">
                                                            <div className={`h-full rounded-full ${colors[role] ?? "bg-white/20"}`} style={{width: `${pct}%`}}/>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Top countries */}
                                {stats && stats.topCountries.length > 0 && (
                                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-xl p-5">
                                        <p className="text-[11px] font-medium tracking-widest uppercase text-white/35 mb-4 flex items-center gap-2">
                                            <GlobeIcon size={12}/>
                                            Top kraje (sesje)
                                        </p>
                                        <div className="flex flex-col gap-2">
                                            {stats.topCountries.map(({country, count}, i) => (
                                                <div key={country} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-white/20 w-4">{i + 1}.</span>
                                                        <span className="text-sm text-white/60">{country}</span>
                                                    </div>
                                                    <span className="text-xs font-semibold text-white/40">{count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Animate>
                    </div>

                    {/* Back */}
                    <Link
                        href={shortcuts.settings + shortcuts.moderator}
                        className="inline-flex items-center gap-2 text-xs text-white/25 hover:text-white/60 transition-colors"
                    >
                        <ArrowLeftIcon size={12}/>
                        Wróć do panelu moderatora
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;
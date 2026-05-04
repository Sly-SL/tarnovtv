"use client";

import {useEffect, useState, useTransition} from "react";
import {
    ArrowLeftIcon,
    MagnifyingGlassIcon,
    ShieldCheckIcon,
    ShieldWarningIcon,
    UserIcon,
    WarningDiamondIcon,
} from "@phosphor-icons/react";
import type {UserType} from "@/shared/types/domen/user.type";
import type {AllUsersRolesType} from "@/shared/types/all/all-user-roles.type";
import {AllUsersRolesEnum} from "@/shared/consts/enums/all-users-roles.enum";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import Link from "next/link";
import {toast} from "sonner";
import {getAllUsersAction} from "@/actions/admin/get-all-users.action";
import {userPatch} from "@/lib/firebase/patch/user.patch";
import {changeUserRoleAction} from "@/actions/admin/change-role.action";

const roleMeta: Record<AllUsersRolesType, {label: string; color: string; icon: React.ReactNode}> = {
    user:      {label: "User",      color: "text-white/50 bg-white/[0.04] border-white/[0.08]",         icon: <UserIcon size={11}/>},
    moderator: {label: "Moderator", color: "text-amber-400 bg-amber-500/10 border-amber-500/20",         icon: <ShieldWarningIcon size={11}/>},
    admin:     {label: "Admin",     color: "text-red-400   bg-red-500/10   border-red-500/20",           icon: <ShieldCheckIcon size={11}/>},
};

export default function AdminUsersPage() {
    const [users, setUsers]       = useState<UserType[]>([]);
    const [filtered, setFiltered] = useState<UserType[]>([]);
    const [search, setSearch]     = useState("");
    const [roleFilter, setRoleFilter] = useState<AllUsersRolesType | "all">("all");
    const [isPending, startTransition] = useTransition();

    const load = async () => {
        const data = await getAllUsersAction();
        setUsers(data);
        setFiltered(data);
    };

    useEffect(() => {load();}, []);

    useEffect(() => {
        const q = search.toLowerCase();
        setFiltered(users.filter(u => {
            const matchSearch = !q || u.name.toLowerCase().includes(q) || u.surname.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
            const matchRole   = roleFilter === "all" || u.role === roleFilter;
            return matchSearch && matchRole;
        }));
    }, [search, roleFilter, users]);

    const handleRoleChange = (userId: string, role: AllUsersRolesType) => {
        startTransition(async () => {
            const result = await changeUserRoleAction(userId, role);
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            toast.success("Rola zaktualizowana");
            await load();
        });
    };

    const handleBadAttempts = (userId: string) => {
        startTransition(async () => {
            try {
                await userPatch({badAttempts: 0}, userId);
                toast.success("Zresetowano złe próby logowania");
                await load();
            } catch {
                toast.error("Błąd przy resetowaniu");
            }
        });
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden">

            {/* Orbs */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-red-500/[0.06] blur-[120px] pointer-events-none"/>
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-(--contrast-color)/[0.05] blur-[100px] pointer-events-none"/>
            <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",backgroundSize:"48px 48px",maskImage:"radial-gradient(ellipse 100% 100% at 50% 0%,black 40%,transparent 100%)"}}/>

            {/* Header */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-8 pb-6 border-b border-white/[0.06]">
                <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-semibold tracking-widest uppercase text-red-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_6px_#f87171] animate-pulse"/>
                            Panel administratora
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                            Zarządzaj{" "}
                            <span className="bg-linear-to-br from-red-400 to-rose-400 bg-clip-text text-transparent">
                                użytkownikami
                            </span>
                        </h1>
                        <p className="text-sm text-white/30 font-light mt-1">
                            {filtered.length} z {users.length} użytkowników
                        </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-red-500/20 bg-red-500/[0.04]">
                        <WarningDiamondIcon size={12} className="text-red-400/70"/>
                        <span className="text-[10px] uppercase tracking-widest text-red-400/70 font-semibold">Krytyczna strefa</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 py-4 border-b border-white/[0.04]">
                <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row gap-3">

                    {/* Search */}
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"/>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Szukaj po imieniu, nazwisku, e-mailu..."
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm placeholder:text-white/20 outline-none focus:border-(--contrast-color)/40 focus:bg-(--contrast-color)/[0.04] transition-all duration-200"
                        />
                    </div>

                    {/* Role filter */}
                    <div className="flex items-center gap-2">
                        {(["all", ...AllUsersRolesEnum] as const).map(r => (
                            <button
                                key={r}
                                onClick={() => setRoleFilter(r as typeof roleFilter)}
                                className={[
                                    "px-3 py-2 rounded-xl border text-xs font-medium transition-all duration-150",
                                    roleFilter === r
                                        ? "border-(--contrast-color)/40 bg-(--contrast-color)/10 text-(--contrast-color)"
                                        : "border-white/[0.07] bg-white/[0.025] text-white/40 hover:text-white/60",
                                ].join(" ")}
                            >
                                {r === "all" ? "Wszyscy" : r.charAt(0).toUpperCase() + r.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-6">
                <div className="max-w-screen-xl mx-auto">
                    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.018] backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.4)] overflow-hidden">

                        {/* Table head */}
                        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-white/[0.05] text-[10px] font-medium tracking-widest uppercase text-white/25">
                            <span>Użytkownik</span>
                            <span>E-mail</span>
                            <span>Rola</span>
                            <span>Złe próby</span>
                            <span>Akcje</span>
                        </div>

                        {/* Rows */}
                        {filtered.length === 0 ? (
                            <div className="py-16 text-center text-white/20 text-sm">Brak wyników</div>
                        ) : (
                            filtered.map((user, i) => (
                                <div
                                    key={user.id}
                                    className={[
                                        "grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center transition-colors duration-150 hover:bg-white/[0.02]",
                                        i !== filtered.length - 1 ? "border-b border-white/[0.04]" : "",
                                    ].join(" ")}
                                >
                                    {/* Name */}
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 text-white/30 overflow-hidden">
                                            {user.image
                                                ? <img src={user.image} alt="" className="w-full h-full object-cover"/>
                                                : <UserIcon size={14}/>
                                            }
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-white/80 truncate">{user.name} {user.surname}</p>
                                            <p className="text-[10px] text-white/25 truncate md:hidden">{user.email}</p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <p className="hidden md:block text-sm text-white/40 truncate">{user.email}</p>

                                    {/* Role select */}
                                    <div>
                                        <select
                                            value={user.role}
                                            disabled={isPending || user.role === "admin"}
                                            onChange={e => handleRoleChange(user.id, e.target.value as AllUsersRolesType)}
                                            className={[
                                                "px-2.5 py-1.5 rounded-lg border text-xs font-semibold outline-none transition-all duration-150",
                                                user.role === "admin" ? "cursor-not-allowed opacity-60" : "cursor-pointer disabled:opacity-40",
                                                roleMeta[user.role].color,
                                            ].join(" ")}
                                        >
                                            {AllUsersRolesEnum.map(r => (
                                                <option key={r} value={r} className="bg-[#0d0f17] text-white">{r}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Bad attempts */}
                                    <div className="flex items-center gap-2">
                                        <span className={[
                                            "text-sm font-bold",
                                            user.badAttempts > 0 ? "text-red-400" : "text-white/25",
                                        ].join(" ")}>
                                            {user.badAttempts}
                                        </span>
                                        {user.badAttempts > 0 && (
                                            <button
                                                onClick={() => handleBadAttempts(user.id)}
                                                disabled={isPending}
                                                className="text-[10px] text-white/25 hover:text-white/60 underline underline-offset-2 transition-colors disabled:opacity-40"
                                            >
                                                reset
                                            </button>
                                        )}
                                    </div>

                                    {/* Role badge mobile */}
                                    <div className="flex items-center gap-1.5">
                                        <span className={["inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold", roleMeta[user.role].color].join(" ")}>
                                            {roleMeta[user.role].icon}
                                            {roleMeta[user.role].label}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Back */}
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
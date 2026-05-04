"use client";

import {useEffect, useRef, useState} from "react";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {GearIcon, SignInIcon, SignOutIcon, UserCircleIcon} from "@phosphor-icons/react";
import {useRouter} from "next/navigation";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {LogoutAction} from "@/actions/auth/logout.action";
import type {UserType} from "@/shared/types/domen/user.type";
import {createPortal} from "react-dom";

export const AccountHeaderButton = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const btnRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        GetUserBySessionIdAction().then((u) => setUser(u ?? null));
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as Node;
            if (btnRef.current?.contains(target)) return;
            if (dropdownRef.current?.contains(target)) return;
            setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleOpen = () => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        const isLegacy = document.documentElement.dataset.mode !== "new";

        if (isMobile) {
            setPos({top: rect.top - 8, left: rect.left + rect.width / 2});
        } else if (isLegacy) {
            setPos({top: rect.bottom + 8, left: rect.left + rect.width / 2});
        } else {
            setPos({top: rect.top + rect.height / 2, left: rect.right + 12});
        }
        setOpen((v) => !v);
    };

    const dropdown = open && (
        <div
            ref={dropdownRef}
            className="fixed z-[99999] w-48 rounded-2xl border border-white/[0.07] bg-black/90 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] overflow-hidden"
            style={{
                top: pos.top,
                left: pos.left,
                transform: (() => {
                    const isMobile = window.innerWidth < 768;
                    const isLegacy = document.documentElement.dataset.mode !== "new";
                    if (isMobile) return "translate(-50%, -100%)";
                    if (isLegacy) return "translateX(-50%)";
                    return "translateY(-50%)";
                })(),
            }}
        >
            <div className="px-4 py-3 border-b border-white/[0.06]">
                <p className="text-xs font-semibold text-white truncate">{user?.name} {user?.surname}</p>
                <p className="text-[10px] text-white/30 truncate">{user?.email}</p>
            </div>
            <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => { setOpen(false); router.push(shortcuts.settings); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
                <GearIcon size={14} />
                Ustawienia
            </button>
            <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={async () => {
                    setOpen(false);
                    await LogoutAction();
                    router.push("/");
                    router.refresh();
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.05] transition-colors"
            >
                <SignOutIcon size={14} />
                Wyloguj się
            </button>
        </div>
    );
    if (!user) {
        return (
            <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(shortcuts.login);
                }}
                className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
            >
                <SignInIcon height={35} width={35} />
                <span className="text-xs">Zaloguj</span>
            </button>
        );
    }

    return (
        <>
            <button
                ref={btnRef}
                onClick={handleOpen}
                className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
            >
                {user.image
                    ? <img src={user.image} className="w-[35px] h-[35px] rounded-full object-cover border border-white/20" alt={user.name} />
                    : <UserCircleIcon height={35} width={35} />}
                <span className="text-[10px] max-w-[60px] truncate">{user.name}</span>
            </button>

            {typeof document !== "undefined" && createPortal(dropdown, document.body)}
        </>
    );
};
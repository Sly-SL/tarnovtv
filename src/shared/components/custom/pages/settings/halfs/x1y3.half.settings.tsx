"use client";

import {useState} from "react";
import {toast} from "sonner";
import {
    BellIcon,
    BellSlashIcon,
    DeviceMobileIcon,
    DownloadIcon,
    EnvelopeIcon,
    EnvelopeOpenIcon,
    GlobeIcon,
    MonitorIcon,
    ShieldCheckIcon,
    ShieldWarningIcon,
    SignOutIcon,
    TrashIcon,
    UserMinusIcon,
    WifiHighIcon,
} from "@phosphor-icons/react";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import type {UserType} from "@/shared/types/domen/user.type";
import type {UserSettingsType} from "@/shared/types/domen/user-settings.type";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import Link from "next/link";
import type {SessionType} from "@/shared/types/domen/session.type";
import {userSettingsEdit} from "@/actions/user/user-settings.edit.action";
import {sendVerificationEmailAction} from "../../../../../../actions/user/send-verification-email.action";
import {revokeSessionAction} from "@/actions/auth/session/revoke-session.action";
import {on2FaAction} from "../../../../../../actions/auth/on-2fa.action";
import {off2FaAction} from "../../../../../../actions/auth/off-2fa.action";
import {exportUserDataAction} from "@/actions/user/export-data.action";

interface X1Y3HalfSettingsProps {
    user: UserType;
    settings: UserSettingsType;
    sessions: SessionType[];
}

const deviceIcon = (type?: string) => {
    if (type === "mobile" || type === "tablet")
        return <DeviceMobileIcon size={16} className="text-black/40 dark:text-white/40"/>;
    return <MonitorIcon size={16} className="text-black/40 dark:text-white/40"/>;
};

const X1Y3HalfSettings = ({user, settings, sessions}: X1Y3HalfSettingsProps) => {
    const [notifications, setNotifications] = useState(settings.isNotificationsAllowed);
    const [twoFactor, setTwoFactor] = useState(settings.isTwoFactorEnabled);
    const [notifLoading, setNotifLoading] = useState(false);
    const [twoFactorLoading, setTwoFactorLoading] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);
    const [revokingId, setRevokingId] = useState<string | null>(null);
    const [exportLoading, setExportLoading] = useState(false);

    const handleToggleNotifications = async () => {
        setNotifLoading(true);
        try {
            await userSettingsEdit({isNotificationsAllowed: !notifications}, user.id);
            setNotifications((v) => !v);
            toast.success(notifications ? "Powiadomienia wyłączone" : "Powiadomienia włączone");
        } catch {
            toast.error("Nie udało się zmienić ustawień");
        } finally {
            setNotifLoading(false);
        }
    };

    const handleExportData = async () => {
        setExportLoading(true);
        try {
            const data = await exportUserDataAction();
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `moje-dane-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success("Dane zostały pobrane");
        } catch (e) {
            toast.error(e instanceof Error ? e.message : "Nie udało się pobrać danych");
        } finally {
            setExportLoading(false);
        }
    };

    const handleToggle2FA = async () => {
        setTwoFactorLoading(true);
        try {
            twoFactor ? await off2FaAction() : await on2FaAction();
            setTwoFactor((v) => !v);
            toast.success(twoFactor ? "2FA wyłączone" : "2FA włączone");
        } catch (e) {
            toast.error(e instanceof Error ? e.message : "Nie udało się zmienić ustawień 2FA");
        } finally {
            setTwoFactorLoading(false);
        }
    };

    const handleResendEmail = async () => {
        setEmailLoading(true);
        try {
            await sendVerificationEmailAction();
            toast.success("E-mail weryfikacyjny został wysłany");
        } catch {
            toast.error("Nie udało się wysłać e-maila");
        } finally {
            setEmailLoading(false);
        }
    };

    const handleRevokeSession = async (sessionId: string) => {
        setRevokingId(sessionId);
        try {
            await revokeSessionAction(sessionId);
            toast.success("Sesja została zakończona");
        } catch {
            toast.error("Nie udało się zakończyć sesji");
        } finally {
            setRevokingId(null);
        }
    };

    return (
        <Animate preset="fadeLeft">
            <div className="relative px-4 sm:px-8 lg:px-12 py-8">
                <div className="mx-auto flex flex-col gap-6">

                    {/* ── Section header ── */}
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-(--contrast-color)/10 border border-(--contrast-color)/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                            <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                            Inne ustawienia
                        </div>
                        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black dark:text-white">
                            Bezpieczeństwo &{" "}
                            <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                                Prywatność
                            </span>
                        </h2>
                        <p className="text-sm text-black/30 dark:text-white/30 font-light mt-1">
                            Zarządzaj sesjami, powiadomieniami i zabezpieczeniami konta.
                        </p>
                    </div>

                    {/* ── Toggle rows ── */}
                    <div className="
                        rounded-2xl overflow-hidden backdrop-blur-xl
                        border border-black/[0.07] bg-black/[0.028] shadow-[0_16px_48px_rgba(0,0,0,0.08)]
                        dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)]
                    ">

                        {/* Notifications */}
                        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-black/[0.05] dark:border-white/[0.05]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07]">
                                    {notifications
                                        ? <BellIcon size={16} className="text-(--contrast-color)"/>
                                        : <BellSlashIcon size={16} className="text-black/30 dark:text-white/30"/>}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-black dark:text-white">Powiadomienia</p>
                                    <p className="text-[11px] text-black/30 dark:text-white/30">Push i e-mail o treściach związanych z projektem</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleToggleNotifications}
                                disabled={notifLoading}
                                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none disabled:opacity-50 ${
                                    notifications ? "bg-(--contrast-color)" : "bg-black/10 dark:bg-white/10"
                                }`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${notifications ? "translate-x-5" : "translate-x-0"}`}/>
                            </button>
                        </div>

                        {/* 2FA */}
                        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-black/[0.05] dark:border-white/[0.05]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07]">
                                    {twoFactor
                                        ? <ShieldCheckIcon size={16} className="text-emerald-400"/>
                                        : <ShieldWarningIcon size={16} className="text-amber-400"/>}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-black dark:text-white">Weryfikacja dwuetapowa (2FA)</p>
                                    <p className="text-[11px] text-black/30 dark:text-white/30">Dodatkowa warstwa ochrony przy logowaniu</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleToggle2FA}
                                disabled={twoFactorLoading}
                                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none disabled:opacity-50 ${
                                    twoFactor ? "bg-emerald-500" : "bg-black/10 dark:bg-white/10"
                                }`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${twoFactor ? "translate-x-5" : "translate-x-0"}`}/>
                            </button>
                        </div>

                        {/* Email verification */}
                        <div className="flex items-center justify-between gap-4 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07]">
                                    {settings.isProvedEmail
                                        ? <EnvelopeOpenIcon size={16} className="text-emerald-400"/>
                                        : <EnvelopeIcon size={16} className="text-amber-400"/>}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-black dark:text-white">Potwierdzenie e-maila</p>
                                    <p className="text-[11px] text-black/30 dark:text-white/30">
                                        {settings.isProvedEmail
                                            ? <span className="text-emerald-400/80">Adres zweryfikowany</span>
                                            : <span className="text-amber-400/80">Adres niezweryfikowany — sprawdź skrzynkę</span>}
                                    </p>
                                </div>
                            </div>
                            {!settings.isProvedEmail && (
                                <BasicButton
                                    size="sm"
                                    variant="outline"
                                    loading={emailLoading}
                                    onClick={handleResendEmail}
                                    className="flex-shrink-0 text-xs border-(--contrast-color)/30 text-(--contrast-color)"
                                >
                                    {!emailLoading && (
                                        <span className="flex gap-2">
                                            Wyślij ponownie
                                            <Animate preset="bounceLoop"><EnvelopeIcon size={20}/></Animate>
                                        </span>
                                    )}
                                </BasicButton>
                            )}
                        </div>
                    </div>

                    {/* ── Active sessions ── */}
                    <div className="
                        rounded-2xl overflow-hidden backdrop-blur-xl
                        border border-black/[0.07] bg-black/[0.028] shadow-[0_16px_48px_rgba(0,0,0,0.08)]
                        dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)]
                    ">
                        <div className="px-6 py-4 border-b border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <WifiHighIcon size={15} className="text-(--contrast-color)/70"/>
                                <span className="text-[11px] font-medium tracking-widest uppercase text-black/35 dark:text-white/35">
                                    Aktywne sesje
                                </span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-(--contrast-color)/10 border border-(--contrast-color)/20 text-(--contrast-color)/70">
                                {sessions.length}
                            </span>
                        </div>

                        <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                            {sessions.length === 0 && (
                                <div className="px-6 py-8 text-center text-black/20 dark:text-white/20 text-sm">
                                    Brak aktywnych sesji
                                </div>
                            )}
                            {sessions.map((session) => (
                                <div key={session.id} className="flex items-center gap-4 px-6 py-3.5">
                                    <div className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07]">
                                        {deviceIcon(session.metadata.device.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-sm font-medium text-black/80 dark:text-white/80 truncate">
                                                {session.metadata.device.browser} · {session.metadata.device.os}
                                            </span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-black/25 dark:text-white/25 font-mono">
                                                {session.metadata.ip}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <GlobeIcon size={10} className="text-black/20 dark:text-white/20 flex-shrink-0"/>
                                            <span className="text-[11px] text-black/25 dark:text-white/25 truncate">
                                                {session.metadata.location.city}{session.metadata.location.country ? `, ${session.metadata.location.country}` : ""}
                                            </span>
                                            <span className="text-black/10 dark:text-white/10">·</span>
                                            <span className="text-[11px] text-black/20 dark:text-white/20">
                                                {new Date(session.lastActivityAt).toLocaleDateString("pl-PL")}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRevokeSession(session.id)}
                                        disabled={revokingId === session.id}
                                        className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border border-red-500/20 bg-red-500/[0.04] text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 disabled:opacity-40"
                                    >
                                        {revokingId === session.id
                                            ? <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"/>
                                            : <SignOutIcon size={12}/>}
                                        Zakończ
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Export data ── */}
                    <div className="
                        rounded-2xl p-6 backdrop-blur-xl
                        border border-black/[0.07] bg-black/[0.028] shadow-[0_16px_48px_rgba(0,0,0,0.08)]
                        dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)]
                    ">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07]">
                                    <DownloadIcon size={16} className="text-(--contrast-color)"/>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-black dark:text-white">Eksport danych</p>
                                    <p className="text-[11px] text-black/30 dark:text-white/30 mt-0.5 max-w-sm">
                                        Pobierz kopię swoich danych: profil, ustawienia i aktywne sesje w formacie JSON.
                                    </p>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <BasicButton
                                    size="sm"
                                    variant="outline"
                                    loading={exportLoading}
                                    onClick={handleExportData}
                                    className="w-full sm:w-auto"
                                >
                                    {!exportLoading && (
                                        <>
                                            <DownloadIcon size={14}/>
                                            Pobierz dane
                                        </>
                                    )}
                                </BasicButton>
                            </div>
                        </div>
                    </div>

                    {/* ── Danger zone ── */}
                    <div className="rounded-2xl border border-red-500/[0.10] bg-red-500/[0.02] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)] p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center bg-red-500/10 border border-red-500/20">
                                    <TrashIcon size={16} className="text-red-400"/>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-black dark:text-white">Deaktywacja konta</p>
                                    <p className="text-[11px] text-black/30 dark:text-white/30 mt-0.5 max-w-sm">
                                        Twoje konto zostanie ukryte. Możesz je przywrócić w ciągu 30 dni.
                                    </p>
                                </div>
                            </div>
                            <Link href={shortcuts.settings + "/deactivate"} className="flex-shrink-0">
                                <BasicButton
                                    size="sm"
                                    className="w-full sm:w-auto border-red-500/30 bg-red-500/[0.06] text-red-400 hover:bg-red-500/15"
                                >
                                    <UserMinusIcon size={14}/>
                                    Deaktywuj konto
                                </BasicButton>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </Animate>
    );
};

export default X1Y3HalfSettings;
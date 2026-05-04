import SettingsForUserPage from "@/shared/components/custom/pages/settings/settings-for-user.page";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import Link from "next/link";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {ArrowRightIcon, ShieldCheckIcon, WarningIcon} from "@phosphor-icons/react";
import {SettingsPageProps} from "@/shared/types/pages/settings.type";

const SettingsForModeratorPage = ({user, settings, sessions}: SettingsPageProps) => (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden">

        {/* ── Background layer ── */}
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-(--contrast-color)/10 blur-[120px] pointer-events-none"/>
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.07] blur-[100px] pointer-events-none"/>
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.018) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
            }}
        />

        {/* ── User settings ── */}
        <div className="relative z-10">
            <SettingsForUserPage user={user} settings={settings} sessions={sessions}/>
        </div>

        {/* ── Moderator section ── */}
        <Animate preset="fadeDown" duration={500}>
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 pb-10">
                <div className="max-w-screen-xl mx-auto">

                    {/* Section divider — amber, одинаково на обоих фонах */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"/>
                        <span className="text-[10px] uppercase tracking-widest text-amber-400/50 font-semibold">
                            Strefa moderatora
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"/>
                    </div>

                    <div className="rounded-2xl border border-amber-500/[0.12] bg-amber-500/[0.03] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)] p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                            {/* Left: icon + text */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20">
                                    <ShieldCheckIcon size={20} className="text-amber-400"/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="inline-flex items-center gap-1.5 w-fit px-2.5 py-0.5 mb-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold tracking-widest uppercase text-amber-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b] animate-pulse"/>
                                        Uprawnienia moderatora
                                    </div>
                                    <h2 className="text-base sm:text-lg font-bold text-black dark:text-white tracking-tight">
                                        Ustawienia moderatora
                                    </h2>
                                    <p className="text-sm text-black/30 dark:text-white/30 font-light max-w-md leading-relaxed">
                                        Przechodzisz do ustawień działających na stronę globalnie.
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <WarningIcon size={12} className="text-amber-400/60"/>
                                        <span className="text-[11px] text-amber-400/60">
                                            Zachowaj szczególną ostrożność — zmiany wpływają na wszystkich użytkowników.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: CTA */}
                            <div className="sm:flex-shrink-0">
                                <Link href={shortcuts.settings + shortcuts.moderator}>
                                    <BasicButton
                                        size="lg"
                                        className="w-full sm:w-auto sm:min-w-[180px] border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                                    >
                                        Przejdź do ustawień
                                        <ArrowRightIcon size={14}/>
                                    </BasicButton>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Animate>
    </div>
);

export default SettingsForModeratorPage;
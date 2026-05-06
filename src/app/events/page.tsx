import {ChatsCircleIcon, RocketLaunchIcon} from "@phosphor-icons/react/ssr";
import {votingsGet} from "@/lib/firebase/get/voting.get";
import ProjectCard from "../../shared/components/custom/body/event.body";
import VotingCard from "@/shared/components/custom/body/voting.body";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {eventGet} from "@/lib/firebase/get/event.get";

const Page = async () => {
    const [events, votings] = await Promise.all([eventGet(), votingsGet()]);
    const user = await GetUserBySessionIdAction();
    const userId = user?.id;
    const publicEvents = events.filter(e => !e.private);

    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-transparent">

            {/* Background */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"/>
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.07] blur-[100px] pointer-events-none"/>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%,black 40%,transparent 100%)",
                }}
            />

            {/* Page header */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-8 pb-6
                            border-b border-gray-100 dark:border-white/[0.06]">
                <div className="max-w-screen-xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full text-[10px] font-semibold tracking-widest uppercase
                                    bg-indigo-50 border border-indigo-200 text-indigo-600
                                    dark:bg-(--contrast-color)/10 dark:border-indigo-500/20 dark:text-(--contrast-color)/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                        Wydarzenia & Głosowania
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight
                                   text-gray-900 dark:text-white">
                        Co{" "}
                        <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                            tworzymy
                        </span>
                    </h1>
                    <p className="text-sm font-light mt-1 max-w-lg
                                  text-gray-500 dark:text-white/30">
                        Nasze eventy i aktywne głosowania — masz wpływ na to, co robimy.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-8">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-12">

                    {/* ── Projects ── */}
                    <section>
                        <div className="flex items-center gap-2 mb-5">
                            <RocketLaunchIcon size={16} className="text-indigo-500 dark:text-(--contrast-color)"/>
                            <span className="text-[11px] font-medium tracking-widest uppercase
                                            text-gray-400 dark:text-white/35">
                                Wydarzenia
                            </span>
                        </div>

                        {publicEvents.length === 0 ? (
                            <div className="rounded-2xl border p-12 text-center text-sm
                                            border-gray-200 bg-gray-50 text-gray-400
                                            dark:border-white/[0.07] dark:bg-white/[0.028] dark:text-white/25">
                                Wydarzenia są w przygotowaniu — wróć wkrótce.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {publicEvents.map((event, i) => (
                                    <ProjectCard
                                        key={event.id}
                                        event={event}
                                        style={{animation: `fadeUp ${0.3 + i * 0.07}s cubic-bezier(0.16,1,0.3,1) both`}}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* ── Votings ── */}
                    <section>
                        <div className="flex items-center gap-2 mb-5">
                            <ChatsCircleIcon size={16} className="text-indigo-500 dark:text-(--contrast-color)"/>
                            <span className="text-[11px] font-medium tracking-widest uppercase
                                            text-gray-400 dark:text-white/35">
                                Głosowania
                            </span>
                        </div>

                        {votings.length === 0 ? (
                            <div className="rounded-2xl border p-12 text-center text-sm
                                            border-gray-200 bg-gray-50 text-gray-400
                                            dark:border-white/[0.07] dark:bg-white/[0.028] dark:text-white/25">
                                Brak aktywnych głosowań.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {votings.map((voting, i) => (
                                    <VotingCard
                                        key={voting.id}
                                        voting={voting}
                                        userId={userId}
                                        style={{animation: `fadeUp ${0.3 + i * 0.07}s cubic-bezier(0.16,1,0.3,1) both`}}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                </div>
            </div>

            <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
    );
};

export default Page;
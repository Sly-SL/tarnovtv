import {projectsGet} from "@/lib/firebase/get/projects.get";
import {ChatsCircleIcon, RocketLaunchIcon} from "@phosphor-icons/react/ssr";
import {votingsGet} from "@/lib/firebase/get/voting.get";
import ProjectCard from "@/shared/components/custom/body/project.body";
import VotingCard from "@/shared/components/custom/body/voting.body";

// TODO: pass real user — replace with your session/cookie util
const getCurrentUserId = (): string | undefined => undefined;

const Page = async () => {
    const [projects, votings] = await Promise.all([projectsGet(), votingsGet()]);
    const userId = getCurrentUserId();
    const publicProjects = projects.filter(p => !p.private);

    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden">

            {/* Background */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"/>
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.07] blur-[100px] pointer-events-none"/>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%,black 40%,transparent 100%)",
                }}
            />

            {/* Page header */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-8 pb-6 border-b border-white/[0.06]">
                <div className="max-w-screen-xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-(--contrast-color)/10 border border-indigo-500/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                        Projekty & Głosowania
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                        Co{" "}
                        <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                            tworzymy
                        </span>
                    </h1>
                    <p className="text-sm text-white/30 font-light mt-1 max-w-lg">
                        Nasze projekty i aktywne głosowania — masz wpływ na to, co robimy.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-8">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-12">

                    {/* ── Projects ── */}
                    <section>
                        <div className="flex items-center gap-2 mb-5">
                            <RocketLaunchIcon size={16} className="text-(--contrast-color)"/>
                            <span className="text-[11px] font-medium tracking-widest uppercase text-white/35">
                                Projekty
                            </span>
                        </div>

                        {publicProjects.length === 0 ? (
                            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.028] p-12 text-center text-white/25 text-sm">
                                Projekty są w przygotowaniu — wróć wkrótce.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {publicProjects.map((project, i) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        style={{animation: `fadeUp ${0.3 + i * 0.07}s cubic-bezier(0.16,1,0.3,1) both`}}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* ── Votings ── */}
                    <section>
                        <div className="flex items-center gap-2 mb-5">
                            <ChatsCircleIcon size={16} className="text-(--contrast-color)"/>
                            <span className="text-[11px] font-medium tracking-widest uppercase text-white/35">
                                Głosowania
                            </span>
                        </div>

                        {votings.length === 0 ? (
                            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.028] p-12 text-center text-white/25 text-sm">
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
 

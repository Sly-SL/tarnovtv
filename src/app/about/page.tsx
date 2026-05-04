import Animate from "@/shared/components/libs/animate/animate.ssr";

const chapters = [
    {
        year: "2024",
        tag: "Początek",
        blocks: [
            {
                preset: "fadeLeft" as const,
                text: (
                    <>
                        Wszystko zaczęło się w lipcu <span className="text-(--contrast-color) font-semibold">2024 roku</span>, podczas warsztatów psychologicznych w fundacji <span className="text-(--contrast-color) font-semibold">Bema 20 w Tarnowie</span>. To właśnie tam narodził się pomysł stworzenia czegoś więcej niż tylko szkolnych wywiadów i krótkich nagrań. Chcieliśmy wyjść poza schemat i zacząć tworzyć materiał, który będzie angażował mieszkańców całego miasta.
                    </>
                ),
            },
            {
                preset: "fadeRight" as const,
                text: (
                    <>
                        Od samego początku naszym celem nie było jedynie nagrywanie filmów. Chcieliśmy zbudować społeczność — aktywną, zaangażowaną i gotową do wspólnego działania. Wtorki i soboty miały stać się dniami premier, a równie ważne było tworzenie przestrzeni do spotkań i wymiany doświadczeń.
                    </>
                ),
            },
        ],
    },
    {
        year: "Działania",
        tag: "Offline",
        blocks: [
            {
                preset: "fadeLeft" as const,
                text: (
                    <>
                        Z czasem nasze działania zaczęły wychodzić daleko poza internet. Organizowaliśmy charytatywne turnieje e-sportowe — <span className="text-(--contrast-color) font-semibold">zebraliśmy m.in. 2000 zł na pomoc zwierzętom oraz 600 zł na wsparcie dzieci</span> — a także wieczory planszówkowe, targi ubraniowe, debaty oksfordzkie i wykłady maturalne.
                    </>
                ),
            },
            {
                preset: "fadeRight" as const,
                text: (
                    <>
                        Początki były skromne — kilku znajomych, prosta kamera i dużo entuzjazmu. Z czasem struktura projektu zaczęła się zmieniać. Tworzyliśmy zespół, w którym każdy miał swoją rolę: od prowadzenia materiałów, przez organizację, aż po montaż.
                    </>
                ),
            },
        ],
    },
    {
        year: "Dziś",
        tag: "Zasięg",
        blocks: [
            {
                preset: "fadeLeft" as const,
                text: (
                    <>
                        Tarnów TV to projekt, który z małej inicjatywy przekształcił się w rozpoznawalne medium lokalne. Nasze treści docierają do tysięcy odbiorców — blisko <span className="text-(--contrast-color) font-semibold">10 tys.</span> na TikToku, <span className="text-(--contrast-color) font-semibold">ponad 6,5 tys.</span> na Instagramie oraz 2 tys. na Facebooku.
                    </>
                ),
            },
            {
                preset: "fadeRight" as const,
                text: (
                    <>
                        Wraz z rozwojem skali i jakości działań, Tarnów TV zaczęło przyjmować bardziej profesjonalny charakter. Dziś funkcjonujemy nie tylko jako projekt społeczny, ale również jako rosnąca inicjatywa medialna z realnym wpływem na lokalną społeczność.
                    </>
                ),
            },
        ],
    },
];

const stats = [
    {value: "10K+", label: "TikTok"},
    {value: "6.5K+", label: "Instagram"},
    {value: "2K+", label: "Facebook"},
    {value: "2024", label: "Rok założenia"},
];

const Page = () => {
    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden">

            {/* Background */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-(--contrast-color)/10 blur-[120px] pointer-events-none"/>
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.07] blur-[100px] pointer-events-none"/>
            <div
                className="absolute inset-0 pointer-events-none dark:opacity-100 opacity-30"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
                }}
            />

            {/* Header */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-8 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="max-w-screen-xl mx-auto">
                    <Animate preset="fadeDown">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-(--contrast-color)/10 border border-(--contrast-color)/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                            <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                            O nas
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-black dark:text-white leading-tight">
                            Nasza{" "}
                            <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                                historia
                            </span>
                        </h1>
                        <p className="text-sm text-black/40 dark:text-white/30 font-light mt-1 max-w-xl">
                            Od warsztatów psychologicznych do rozpoznawalnego medium lokalnego.
                        </p>
                    </Animate>
                </div>
            </div>

            {/* Stats */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 py-6 border-b border-black/[0.04] dark:border-white/[0.04]">
                <div className="max-w-screen-xl mx-auto">
                    <Animate preset="fadeDown" duration={600}>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-xl hover:scale-[1.04] duration-700 border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.028] px-4 py-3 flex flex-col gap-0.5"
                                >
                                    <span className="text-xl font-extrabold text-(--contrast-color)">{s.value}</span>
                                    <span className="text-[11px] text-black/30 dark:text-white/30 uppercase tracking-widest">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </Animate>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-10">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
                    {chapters.map((chapter) => (
                        <div key={chapter.year} className="flex flex-col gap-4">

                            {/* Chapter label */}
                            <div className="flex items-center gap-3">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-black/[0.07] dark:via-white/[0.07] to-transparent"/>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase tracking-widest text-black/25 dark:text-white/25 font-semibold">{chapter.tag}</span>
                                    <span className="px-2.5 py-0.5 rounded-full bg-(--contrast-color)/10 border border-(--contrast-color)/20 text-[10px] font-semibold text-(--contrast-color)/70">
                                        {chapter.year}
                                    </span>
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-black/[0.07] dark:via-white/[0.07] to-transparent"/>
                            </div>

                            {/* Blocks */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {chapter.blocks.map((block, i) => (
                                    <Animate key={i} preset={block.preset} duration={1000}>
                                        <div className="h-full hover:scale-[1.02] duration-700 rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.028] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)] px-6 py-5">
                                            <p className="text-sm text-black/55 dark:text-white/50 leading-relaxed">
                                                {block.text}
                                            </p>
                                        </div>
                                    </Animate>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Final */}
                    <Animate preset="fadeDown" duration={1000}>
                        <div className="rounded-2xl border border-(--contrast-color)/[0.12] bg-(--contrast-color)/[0.04] dark:bg-(--contrast-color)/[0.03] backdrop-blur-xl px-8 py-8 text-center">
                            <p className="text-lg sm:text-xl font-extrabold tracking-tight text-black dark:text-white leading-tight">
                                Tarnów TV to historia, która nadal się pisze —{" "}
                                <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                                    razem z Wami.
                                </span>
                            </p>
                        </div>
                    </Animate>
                </div>
            </div>
        </div>
    );
};

export default Page;
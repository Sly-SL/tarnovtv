import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {ArrowRightIcon, SparkleIcon} from "@phosphor-icons/react/ssr";
import {offersGet} from "@/lib/firebase/get/offers.get";

const OffersPage = async () => {
    const offers = await offersGet();

    return (
        <div className="relative min-h-screen px-4 py-16 overflow-hidden bg-transparent">

            <div className="absolute -top-40 -right-28 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.07] blur-[90px] pointer-events-none"/>
            <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",backgroundSize:"48px 48px",maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)"}}/>

            <div className="relative z-10 max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-14" style={{animation:"fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both"}}>
                    <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full text-[10px] font-semibold tracking-widest uppercase
                                    bg-indigo-50 border border-indigo-200 text-indigo-600
                                    dark:bg-(--contrast-color)/10 dark:border-indigo-500/20 dark:text-(--contrast-color)/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                        Oferta współpracy
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4
                                   text-gray-900 dark:text-white">
                        Promuj się tam, gdzie{" "}
                        <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                            ludzie oglądają
                        </span>
                    </h1>
                    <p className="text-base font-light max-w-xl leading-relaxed
                                  text-gray-500 dark:text-white/30">
                        Tarnów TV to lokalne medium młodzieżowe z realnym zasięgiem na TikToku, Instagramie i Facebooku.
                        Robimy promocję tak, żeby ludzie to oglądali — a nie scrollowali dalej.
                    </p>
                </div>

                {/* Offers grid */}
                {offers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
                        {offers.map((offer, i) => (
                            <div
                                key={offer.id}
                                className={[
                                    "relative flex flex-col rounded-3xl border p-6 transition-all duration-300 backdrop-blur-2xl",
                                    offer.highlight
                                        ? "border-indigo-200 bg-indigo-50 shadow-[0_16px_48px_rgba(99,102,241,0.1)] dark:border-(--contrast-color)/30 dark:bg-(--contrast-color)/[0.06] dark:shadow-[0_0_0_1px_rgba(99,102,241,0.15)_inset,0_32px_64px_rgba(0,0,0,0.5)]"
                                        : "border-gray-200 bg-white shadow-sm hover:border-indigo-200 dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)] dark:hover:border-white/[0.12]",
                                ].join(" ")}
                                style={{animation:`fadeUp ${0.4 + i * 0.07}s cubic-bezier(0.16,1,0.3,1) both`}}
                            >
                                {offer.badge && (
                                    <div className="absolute -top-3 left-5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-(--contrast-color) text-white text-[10px] font-bold tracking-widest uppercase shadow-[0_4px_16px_rgba(99,102,241,0.4)]">
                                        <SparkleIcon size={9}/>
                                        {offer.badge}
                                    </div>
                                )}

                                <h2 className="text-base font-bold leading-tight mb-1
                                               text-gray-900 dark:text-white">{offer.title}</h2>
                                <p className="text-xs mb-4 leading-relaxed
                                              text-gray-400 dark:text-white/35">{offer.subtitle}</p>

                                <ul className="flex flex-col gap-2 mb-6 flex-1">
                                    {offer.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-2 text-xs
                                                                text-gray-500 dark:text-white/50">
                                            <span className={[
                                                "mt-[3px] w-1.5 h-1.5 rounded-full flex-shrink-0",
                                                offer.highlight
                                                    ? "bg-indigo-400 dark:bg-(--contrast-color)"
                                                    : "bg-gray-300 dark:bg-white/20",
                                            ].join(" ")}/>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <div className={[
                                    "mt-auto pt-4 border-t",
                                    offer.highlight
                                        ? "border-indigo-200 dark:border-(--contrast-color)/20"
                                        : "border-gray-100 dark:border-white/[0.06]",
                                ].join(" ")}>
                                    <p className="text-2xl font-extrabold tracking-tight
                                                  text-gray-900 dark:text-white">{offer.price}</p>
                                    {offer.priceNote && (
                                        <p className="text-xs mt-0.5 text-gray-400 dark:text-white/30">
                                            {offer.priceNote}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border p-16 text-center text-sm mb-10
                                    border-gray-200 bg-gray-50 text-gray-400
                                    dark:border-white/[0.07] dark:bg-white/[0.028] dark:text-white/25">
                        Oferta jest aktualnie przygotowywana — wróć wkrótce.
                    </div>
                )}

                {/* CTA */}
                <div className="rounded-3xl border p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-2xl
                                border-gray-200 bg-white shadow-sm
                                dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
                    <div>
                        <p className="text-[11px] font-medium tracking-widest uppercase mb-2
                                      text-gray-400 dark:text-white/35">Gotowy na współpracę?</p>
                        <h2 className="text-2xl font-extrabold leading-tight mb-1
                                       text-gray-900 dark:text-white">Nie robimy reklam jak reklamy.</h2>
                        <p className="text-sm max-w-md font-light
                                      text-gray-500 dark:text-white/30">
                            Twoja marka wchodzi w nasze treści i jest oglądana razem z nimi. Odezwij się — ogarniemy coś pod Ciebie.
                        </p>
                    </div>
                    <Link
                        href={shortcuts.contact}
                        className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-150
                                   bg-linear-to-br from-(--contrast-color) to-indigo-500 shadow-[0_4px_24px_rgba(99,102,241,0.3)] hover:opacity-90 hover:-translate-y-0.5"
                    >
                        Napisz do nas
                        <ArrowRightIcon size={15}/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OffersPage;
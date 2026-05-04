import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {ArrowRightIcon, SparkleIcon} from "@phosphor-icons/react/ssr";
import {offersGet} from "@/lib/firebase/get/offers.get";

const OffersPage = async () => {
    const offers = await offersGet();

    return (
        <div className="relative min-h-screen px-4 py-16 overflow-hidden">

            <div className="absolute -top-40 -right-28 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.07] blur-[90px] pointer-events-none"/>
            <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",backgroundSize:"48px 48px",maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)"}}/>

            <div className="relative z-10 max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-14" style={{animation:"fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both"}}>
                    <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-(--contrast-color)/10 border border-indigo-500/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                        Oferta współpracy
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
                        Promuj się tam, gdzie{" "}
                        <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                            ludzie oglądają
                        </span>
                    </h1>
                    <p className="text-base text-white/30 font-light max-w-xl leading-relaxed">
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
                                    "relative flex flex-col rounded-3xl border backdrop-blur-2xl p-6 transition-all duration-300",
                                    offer.highlight
                                        ? "border-(--contrast-color)/30 bg-(--contrast-color)/[0.06] shadow-[0_0_0_1px_rgba(99,102,241,0.15)_inset,0_32px_64px_rgba(0,0,0,0.5)]"
                                        : "border-white/[0.07] bg-white/[0.028] shadow-[0_16px_48px_rgba(0,0,0,0.4)] hover:border-white/[0.12]",
                                ].join(" ")}
                                style={{animation:`fadeUp ${0.4 + i * 0.07}s cubic-bezier(0.16,1,0.3,1) both`}}
                            >
                                {offer.badge && (
                                    <div className="absolute -top-3 left-5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-(--contrast-color) text-white text-[10px] font-bold tracking-widest uppercase shadow-[0_4px_16px_rgba(99,102,241,0.4)]">
                                        <SparkleIcon size={9}/>
                                        {offer.badge}
                                    </div>
                                )}

                                <h2 className="text-base font-bold text-white mb-1 leading-tight">{offer.title}</h2>
                                <p className="text-xs text-white/35 mb-4 leading-relaxed">{offer.subtitle}</p>

                                <ul className="flex flex-col gap-2 mb-6 flex-1">
                                    {offer.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-2 text-xs text-white/50">
                                            <span className={["mt-[3px] w-1.5 h-1.5 rounded-full flex-shrink-0", offer.highlight ? "bg-(--contrast-color)" : "bg-white/20"].join(" ")}/>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <div className={["mt-auto pt-4 border-t", offer.highlight ? "border-(--contrast-color)/20" : "border-white/[0.06]"].join(" ")}>
                                    <p className="text-2xl font-extrabold text-white tracking-tight">{offer.price}</p>
                                    {offer.priceNote && <p className="text-xs text-white/30 mt-0.5">{offer.priceNote}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.028] p-16 text-center text-white/25 text-sm mb-10">
                        Oferta jest aktualnie przygotowywana — wróć wkrótce.
                    </div>
                )}

                {/* CTA */}
                <div className="rounded-3xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.4)] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <p className="text-[11px] font-medium tracking-widest uppercase text-white/35 mb-2">Gotowy na współpracę?</p>
                        <h2 className="text-2xl font-extrabold text-white leading-tight mb-1">Nie robimy reklam jak reklamy.</h2>
                        <p className="text-sm text-white/30 max-w-md font-light">
                            Twoja marka wchodzi w nasze treści i jest oglądana razem z nimi. Odezwij się — ogarniemy coś pod Ciebie.
                        </p>
                    </div>
                    <Link
                        href={shortcuts.contact}
                        className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-linear-to-br from-(--contrast-color) to-indigo-500 text-white text-sm font-semibold tracking-wide shadow-[0_4px_24px_rgba(99,102,241,0.3)] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-150"
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
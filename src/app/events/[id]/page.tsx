import Image from "next/image";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {ArrowLeftIcon, HashIcon, LockIcon, SparkleIcon, StarIcon} from "@phosphor-icons/react/ssr";
import type {EventsType} from "@/shared/types/domen/events.type";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import type {Metadata} from "next";
import {eventByIdGet} from "@/lib/firebase/get/event-by-id.get";

interface Props {
    params: Promise<{id: string}>;
}

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {id} = await params;
    const event = await eventByIdGet({id});

    if (!event) return {title: "Projekt nie znaleziony"};

    return {
        title: event.name,
        description: event.description ?? "Amazing Project",
        openGraph: {
            title: event.name,
            description: event.description,
            type: "website",
            url: `${CONSTANTS.FRONTEND_URL}/events/${id}`,
            images: [{url: event.image, width: 1200, height: 630, alt: event.name}],
        },
        twitter: {card: "summary_large_image", title: event.name, description: event.description, images: [event.image]},
        metadataBase: new URL(CONSTANTS.FRONTEND_URL),
    };
};

const ProjectDetails = async ({params}: Props) => {
    const {id} = await params;
    const event: EventsType | null = await eventByIdGet({id});

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-full border-2 border-black/10 border-t-black/40 animate-spin dark:border-white/10 dark:border-t-white/40"/>
                    <p className="text-sm text-black/30 dark:text-white/30">Ładowanie projektu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen px-4 py-16 overflow-hidden">

            {/* Background blobs */}
            <div className="absolute -top-40 -right-28 w-[500px] h-[500px] rounded-full bg-amber-500/[0.07] blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",backgroundSize:"48px 48px",maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)"}}/>

            <div className="relative z-10 max-w-5xl mx-auto" style={{animation:"fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both"}}>
                <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

                {/* Breadcrumb */}
                <div className="flex items-center gap-3 mb-10">
                    <Link
                        href={shortcuts.events}
                        className="inline-flex items-center gap-2 text-xs text-(--contrast-color)/30 transition-colors dark:text-white/30 dark:hover:text-white/60"
                    >
                        <ArrowLeftIcon size={12}/>
                        Projekty
                    </Link>
                    <span className="text-black/15 dark:text-white/15">/</span>
                    <span className="text-xs text-(--contrast-color) truncate">{event.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">

                    {/* Left col */}
                    <div className="flex flex-col gap-6">

                        {/* Title block */}
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                                <SparkleIcon size={9}/>
                                Projekt
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-extrabold tracking-tight text-black dark:text-white">{event.name}</h1>
                                {event.private && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/[0.05] border border-black/[0.07] text-[9px] font-bold uppercase tracking-widest text-(--contrast-color) dark:bg-white/[0.05] dark:border-white/[0.07]">
                                        <LockIcon size={8}/>
                                        Prywatny
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-black/40 font-light leading-relaxed dark:text-white/40">{event.description}</p>
                        </div>

                        {/* Hashtags */}
                        {event.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {event.hashtags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-xl border border-black/[0.07] bg-black/[0.028] text-xs text-black/40 dark:border-white/[0.07] dark:bg-white/[0.028] dark:text-white/40"
                                    >
                                        <HashIcon size={10}/>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Interesting facts */}
                        {event.interesting.length > 0 && (
                            <div className="rounded-2xl border border-black/[0.07] bg-black/[0.028] backdrop-blur-xl p-5 dark:border-white/[0.07] dark:bg-white/[0.028]">
                                <div className="flex items-center gap-2 mb-4">
                                    <StarIcon size={14} className="text-(--contrast-color)"/>
                                    <p className="text-xs font-semibold tracking-widest uppercase text-(--contrast-color)">Ciekawostki</p>
                                </div>
                                <ul className="flex flex-col gap-2.5">
                                    {event.interesting.map((fact, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1 h-1 rounded-full bg-black/20 shrink-0 dark:bg-white/20"/>
                                            <span className="text-sm text-black/50 leading-relaxed dark:text-white/50">{fact}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right col — image */}
                    <div className="flex flex-col gap-4">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-black/[0.07] bg-black/[0.028] group dark:border-white/[0.07] dark:bg-white/[0.028]">
                            <Image
                                src={event.image}
                                alt={event.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
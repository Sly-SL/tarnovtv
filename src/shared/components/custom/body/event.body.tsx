import Link from "next/link";
import Image from "next/image";
import type {EventsType} from "../../../types/domen/events.type";
import type {CSSProperties} from "react";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";

export const revalidate = 3600

type Props = {
    event: EventsType;
    style?: CSSProperties;
};

const EventCard = ({event, style}: Props) => {
    return (
        <Link href={shortcuts.events + "/" + event.id}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col"
            style={style}
        >
            {/* Image */}
            {event.image && (
                <div className="relative w-full h-44 shrink-0">
                    <Image src={event.image} alt={event.name} fill className="object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                </div>
            )}

            <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Title */}
                <div>
                    <p className="text-base font-bold text-white leading-tight">{event.name}</p>
                    <p className="text-xs text-white/35 mt-1 leading-relaxed">{event.description}</p>
                </div>

                {/* Interesting facts */}
                {event.interesting.length > 0 && (
                    <ul className="flex flex-col gap-1.5">
                        {event.interesting.map((fact, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                                <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-(--contrast-color)/60 shrink-0"/>
                                {fact}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Hashtags */}
                {event.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                        {event.hashtags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-full border border-(--contrast-color)/20 bg-(--contrast-color)/[0.07] text-(--contrast-color)/70 text-[10px] font-medium"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
};

export default EventCard;
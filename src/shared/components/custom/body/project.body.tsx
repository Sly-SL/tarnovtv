export const revalidate = 3600

import Image from "next/image";
import type {ProjectType} from "@/shared/types/domen/project.type";
import type {CSSProperties} from "react";

type Props = {
    project: ProjectType;
    style?: CSSProperties;
};

const ProjectCard = ({project, style}: Props) => {
    return (
        <div
            className="rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col"
            style={style}
        >
            {/* Image */}
            {project.image && (
                <div className="relative w-full h-44 shrink-0">
                    <Image src={project.image} alt={project.name} fill className="object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                </div>
            )}

            <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Title */}
                <div>
                    <p className="text-base font-bold text-white leading-tight">{project.name}</p>
                    <p className="text-xs text-white/35 mt-1 leading-relaxed">{project.description}</p>
                </div>

                {/* Interesting facts */}
                {project.interesting.length > 0 && (
                    <ul className="flex flex-col gap-1.5">
                        {project.interesting.map((fact, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                                <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-(--contrast-color)/60 shrink-0"/>
                                {fact}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Hashtags */}
                {project.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                        {project.hashtags.map((tag) => (
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
        </div>
    );
};

export default ProjectCard;
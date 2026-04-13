'use client'

import type {FC} from "react";
import {useEffect, useState} from "react";
import type {AllSectionsProjectsType} from "@/shared/types/all-sections-projects.type";

interface ToggleButtonProps {
    type: AllSectionsProjectsType;
}

export const ToggleButtonProjects: FC<ToggleButtonProps> = ({ type }) => {
    const [isHiddenNow, setIsHiddenNow] = useState(true);

    const [elements, setElements] = useState<{
        allProjects: HTMLElement | null;
        desktopShowLess: HTMLElement | null;
        mobileShowLess: HTMLElement | null;
    }>({ allProjects: null, desktopShowLess: null, mobileShowLess: null });

    useEffect(() => {
        const allProjects = document.getElementById(`${type}-show-more`);
        const desktopShowLess = document.getElementById(`${type}-desktop-show-less`);
        const mobileShowLess = document.getElementById(`${type}-mobile-show-less`);
        setElements({ allProjects, desktopShowLess, mobileShowLess });

        setIsHiddenNow(allProjects?.classList.contains("hidden") ?? true);
    }, [type]);

    const toggleShowMore = () => {
        if (!elements.allProjects || !elements.desktopShowLess || !elements.mobileShowLess) return;

        if (isHiddenNow) {
            elements.desktopShowLess.classList.add("hidden");
            elements.desktopShowLess.classList.remove("md:grid");
            elements.mobileShowLess.classList.add("md:hidden");
            elements.mobileShowLess.classList.remove("grid");

            elements.allProjects.classList.remove("hidden");
            elements.allProjects.classList.add("grid");
        } else {
            elements.allProjects.classList.remove("grid");
            elements.allProjects.classList.add("hidden");

            if(window.innerWidth < 768) {
                elements.mobileShowLess.classList.remove("md:hidden");
                elements.mobileShowLess.classList.add("grid");
            } else {
                elements.desktopShowLess.classList.remove("hidden")
                elements.desktopShowLess.classList.add("md:grid")
            }

        }

        setIsHiddenNow(!isHiddenNow);
    };

    return (
        <button
            onClick={toggleShowMore}
            className="
                px-3 py-1.5
                text-slate-300
                hover:text-white
                text-sm
                font-medium
                transition-all
                duration-300
                ease-in-out
                flex
                items-center
                gap-2
                bg-white/5
                hover:bg-white/10
                rounded-md
                border
                border-white/10
                hover:border-white/20
                backdrop-blur-sm
                group
                relative
                overflow-hidden
            "
        >
            <span className="relative z-10 flex items-center gap-2">
                {isHiddenNow ? "See More" : "See Less"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`
                        transition-transform 
                        duration-1000
                        ${isHiddenNow ? "group-hover:translate-y-0.5" : "group-hover:-translate-y-0.5"}
                    `}
                >
                    <polyline points={isHiddenNow ? "6 9 12 15 18 9" : "18 15 12 9 6 15"}></polyline>
                </svg>
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
        </button>
    );
};
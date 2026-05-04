'use client'

import {useState} from 'react';
import {CertificateIcon, CodeIcon, PackageIcon} from "@phosphor-icons/react";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import type {AllSectionsProjectsType} from "@/shared/types/all/all-sections-projects.type";

const ToggleProject = () => {
    const [value, setValue] = useState<AllSectionsProjectsType>("projects");

    const handleChange = (val: AllSectionsProjectsType) => {
        const sections = document.querySelectorAll<HTMLElement>(".project-section");

        sections.forEach(section => {
            section.classList.add("hidden");
            section.classList.remove("block");
        });

        const target = document.getElementById(val + "-project-section");

        if (target) {
            target.classList.remove("hidden");
            target.classList.add("block");
        }

        setValue(val);
    };

    return (
        <Animate preset={"fadeLeft"} duration={1200}>
            <div className="relative overflow-hidden rounded-[20px] border border-white/10 sm:px-2 before:absolute before:inset-0 before:z-0 before:bg-linear-to-b before:from-purple-400/3 before:to-blue-500/3 before:backdrop-blur-[10px]">
                <div className="relative z-10">
                    <div className="flex gap-2 w-full">
                        <button className={`flex group w-full flex-col items-center px-4 sm:px-6 py-5 rounded-xl transition-all duration-400 ${
                            value === "projects" ? "bg-linear-to-br from-purple-400/20 to-blue-500/20 shadow-md dark:text-white text-black" : "text-gray-400"
                        }`}
                                onClick={() => handleChange("projects")}>
                            <CodeIcon className="mb-2 w-5 h-5 group-hover:rotate-[20deg] transition-transform duration-300" />
                            Projekty
                        </button>

                        <button className={`flex w-full group flex-col items-center px-4 sm:px-6 m-1 py-4 rounded-xl transition-all duration-400 ${
                            value === "documents" ? "bg-linear-to-br from-purple-400/20 to-blue-500/20 shadow-md dark:text-white text-black" : "text-gray-400"
                        }`}
                                onClick={() => handleChange("documents")}

                        >
                            <CertificateIcon className="mb-2 w-5 h-5 group-hover:rotate-[20deg] transition-transform duration-300" />
                            Dokumenty
                        </button>

                        <button className={`flex group flex-col w-full items-center px-4 sm:px-6 py-4 rounded-xl transition-all duration-400 ${
                            value === "tech" ? "bg-linear-to-br from-purple-400/20 to-blue-500/20 shadow-md dark:text-white text-black" : "text-gray-400"
                        }`}
                                onClick={() => handleChange("tech")}>
                            <PackageIcon className="mb-2 w-5 h-5 group-hover:rotate-[20deg] transition-transform duration-300" />
                            Technologie
                        </button>
                    </div>
                </div>
            </div>
        </Animate>
    );
};

export default ToggleProject;
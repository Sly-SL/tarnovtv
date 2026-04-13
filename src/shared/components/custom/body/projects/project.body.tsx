import Link from "next/link";
import type {FC} from "react";
import Image from "next/image";
import {ArrowRightIcon, ShareNetworkIcon} from "@phosphor-icons/react";

interface CardProjectProps{
    Img:string,
    Title:string,
    Description:string,
    Link:string|null,
    id:string,
}

const ProjectBody:FC<CardProjectProps> = ({ Img, Title, Description, Link: ProjectLink, id }) => {

    return (
        <div className="group relative w-full">

            <div className="relative overflow-hidden rounded-xl backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-white/40">
                <div className="absolute inset-0 bg-white/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

                <div className="relative p-5 z-10">
                    <div className="relative overflow-hidden rounded-lg">
                        <Image
                            src={Img}
                            alt={Title}
                            height={200}
                            width={300}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="mt-4 space-y-3">
                        <h3 className="text-xl font-semibold bg-gradient-to-r dark:from-blue-200 dark:via-purple-200 dark:to-pink-200 from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                            {Title}
                        </h3>

                        <p className="dark:text-gray-300/80 text-gray-700/70 text-sm leading-relaxed line-clamp-2">
                            {Description}
                        </p>

                        <div className="pt-4 flex items-center justify-between">
                            {ProjectLink ? (
                                <a
                                    href={"https://"+ProjectLink || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                >
                                    <span className="text-sm font-medium">Live Demo</span>
                                    <ShareNetworkIcon className="w-4 h-4" />
                                </a>
                            ) : (
                                <span className="text-gray-500 text-sm">Demo nie dostępne</span>
                            )}



                            {id ? (
                                <Link
                                    href={`/projects/${id}`}
                                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg dark:bg-white/5 dark:hover:bg-white/10 dark:text-white/90
                                    bg-black/20 hover:bg-black/30
                                     transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
                                >
                                    <span className="text-sm font-medium">Szczególy</span>
                                    <ArrowRightIcon className="w-4 h-4" />
                                </Link>
                            ) : (
                                <span className="text-gray-500 text-sm">Szczególy są nie dostępne</span>
                            )}
                        </div>
                    </div>

                    <div className="absolute inset-0 border border-white/0 group-hover:border-white/50 rounded-xl transition-colors duration-300 -z-50"></div>
                </div>
            </div>
        </div>
    );
};

export default ProjectBody;

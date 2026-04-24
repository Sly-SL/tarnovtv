import {ArrowUpRightIcon} from "@phosphor-icons/react/ssr";
import type {ComponentType, SVGProps} from "react";

interface StatCardProps {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    color: string;
    value: string | number;
    label: string;
    description: string;
}

export const StatCard = ({ icon: Icon, color, value, label, description }: StatCardProps) => {
    return (
        <div
            className="relative group"
        >
            <div className={`relative z-10 hover:scale-105 duration-700 bg-gray-900/40 backdrop-blur rounded-xl p-4 py-6 border border-white/10 h-full flex flex-col justify-between overflow-hidden`}>
                <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

                <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10">
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span
                        className="text-xl font-bold text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white"
                    >
                        {value}
                    </span>
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white mb-1">{label}</p>
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-(--contrast-color)/80 group-hover:text-(--contrast-color)duration-700">{description}</p>
                        <ArrowUpRightIcon className="w-4 h-4 text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    )
};
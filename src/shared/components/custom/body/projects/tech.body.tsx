import type {FC} from "react";
import Image from "next/image";
import type {StaticImport} from "next/dist/shared/lib/get-img-props";

interface TechStackProps {
    TechStackIcon: string | StaticImport;
    Language: string;
}

const TechStackBody: FC<TechStackProps> = ({ TechStackIcon, Language }) => {
    return (
        <div className="group p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
                {/* Glow Overlay */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                <Image
                    src={TechStackIcon}
                    alt={`${Language} icon`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="relative transform transition-transform duration-300"
                />
            </div>
            <span className="text-slate-300 font-semibold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
                {Language}
            </span>
        </div>
    );
};

export default TechStackBody;
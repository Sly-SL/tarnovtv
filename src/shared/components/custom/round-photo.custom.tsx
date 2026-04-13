import type {StaticImageData} from "next/image";
import Image from "next/image";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const RoundPhotoCustom = ({photo,alt}:{photo:StaticImageData,alt:string}) => {
    return (
        <div className="flex justify-end items-center sm:p-14 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
            <Animate
                className="relative group"
                preset={"fadeUp"}
                duration={1000}
            >
                {/* Optimized gradient backgrounds with reduced complexity for mobile */}
                <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
                    <div className="absolute inset-0 bg-linear-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
                    <div className="absolute inset-0 bg-linear-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
                </div>

                <div className="relative">
                    <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-88 md:h-88 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
                        <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />

                        {/* Optimized overlay effects - disabled on mobile */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

                        <Image
                            src={photo.src}
                            alt={alt}
                            height={photo.height}
                            width={photo.width}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                            loading="lazy"
                        />

                        {/* Advanced hover effects - desktop only */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
                            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
                        </div>
                    </div>
                </div>
            </Animate>
        </div>
    );
};

export default RoundPhotoCustom;
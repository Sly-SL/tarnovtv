import type {FC} from "react";
import Link from "next/link";

export const GoogleMaps: FC = () => {
    return (
        <Link href={"https://maps.app.goo.gl/qYteeh7hsa8L4caT6"} className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
            <div className="relative group">
                <div className="absolute -inset-6 opacity-50 z-0 hidden sm:block animate-pulse">
                    <div className="absolute inset-0 bg-gray-600 rounded-full blur-2xl" />
                </div>

                <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-sm">
                    <div className="absolute inset-0 border-2 border-white/20 rounded-full z-20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />

                    <div className="w-full h-full rounded-full">
                        <iframe
                            title="Mapa lokalizacji"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82022.92977427205!2d20.895579125466696!3d50.02603787847643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473d834352c3ffc7%3A0xcf1a70dff872f61e!2s33-100%20Tarn%C3%B3w!5e0!3m2!1spl!2spl!4v1774981934367!5m2!1spl!2spl"
                            width="100%"
                            height="100%"
                            className="rounded-full border-0 transform transition-transform duration-500 ease-out pointer-events-auto group-hover:scale-110 group-hover:translate-x-1 group-hover:translate-y-1"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>

                    <div className="absolute inset-0 rounded-full border-4 border-white/10 z-20"/>
                </div>
            </div>
        </Link>
    );
};
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";

const NotFound = () => {
    return (
        <article
            className="flex -z-2 flex-col text-center items-center justify-center min-h-screen dark:text-white">
            <div className="relative p-5 m-1 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-[25px] border border-white/20 shadow-lg">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -z-1 inset-0 bg-white/5 backdrop-blur-[5px] rounded-2xl"/>
                    <div className="absolute -z-1 inset-0 rounded-2xl shadow-[inset_0_0_50px_rgba(255,255,255,0.1)]"/>
                </div>

                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-8 dark:text-white text-black">Oppss! Strona którą szukasz jest niedostępna.<br/> Sprawdź czy posiadasz uprawnienia na jej przegłąd</p>
                <Link href={shortcuts.home} className="px-6 py-3 bg-(--contrast-color)/80 text-white rounded-xl hover:bg-(--contrast-color) transition-colors">
                    Wróć
                </Link>
            </div>
        </article>
    );
};

export default NotFound;
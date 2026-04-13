import NotFound from "@/app/not-found";
import {AdminMiddleware} from "@/middlewares/admin";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const Page = async () => {
    const guard = await AdminMiddleware();

    if (!guard || guard.status != 200)
        return <NotFound />;


    return(
        <article
            className="flex -z-2 flex-col text-center items-center justify-center min-h-screen dark:text-white">
            <div className="relative p-5 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-[25px] border border-white/20 shadow-lg">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -z-1 inset-0 bg-white/5 backdrop-blur-[5px] rounded-2xl"/>
                    <div className="absolute -z-1 inset-0 rounded-2xl shadow-[inset_0_0_50px_rgba(255,255,255,0.1)]"/>
                </div>

                <h1 className="text-6xl font-bold mb-4">Wybierz czego potrzebujesz</h1>
                <p className="text-xl mb-8 text-white">w panelu admina możesz sterować projektami i dokumentami <br/> Podchodź do tego z rozsądkiem</p>
                <Animate preset={"fadeUp"} className={"grid gap-5"}>
                    <Link href={shortcuts.admin+shortcuts.projects} className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors">
                        Projekty
                    </Link>
                    <Link href={shortcuts.admin + shortcuts.documents} className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors">
                        Dokumenty
                    </Link>
                    <Link href={shortcuts.home} className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors">
                        Wróć
                    </Link>
                </Animate>
            </div>
        </article>
    );
};

export default Page;
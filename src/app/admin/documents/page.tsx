import {AdminMiddleware} from "@/middlewares/admin";
import NotFound from "@/app/not-found";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {BasicH1} from "@/shared/components/libs/basic/text/h1.text";
import {BasicP} from "@/shared/components/libs/basic/text/p.text";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import AddDocumentForm from "@/shared/components/forms/add-document.form";

const Page = async () => {
    const guard = await AdminMiddleware();

    if (!guard || guard.status != 200)
        return <NotFound />


    return(
        <section className="grid min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div
                className="px-8 absolute flex animate-fade-in-down duration-500 aspect-video w-full items-center justify-center bg-center bg-cover bg-no-repeat"
            />

            <article className={"p-12 gap-3 grid grid-cols-1"}>
                <div className={"relative rounded-2xl overflow-hidden p-8  bg-white/5 backdrop-blur-[25px] shadow-lg"}>

                    <div className="flex justify-between items-center mb-6">
                        <Link href={shortcuts.admin}>
                            <BasicButton
                                className="hover:opacity-80 z-1 transition duration-200"
                            >
                                ← Wstecz
                            </BasicButton>
                        </Link>
                    </div>
                    <BasicH1 className={"bg-none hover:shadow-white/20 animate-fade-in-down duration-500 hover:shadow-xl transition-all"}>
                        Dodaj zdjęcie
                    </BasicH1>
                    <BasicP className={'text-black/70 text-center dark:text-white/80 duration-500 animate-fade-in-up'}>Dodaj plik i się automatycznie umieści na stronie </BasicP>
                </div>
                <AddDocumentForm/>
            </article>
        </section>
    );
};

export default Page;
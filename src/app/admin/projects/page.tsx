import NotFound from "@/app/not-found";
import {AddWorkForm} from "@/shared/components/forms/add-work/add-work.form";
import {AdminMiddleware} from "@/middlewares/admin";

const Page = async () => {
    const guard = await AdminMiddleware();

    if (!guard || guard.status != 200)
        return <NotFound />;


    return(
        <section className="grid min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="px-8 absolute flex animate-fade-in-down duration-500 aspect-video w-full items-center justify-center bg-center bg-cover bg-no-repeat"
            />

            <article className={"p-12 gap-3 grid grid-cols-1"}>
                <AddWorkForm/>
            </article>
        </section>
    );
};

export default Page;
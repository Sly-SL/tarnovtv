import {BasicH1} from "@/shared/components/libs/basic/text/h1.text";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";

const Page = () => {
    return (
        <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
            <div className={"h-screen grid items-center justify-center w-full bg-white/30 dark:bg-black/40"}>
                <div className={"flex flex-col gap-4 items-center justify-center w-full max-w-sm p-6 bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/20"}>
                    <BasicH1 className="text-purple-300 text-3xl mb-2">
                        Link został wysłany
                    </BasicH1>

                    <BasicButton>
                        <Link href={shortcuts.home}>Wróć</Link>
                    </BasicButton>
                </div>
            </div>
        </div>
    );
};

export default Page;
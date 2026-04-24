import Link from "next/link";
import {BUTTONSLEGACY} from "@/shared/consts/enums/buttons-header.enum";
import LiquidGlassCustom from "@/shared/components/custom/liquid-glass.custom";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const Page = () => {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 p-2 items-center justify-center"}>
                <h1 className={"hidden"}>
                    Więcej
                </h1>
            {BUTTONSLEGACY.filter((btn)=>btn.mobile != true).map((button, i) => (
                <Animate key={i} className={"h-full w-full"} preset={i % 4 === 3 ? "fadeLeft": i % 4 === 2 ? "fadeUp" : i % 4 === 1 ? "fadeDown" : "fadeRight"}>
                    <Link className={"hover:scale-[1.02] duration-700"} href={button.link}>
                        <LiquidGlassCustom className={"grid h-full w-full items-center justify-center"}>
                            {button.children}
                        </LiquidGlassCustom>
                    </Link>
                </Animate>
            ))}

        </div>
    );
};

export default Page;
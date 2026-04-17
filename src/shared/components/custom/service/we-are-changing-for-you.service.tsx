import {BasicH1} from "@/shared/components/libs/basic/text/h1.text";
import {BasicH2} from "@/shared/components/libs/basic/text/h2.text";
import Logo from "@/public/assets/logo.jpeg"
import Image from "next/image";
import {GearIcon, HammerIcon} from "@phosphor-icons/react/ssr";

const WeAreChangingForYou = ({description}:{description:string}) => {
    return (
        <article
            className="hover:scale-[1.02] bg-white/10 pt-5 rounded-2xl border-4 border-purple-500/40 duration-300 items-center flex flex-col justify-center h-[300px] md:h-[300px] lg:h-[350px]"
        >
            <div className="flex bg-gradient-to-r from-orange-300 via-orange-500 to-red-600 bg-clip-text">
                <HammerIcon size={55} /><GearIcon size={55} />
            </div>
            <BasicH1 className="text-center text-lg md:text-3xl pt-5 bg-gradient-to-r from-blue-500/80 via-purple-500/85 to-red-600 bg-clip-text text-transparent">
                Zmieniamy się dla ciebie!
            </BasicH1>

            <BasicH2 className="text-center md:text-2xl text-sm pt-5">
                {description}
            </BasicH2>
                <Image src={Logo} className={"md:pt-4 p-4 h-[100px] w-[300px] md:h-[150px] md:w-[600px]"} alt={"EcoKominki"} />
        </article>
    );
};

export default WeAreChangingForYou;
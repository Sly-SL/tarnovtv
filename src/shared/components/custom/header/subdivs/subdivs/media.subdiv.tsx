import Link from "next/link";
import type {CascadeShortcutsType} from "@/shared/types/shortcuts.type";
import {shortcutsSlysl} from "@/shared/consts/enums/shortcuts.enum";
import SubdivConstructor from "@/shared/components/custom/header/subdivs/subdiv-constructor.subdiv";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const Buttons:{label:string,linkClassName:string,buttons:
        {
            name:string,
            href:CascadeShortcutsType,
        }[]
}[]=[
    {label:"Slysl",linkClassName:'text-3xl',buttons:[
            {name:"Youtube", href:shortcutsSlysl.yt},
            {name:"Github", href:shortcutsSlysl.github},
            {name:"Tiktok", href:shortcutsSlysl.tiktok},
            {name:"Instagram", href:shortcutsSlysl.instagram},
        ]},
]

const MediaSubdiv = () => {
    return (
        <SubdivConstructor id={"media"}>
            <div className={"grid items-start justify-center gap-18"}>
                {Buttons.map((item, i) => (
                    <div className={"grid grid-cols-1"} key={i}>
                        <label className={"text-sm font-light pb-1 text-[rgb(134,134,139)]"}>
                            {item.label}
                        </label>

                        {item.buttons.map((button, i) => ((
                            <Animate preset={i % 4 == 1 ? "fadeRight" : i % 4 == 2 ?  "fadeDown": i % 4 == 3 ? "fadeUp" : "fadeLeft"} key={i}>
                                <Link className={item.linkClassName+" text-black/90 hover:text-black dark:text-white/90  dark:hover:text-whitefont-medium hover:scale-105 duration-500"} href={button.href} >
                                    {button.name}
                                </Link>
                            </Animate>
                        )))}
                    </div>
                ))}
            </div>
        </SubdivConstructor>
    );
};

export default MediaSubdiv;
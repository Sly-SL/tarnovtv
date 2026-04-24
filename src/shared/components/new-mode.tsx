import {BUTTONSNEW} from "@/shared/consts/enums/buttons-header.enum";
import ButtonHeader from "@/shared/components/custom/header/button.header";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import LiquidGlassCustom from "@/shared/components/custom/liquid-glass.custom";

const NewMode = () => {
    return (
        <nav className={"[display:var(--new)] backdrop-blur-2xl max-h-1/8 left-2 right-2 md:right-auto md:left-auto md:max-h-screen md:top-1 bottom-1 fixed z-9999 rounded-2xl md:w-fit"}>
            <h1 className={"hidden"}>Tarnov TV</h1>
            <Animate preset={"fadeDown"} className={"h-full"}>
                <LiquidGlassCustom className={"p-1 h-full"}>
                    <ul className={"hidden md:flex flex-col group p-6 h-full rounded-2xl backdrop-blur-xl justify-start items-stretch gap-2 shadow-2xl w-25 hover:w-64 transition-all duration-500 ease-in-out overflow-hidden"}>
                        {BUTTONSNEW.filter((btn)=> btn.mobile != true).map((button,i)=>(
                            <ButtonHeader
                                className={button.className+" items-center shrink-0 gap-3 w-full hover:scale-105 transition-transform hover:bg-(--contrast-color)/15 p-4 pl-2 rounded-3xl duration-300"}
                                key={i}
                                link={button.link}>
                                <span className="w-10 h-10 flex scale-75 sm:scale-105 md:scale-150 text-(--contrast-color) items-center justify-center shrink-0">
                                    {button.children}
                                </span>
                                <span className="whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 pt-1 group-hover:translate-x-0 transition-all duration-700 text-xl hover:text-(--contrast-color)">
                                    {button.label}
                                </span>
                            </ButtonHeader>
                        ))}
                    </ul>
                    <ul className={"flex p-4 md:hidden justify-between w-full items-center gap-3"}>
                        {BUTTONSNEW.filter((btn)=> btn.mobile != false).map((button,i)=>(
                            <ButtonHeader
                                className={button.className+" text-center flex items-center justify-center w-full"}
                                key={i}
                                aria-label={button.label}
                                link={button.link}>
                                <span className={"text-(--contrast-color)"}>{button.children}</span>
                                <span className={"hidden"}>{button.label}</span>
                            </ButtonHeader>
                        ))}
                    </ul>
                </LiquidGlassCustom>
            </Animate>
        </nav>
    );
};

export default NewMode;
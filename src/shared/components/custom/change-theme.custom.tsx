"use client";

import Animate from "@/shared/components/libs/animate/animate.ssr";
import {AllThemesEnum, AllThemesEnumType,} from "@/shared/consts/enums/all-themes.enum";
import {ChangeThemeUtil} from "@/shared/util/change-theme.util";
import {BasicH3} from "@/shared/components/libs/basic/text/h3.text";
import LiquidGlassCustom from "@/shared/components/custom/liquid-glass.custom";
import {BasicP} from "../libs/basic/text/p.text";

const themeButtons: Record<AllThemesEnumType, string> = {
    purple: "bg-purple-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    gold: "bg-yellow-500",
};

const ChangeThemeCustom = () => {
    return (
        <section className="w-full">
            <Animate
                preset="fadeDown"
                duration={500}
                className="flex gap-5 w-full"
            >
                <LiquidGlassCustom className={"p-5"}>
                    <section className={"grid gap-2"}>
                        <BasicH3>Motyw</BasicH3>
                        <BasicP className={"text-(--contrast-color)/80"}>Wybierz motyw</BasicP>
                        <ul className="flex flex-wrap gap-3 pt-4 justify-center">
                            {AllThemesEnum.map((theme) => (
                                <li key={theme}>
                                    <button
                                        type="button"
                                        onClick={() => ChangeThemeUtil(theme)}
                                        className={`w-10 h-10 pointer-events-auto rounded-full transition ${themeButtons[theme]} hover:scale-110 active:scale-95`}
                                    />
                                </li>
                            ))}
                        </ul>
                    </section>
                </LiquidGlassCustom>
            </Animate>
        </section>
    );
};

export default ChangeThemeCustom;
"use client";

import Animate from "@/shared/components/libs/animate/animate.ssr";
import {BasicH3} from "@/shared/components/libs/basic/text/h3.text";
import LiquidGlassCustom from "@/shared/components/custom/liquid-glass.custom";
import {BasicP} from "../libs/basic/text/p.text";
import {AllModesEnum} from "@/shared/consts/enums/all-modes.enum";
import {ChangeModeUtil} from "@/shared/util/change-mode.util";
import {BasicButton} from "@/shared/components/libs/basic/button.component";

const ChangeModeCustom = () => {
    return (
        <section className="w-full">
            <Animate
                preset="fadeDown"
                duration={500}
                className="flex gap-5 w-full"
            >
                <LiquidGlassCustom className={"p-5"}>
                    <section className={"grid gap-2"}>
                        <BasicH3>Tryb</BasicH3>
                        <BasicP className={"text-(--contrast-color)/80"}>Wybierz tryb</BasicP>
                        <ul className="flex flex-wrap gap-3 pt-4 justify-center">
                            {AllModesEnum.map((mode) => (
                                <li key={mode}>
                                    <BasicButton
                                        type="button"
                                        onClick={() => ChangeModeUtil(mode)}
                                        className={`rounded-full transition hover:scale-110 active:scale-95`}
                                    >
                                        {mode}
                                    </BasicButton>
                                </li>
                            ))}
                        </ul>
                    </section>
                </LiquidGlassCustom>
            </Animate>
        </section>
    );
};

export default ChangeModeCustom;
import ChangeThemeCustom from "@/shared/components/custom/change-theme.custom";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import LiquidGlassCustom from "@/shared/components/custom/liquid-glass.custom";
import {BasicH1} from "@/shared/components/libs/basic/text/h1.text";
import ChangeModeCustom from "@/shared/components/custom/change-mode.custom";

const Page = () => {
    return (
        <div className={"grid md:grid-cols-2 p-2"}>
            <span className={"[display:var(--new) h-8]"}/>
            <Animate preset={"fadeUp"}>
                <Animate preset={"fadeLeft"} className={"p-3"} duration={800}>
                    <LiquidGlassCustom className={"p-5"}>
                        <BasicH1>Ustawienia</BasicH1>
                    </LiquidGlassCustom>
                </Animate>
                <Animate preset={"fadeLeft"} className={"p-3"} duration={1000}>
                    <ChangeThemeCustom/>
                </Animate>
                <Animate preset={"fadeLeft"} className={"p-3"} duration={1100}>
                    <ChangeModeCustom/>
                </Animate>
            </Animate>
        </div>
    );
};

export default Page;
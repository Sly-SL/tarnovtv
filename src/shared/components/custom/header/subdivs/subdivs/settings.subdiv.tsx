import SubdivConstructor from "@/shared/components/custom/header/subdivs/subdiv-constructor.subdiv";
import ChangeThemeCustom from "@/shared/components/custom/change-theme.custom";
import {BasicH3} from "@/shared/components/libs/basic/text/h3.text";
import LiquidGlassCustom from "@/shared/components/custom/liquid-glass.custom";

const SettingsSubdiv = () => {
    return (
        <SubdivConstructor id={"settings"}>
                <LiquidGlassCustom>
                    <section className={"grid gap-5"}>
                        <BasicH3 className={"text-4xl"}>Ustawienia</BasicH3>
                        <ChangeThemeCustom/>
                    </section>
                </LiquidGlassCustom>

        </SubdivConstructor>
    );
};

export default SettingsSubdiv;
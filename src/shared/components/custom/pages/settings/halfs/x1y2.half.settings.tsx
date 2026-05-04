import ChangeThemeCustom from "@/shared/components/custom/change-theme.custom";
import ChangeModeCustom from "@/shared/components/custom/change-mode.custom";
import ChangeCleanModeCustom from "@/shared/components/custom/change-clean-mode.custom";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import type {UserType} from "@/shared/types/domen/user.type";

const X1y2HalfSettings = (user?: Partial<UserType>) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <Animate preset="fadeUp" duration={700}>
                <ChangeThemeCustom {...user}/>
            </Animate>
            <Animate preset="fadeUp" duration={850}>
                <ChangeModeCustom {...user}/>
            </Animate>
            <Animate preset="fadeUp" duration={1000}>
                <ChangeCleanModeCustom {...user}/>
            </Animate>
        </div>
    );
};

export default X1y2HalfSettings;
import type {AllModesType} from "@/shared/types/all/all-modes.type";
import {userSettingsEdit} from "@/actions/user/user-settings.edit.action";

export const ChangeModeUtil = async (mode:AllModesType, userId?:string) => {
    localStorage.setItem("mode", mode);
    document.documentElement.setAttribute("data-mode", mode);

    if (userId) {
        await userSettingsEdit({mode}, userId);
    }
}
import type {AllCleanModesType} from "@/shared/types/all/all-clean-modes.type";
import {userSettingsEdit} from "@/actions/user/user-settings.edit.action";

export const ChangeCleanModeUtil = async (mode:AllCleanModesType, userId?:string) => {
    localStorage.setItem("clean-mode", `${mode}`);
    document.documentElement.setAttribute("data-clean-mode", `${mode}`);
    if (userId) {
        await userSettingsEdit({cleanMode:mode}, userId);
    }
}
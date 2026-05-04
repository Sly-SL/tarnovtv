import type {AllThemesType} from "@/shared/types/all/all-themes.type";
import {userSettingsEdit} from "@/actions/user/user-settings.edit.action";

export const ChangeThemeUtil = async (theme: AllThemesType, userId?: string) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);

    if (userId) {
        await userSettingsEdit({theme}, userId);
    }
}
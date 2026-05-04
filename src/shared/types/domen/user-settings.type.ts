import type {AllThemesType} from "@/shared/types/all/all-themes.type";
import type {AllCleanModesType} from "@/shared/types/all/all-clean-modes.type";
import type {AllModesType} from "@/shared/types/all/all-modes.type";

export type UserSettingsType = {
    userId: string;
    isProvedEmail: boolean;
    isNotificationsAllowed: boolean;
    theme: AllThemesType
    cleanMode: AllCleanModesType
    mode: AllModesType
    isTwoFactorEnabled: boolean;
}
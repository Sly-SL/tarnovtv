import type {UserSettingsType} from "@/shared/types/domen/user-settings.type";
import {addDataWithCustomId} from "@/lib/firebase/firebase-admin";

export const settingsPost = async (data:UserSettingsType) => {
    await addDataWithCustomId("settings", data.userId,{
        "theme":data.theme,
        "isProvedEmail":data.isProvedEmail,
        "isNotificationAllowed":data.isNotificationsAllowed,
        "cleanMode":data.cleanMode,
        "mode":data.mode,
    })
}
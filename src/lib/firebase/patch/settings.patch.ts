"use server"

import {updateDocument} from "@/lib/firebase/firebase-admin";
import {UserSettingsType} from "@/shared/types/domen/user-settings.type";

export const settingsPatch = async (settings: Partial<UserSettingsType>, id: string) => {
    if (!id) {
        return console.error('No userId provided');
    }
    return await updateDocument("settings", id, settings);
}
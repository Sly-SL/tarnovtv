"use server"

import type {UserSettingsType} from "@/shared/types/domen/user-settings.type";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {settingsPatch} from "@/lib/firebase/patch/settings.patch";

export const userSettingsEdit = async (settings: Partial<UserSettingsType>, id: string) => {
    if (!id) {
        return console.error('No userId provided');
    }
    const user = await GetUserBySessionIdAction()

    if(!user || user.id !== id){
        return console.error("Forbidden or no userId provided");
    }

    await settingsPatch(settings,id)
}
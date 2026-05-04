"use server"

import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import type {UserType} from "@/shared/types/domen/user.type";
import {userPatch} from "@/lib/firebase/patch/user.patch";
import {settingsPatch} from "@/lib/firebase/patch/settings.patch";

export const userEdit = async (data: Partial<UserType>, id: string) => {
    if (!id) return console.error('No userId provided');

    const user = await GetUserBySessionIdAction();
    if (!user || user.id !== id) return console.error("Forbidden or no userId provided");

    if (data.email && data.email !== user.email) {
        await settingsPatch({
            isProvedEmail: false,
            isTwoFactorEnabled: false,
        }, id);
    }

    await userPatch(data, id);
};
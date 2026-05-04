"use server"

import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {userPatch} from "@/lib/firebase/patch/user.patch";
import {userGet} from "@/lib/firebase/get/user.get";
import type {AllUsersRolesType} from "@/shared/types/all/all-user-roles.type";
import {settingsGet} from "@/lib/firebase/get/settings.get";

type ChangeRoleResult =
    | {success: true}
    | {success: false; message: string};

export async function changeUserRoleAction(targetId: string, newRole: AllUsersRolesType): Promise<ChangeRoleResult> {
    const caller = await GetUserBySessionIdAction();

    if (!caller || caller.role !== "admin") {
        return {success: false, message: "Brak uprawnień"};
    }

    const target = await userGet("id", targetId);
    const targetSettings = await settingsGet({id:targetId})

    if (!target || !targetSettings.success) {
        return {success: false, message: "Użytkownik nie istnieje"};
    }

    if (target.role === "admin" && newRole !== "admin") {
        return {success: false, message: "Nie można degradować administratora"};
    }

    if (caller.id === targetId && newRole !== "admin") {
        return {success: false, message: "Nie możesz zmienić własnej roli"};
    }

    if((newRole === "admin" || newRole === "moderator") && !targetSettings.data.isTwoFactorEnabled) {
        return {success: false, message: "Nie możesz zmienić roli użytkownika na admin lub moderator jeśli nie ma włączonej weryfikacji dwuetapowej"};
    }

    await userPatch({role: newRole}, targetId);
    return {success: true};
}
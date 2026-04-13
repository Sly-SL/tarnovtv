'use server'

import {getFilteredUsers} from "@/lib/firebase/queries/get-user.query";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {redirect} from "next/navigation";
import {hash} from "argon2";
import {updateDocumentField} from "@/lib/firebase/firebase";

export async function ChangePassword(token: string, password: string) {
    const users = await getFilteredUsers("token", token)
    if (users.length === 0 || !users[0]) {
        redirect(shortcuts.admin + shortcuts.change);
    }

    const passwordHashed = hash(password)

    await updateDocumentField("users", users[0].id, "password", passwordHashed)
}
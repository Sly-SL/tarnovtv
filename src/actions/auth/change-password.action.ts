'use server'

import {hash} from "argon2";
import {updateDocument} from "@/lib/firebase/firebase-admin";
import {validateToken} from "@/shared/util/token/validate-token.util";

export async function ChangePasswordAction(token: string, password: string) {
    const result = await validateToken(token, "change-password");

    if (!result.success) {
        if (result.reason === "not_found") return ("Token nie istnieje");
        if (result.reason === "expired") return ("Token wygasł");
    }

    if (result.success) {
        const userId = result.data.userId;
        const passwordHashed = hash(password)
        await updateDocument("users", userId, {"password": passwordHashed})
    }
}
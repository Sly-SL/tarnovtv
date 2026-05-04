'use server'

import {validateToken} from "@/shared/util/token/validate-token.util";
import {settingsPatch} from "@/lib/firebase/patch/settings.patch";

export async function VerifyEmailAction(token: string) {
    const result = await validateToken(token, "email-verification");

    if (!result.success) {
        if (result.reason === "not_found") return ("Token nie istnieje");
        if (result.reason === "expired") return ("Token wygasł");
    }

    if (result.success) {
        const userId = result.data.userId;
        await settingsPatch({"isProvedEmail": true},userId);
    }
}
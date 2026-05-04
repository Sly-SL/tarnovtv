// @/lib/firebase/validate-token.ts
"use server"

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {TokenKinds, TokenType} from "@/shared/types/domen/token.type";

type ValidateTokenResult =
    | { success: true; data: TokenType }
    | { success: false; reason: "not_found" | "expired" };

export async function validateToken(
    token: string,
    type: TokenKinds,
): Promise<ValidateTokenResult> {
    const snap = await adminDb
        .collection("tokens")
        .where("token", "==", token)
        .where("type", "==", type)
        .limit(1)
        .get();

    if (snap.empty) {
        return { success: false, reason: "not_found" };
    }

    const data = snap.docs[0].data() as TokenType;

    if (Date.now() > data.expiresIn) {
        await snap.docs[0].ref.delete();
        return { success: false, reason: "expired" };
    }

    return { success: true, data };
}
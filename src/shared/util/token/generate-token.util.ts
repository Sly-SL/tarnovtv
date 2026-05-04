// @/lib/firebase/generate-token.ts
"use server"

import { adminDb } from "@/lib/firebase/firebase-admin";
import { v4 as uuidv4 } from "uuid";
import type { TokenType, TokenKinds } from "@/shared/types/domen/token.type";

export async function generateToken(
    userId: string,
    type: TokenKinds,
    isUUID: boolean = true,
): Promise<TokenType> {
    const tokensRef = adminDb.collection("tokens");

    // Генерируем уникальный токен
    let token: string;
    while (true) {
        token = isUUID
            ? uuidv4()
            : Math.floor(Math.random() * (1000000 - 10000) + 10000).toString();

        const existing = await tokensRef.where("token", "==", token).get();
        if (existing.empty) break;
    }

    // Удаляем старый токен того же типа для этого юзера
    const oldTokens = await tokensRef
        .where("userId", "==", userId)
        .where("type", "==", type)
        .get();

    const deleteOps = oldTokens.docs.map((doc) => doc.ref.delete());
    await Promise.all(deleteOps);

    // Создаём новый
    const expiresIn = Date.now() + 15 * 60 * 1000; // 15 минут
    const id = uuidv4();

    const newToken: TokenType = { id, token, userId, type, expiresIn };
    await tokensRef.doc(id).set(newToken);

    return newToken;
}
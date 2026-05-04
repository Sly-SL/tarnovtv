"use server";

import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {adminDb} from "@/lib/firebase/firebase-admin";
import {cookies} from "next/headers";

export async function deactivateAccountAction() {
    const user = await GetUserBySessionIdAction();
    if (!user) throw new Error("Nie jesteś zalogowany");

    await adminDb.collection("users").doc(user.id).update({
        isDeactivated: true,
        deactivatedAt: new Date().toISOString(),
    });

    (await cookies()).delete("session");
}
"use server";

import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {adminDb} from "@/lib/firebase/firebase-admin";
import {cookies} from "next/headers";
import {Timestamp} from "firebase-admin/firestore";

export async function deactivateAccountAction() {
    const user = await GetUserBySessionIdAction();
    if (!user) throw new Error("Nie jesteś zalogowany");

    await adminDb.collection("users").doc(user.id).update({
        isDeactivated: true,
        deactivatedAt: Timestamp.now,
    });

    (await cookies()).delete("session");
}
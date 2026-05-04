"use server"

import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {adminDb} from "@/lib/firebase/firebase-admin";

export async function revokeSessionAction(sessionId: string) {
    const user = await GetUserBySessionIdAction();

    if (!user?.id) throw new Error("Nie jesteś zalogowany");

    const sessionRef = adminDb.collection("sessions").doc(sessionId);
    const sessionSnap = await sessionRef.get();

    if (!sessionSnap.exists) throw new Error("Sesja nie istnieje");

    const sessionData = sessionSnap.data();

    if (sessionData?.userId !== user.id) throw new Error("Brak dostępu");

    await sessionRef.delete();
}
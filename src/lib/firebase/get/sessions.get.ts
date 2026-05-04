'use server'

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {SessionType} from "@/shared/types/domen/session.type";

type SessionsResult = { success: true; data: SessionType[] } | { success: false };

export async function sessionsGet({userId}:{userId: string}): Promise<SessionsResult> {
    if (!userId) return { success: false };

    const snap = await adminDb
        .collection("sessions")
        .where("userId", "==", userId)
        .get();

    if (snap.empty) return { success: false };

    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as SessionType[];

    return { success: true, data };
}
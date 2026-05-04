'use server'

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {DocumentData} from "firebase-admin/firestore";

type SessionResult = { success: true; data: DocumentData } | { success: false };

export async function sessionGet(sessionId: string): Promise<SessionResult> {
    if (!sessionId) return {success: false};
    const snap = await adminDb.collection("sessions").doc(sessionId).get();
    if (!snap.exists) return {success: false};
    return {success: true, data: snap.data()!};
}
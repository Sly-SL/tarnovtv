'use server'

import {doc, DocumentData, getDoc} from "firebase/firestore"; // Import doc and getDoc
import {db} from "@/lib/firebase/firebase";

type SessionResult =
    | { success: true; data: DocumentData }
    | { success: false };

export async function getSessionQuery(
    sessionId:string
): Promise<SessionResult> {

    if (!sessionId) return { success: false };

    const ref = doc(db, "sessions", sessionId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return { success: false };

    return { success: true, data: snap.data() };
}

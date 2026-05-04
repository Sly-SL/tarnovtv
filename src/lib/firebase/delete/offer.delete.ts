'use server'

import {adminDb} from "@/lib/firebase/firebase-admin";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";

export async function offerDelete(id: string) {
    const user = await GetUserBySessionIdAction()
    if(!user || user.role !== "admin" && user.role !== "moderator") {
        return;
    }
    await adminDb.collection("offers").doc(id).delete();
}
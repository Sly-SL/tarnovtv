"use server";

import type {OfferType} from "@/shared/types/domen/offer.type";
import {adminDb} from "@/lib/firebase/firebase-admin";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";

export async function offerPatch(id: string, data: Partial<Omit<OfferType, "id">>) {
    const user = await GetUserBySessionIdAction()
    if(!user || user.role !== "admin" && user.role !== "moderator") {
        return;
    }
    await adminDb.collection("offers").doc(id).set(data, {merge: true});
}
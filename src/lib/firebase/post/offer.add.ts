"use server";

import type {OfferType} from "@/shared/types/domen/offer.type";
import {randomUUID} from "node:crypto";
import {adminDb} from "@/lib/firebase/firebase-admin";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";

export async function offerPost(data: Omit<OfferType, "id">) {
    const user = await GetUserBySessionIdAction()
    if(!user || user.role !== "admin" && user.role !== "moderator") {
        return;
    }
    const id = randomUUID();
    await adminDb.collection("offers").doc(id).set({id, ...data});
    return id;
}
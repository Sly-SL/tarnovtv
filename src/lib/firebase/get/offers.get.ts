"use server";

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {OfferType} from "@/shared/types/domen/offer.type";

export async function offersGet(): Promise<OfferType[]> {
    const snap = await adminDb.collection("offers").orderBy("order", "asc").get();
    if (snap.empty) return [];
    return snap.docs.map(doc => ({id: doc.id, ...doc.data()} as OfferType));
}
"use server";

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {MediaType} from "@/shared/types/domen/media.type";

export async function mediaGet(): Promise<MediaType[]> {
    const snap = await adminDb.collection("media").get();

    if (snap.empty) return [];

    return snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as MediaType[];
}
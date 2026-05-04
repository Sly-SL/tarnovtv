'use server'

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {MediaType} from "@/shared/types/domen/media.type";

export async function getDocumentsQuery(): Promise<MediaType[]> {
    const snap = await adminDb.collection("documents").get();
    if (snap.empty) return [];
    return snap.docs.map(doc => ({id: doc.id, ...doc.data() as Omit<MediaType, "id">}));
}
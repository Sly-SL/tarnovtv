'use server'

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {EventsType} from "@/shared/types/domen/events.type";

export async function eventGet(): Promise<EventsType[]> {
    const snap = await adminDb.collection("events").get();
    if (snap.empty) return [];
    return snap.docs.map(doc => ({id: doc.id, ...doc.data() as Omit<EventsType, "id">}));
}
'use server'

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {EventsType} from "../../../shared/types/domen/events.type";

export async function eventByIdGet({id}: {id: string}): Promise<EventsType | null> {
    const snap = await adminDb.collection("projects").doc(id).get();
    if (!snap.exists) return null;
    return {id: snap.id, ...snap.data() as Omit<EventsType, "id">};
}
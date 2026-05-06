"use server";

import type {EventsType} from "@/shared/types/domen/events.type";
import {adminDb} from "@/lib/firebase/firebase-admin";

export async function eventsPatch(id: string, data: Partial<Omit<EventsType, "id">>) {
    await adminDb.collection("events").doc(id).update(data);
}
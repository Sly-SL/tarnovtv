"use server";

import type {EventsType} from "@/shared/types/domen/events.type";
import {adminDb} from "@/lib/firebase/firebase-admin";

export async function eventsPost(data: Omit<EventsType, "id">) {
    await adminDb.collection("events").add(data);
}
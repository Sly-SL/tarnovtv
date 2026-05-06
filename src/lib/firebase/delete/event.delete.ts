"use server"

import {adminDb} from "@/lib/firebase/firebase-admin";

export async function eventDelete(id: string) {
    await adminDb.collection("events").doc(id).delete();
}
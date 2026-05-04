"use server"

import {adminDb} from "@/lib/firebase/firebase-admin";

export async function projectDelete(id: string) {
    await adminDb.collection("projects").doc(id).delete();
}
"use server";

import {adminDb} from "@/lib/firebase/firebase-admin";

export async function votingDelete(id: string) {
    await adminDb.collection("votings").doc(id).delete();
}
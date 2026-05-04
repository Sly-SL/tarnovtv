"use server";

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {VotingType} from "@/shared/types/domen/voting.type";

export async function votingsGet(): Promise<VotingType[]> {
    const snap = await adminDb.collection("votings").orderBy("createdAt", "desc").get();
    if (snap.empty) return [];
    return snap.docs.map(doc => ({id: doc.id, ...doc.data() as Omit<VotingType, "id">}));
}
"use server";

import type {VotingType} from "@/shared/types/domen/voting.type";
import {adminDb} from "@/lib/firebase/firebase-admin";

export async function votingPatch(id: string, data: Partial<Omit<VotingType, "id">>) {
    await adminDb.collection("votings").doc(id).update(data);
}
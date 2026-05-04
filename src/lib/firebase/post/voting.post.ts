"use server";

import type {VotingType} from "@/shared/types/domen/voting.type";
import {adminDb} from "@/lib/firebase/firebase-admin";

export async function votingPost(data: Omit<VotingType, "id">) {
    await adminDb.collection("votings").add(data);
}
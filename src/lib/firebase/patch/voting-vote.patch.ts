"use server";

import {adminDb} from "@/lib/firebase/firebase-admin";
import {FieldValue} from "firebase-admin/firestore";

export async function votingVote(votingId: string, optionId: string, userId: string): Promise<void> {
    const ref = adminDb.collection("votings").doc(votingId);

    await adminDb.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        if (!snap.exists) throw new Error("Voting not found");

        const data = snap.data()!;

        if ((data.votedBy as string[]).includes(userId)) {
            throw new Error("Already voted");
        }

        const options = data.options as {id: string; votes: number}[];
        const updated = options.map(o => o.id === optionId ? {...o, votes: o.votes + 1} : o);

        tx.update(ref, {
            options: updated,
            votedBy: FieldValue.arrayUnion(userId),
        });
    });
}
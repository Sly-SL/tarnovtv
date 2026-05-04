'use server'

import {adminDb} from "@/lib/firebase/firebase-admin";
import {CommentBodyProps} from "@/shared/types/comment-body.type";

export async function getCommentsQuery(): Promise<CommentBodyProps[]> {
    const snap = await adminDb.collection("comments").get();
    if (snap.empty) return [];
    return snap.docs.map(doc => ({id: doc.id, ...doc.data() as Omit<CommentBodyProps, "id">}));
}
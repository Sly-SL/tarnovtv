'use server'

import {collection, getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase";
import {CommentBodyProps} from "@/shared/types/comment-body.type";

export async function getCommentsQuery(): Promise<CommentBodyProps[]> {
    const ref = collection(db, "comments");
    const snap = await getDocs(ref);

    if (snap.empty) return [];

    return snap.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<CommentBodyProps, "id">),
    }));
}
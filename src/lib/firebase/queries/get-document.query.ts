'use server'

import {collection, getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase";
import type {DocumentType} from "@/shared/types/documents.type";

export async function getDocumentsQuery(): Promise<DocumentType[]> {
    const ref = collection(db, "documents");
    const snap = await getDocs(ref);

    if (snap.empty) return [];

    return snap.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<DocumentType, "id">),
    }));
}
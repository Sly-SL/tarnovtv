'use server'

import {collection, doc, getDoc, getDocs, limit, query, where,} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase";
import type {UserRecord} from "@/shared/types/user.type";

export async function getFilteredUsers(
    field: "email" | "id" | "token",
    val: string
): Promise<UserRecord[]> {
    if (field === "id") {
        const ref = doc(db, "users", val);
        const snap = await getDoc(ref);

        if (!snap.exists()) return [];

        return [{ id: snap.id, ...snap.data() } as UserRecord];
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where(field, "==", val), limit(1));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
    })) as UserRecord[];
}
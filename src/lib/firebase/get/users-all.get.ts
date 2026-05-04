"use server";

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {UserType} from "@/shared/types/domen/user.type";

export async function usersAllGet(): Promise<UserType[]> {
    const snap = await adminDb.collection("users").orderBy("name", "asc").get();
    if (snap.empty) return [];
    return snap.docs.map(d => ({id: d.id, ...d.data()} as UserType));
}
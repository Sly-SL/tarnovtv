'use server'

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {UserType} from "@/shared/types/domen/user.type";

type GetUserField = "email" | "id" | "token";

export async function userGet(field: GetUserField, value: string): Promise<UserType | null> {
    if (field === "id") {
        const snap = await adminDb.collection("users").doc(value).get();
        return snap.exists ? ({id: snap.id, ...snap.data()} as UserType) : null;
    }

    const snap = await adminDb.collection("users").where(field, "==", value).limit(1).get();
    if (snap.empty) return null;
    return {id: snap.docs[0].id, ...snap.docs[0].data()} as UserType;
}
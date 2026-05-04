"use server"

import {adminDb} from "@/lib/firebase/firebase-admin";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import type {UserType} from "@/shared/types/domen/user.type";

export async function getBlockedUsersAction(): Promise<UserType[]> {
    const caller = await GetUserBySessionIdAction();
    if (!caller || caller.role !== "admin") return [];

    const snap = await adminDb
        .collection("users")
        .where("badAttempts", ">", 0)
        .orderBy("badAttempts", "desc")
        .get();

    if (snap.empty) return [];
    return snap.docs.map(d => ({id: d.id, ...d.data()} as UserType));
}
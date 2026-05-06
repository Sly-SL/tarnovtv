"use server"

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {UserType} from "@/shared/types/domen/user.type";
import {AdminActionMiddleware} from "@/middlewares/admin-action.middleware";

export async function getBlockedUsersAction(): Promise<UserType[]> {
    await AdminActionMiddleware()

    const snap = await adminDb
        .collection("users")
        .where("badAttempts", ">", 0)
        .orderBy("badAttempts", "desc")
        .get();

    if (snap.empty) return [];
    return snap.docs.map(d => ({id: d.id, ...d.data()} as UserType));
}
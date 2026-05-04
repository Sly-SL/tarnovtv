"use server";

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {UserType} from "@/shared/types/domen/user.type";

type FindByProfileInput = {
    name: string;
    surname: string;
    gender: "male" | "female";
};

export async function userGetByProfile(data: FindByProfileInput): Promise<UserType | null> {
    const snap = await adminDb
        .collection("users")
        .where("name", "==", data.name)
        .where("surname", "==", data.surname)
        .where("gender", "==", data.gender)
        .limit(1)
        .get();

    if (snap.empty) return null;

    return {id: snap.docs[0].id, ...snap.docs[0].data()} as UserType;
}
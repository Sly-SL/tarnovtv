"use server"

import type {UserType} from "@/shared/types/domen/user.type";
import {updateDocument} from "@/lib/firebase/firebase-admin";

export const userPatch = async (user: Partial<UserType>, id: string) => {
    if (!id) {
        return console.error('No userId provided');
    }
    return await updateDocument("users", id, user);
}
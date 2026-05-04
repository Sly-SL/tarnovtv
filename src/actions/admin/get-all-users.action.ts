"use server"

import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {usersAllGet} from "@/lib/firebase/get/users-all.get";
import {UserType} from "@/shared/types/domen/user.type";

export async function getAllUsersAction(): Promise<UserType[]> {
    const user = await GetUserBySessionIdAction();
    if (!user || user.role !== "admin") return [];
    return usersAllGet();
}
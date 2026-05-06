"use server"

import {usersAllGet} from "@/lib/firebase/get/users-all.get";
import {UserType} from "@/shared/types/domen/user.type";
import {AdminActionMiddleware} from "@/middlewares/admin-action.middleware";

export async function getAllUsersAction(): Promise<UserType[]> {
    await AdminActionMiddleware()
    return usersAllGet();
}
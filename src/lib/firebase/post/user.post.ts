import type {UserType} from "@/shared/types/domen/user.type";
import {addDataWithCustomId} from "@/lib/firebase/firebase-admin";

export const userPost = async (data:Omit<UserType, "createdAt">) => {
    await addDataWithCustomId("users", data.id,{
        "name":data.name,
        "email":data.email,
        "password":data.password,
        "badAttempts":0,
        "role":data.role,
        "gender":data.gender,
        "surname":data.surname,
        "isDeactivated":data.isDeactivated,
        "createdAt": Date.now(),
    })
}
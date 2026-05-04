"use server";


import {userGetByProfile} from "@/lib/firebase/get/user-by-profile.get";

type FindEmailInput = {
    name: string;
    surname: string;
    gender: "male" | "female";
};

type FindEmailResult =
    | {success: true; email: string}
    | {success: false; message: string};

export async function findEmailAction(data: FindEmailInput): Promise<FindEmailResult> {
    const user = await userGetByProfile(data);

    if (!user) {
        return {success: false, message: "Nie znaleziono konta z podanymi danymi"};
    }

    const [local, domain] = user.email.split("@");
    const masked = local.slice(0, 2) + "***@" + domain;

    return {success: true, email: masked};
}
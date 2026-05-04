"use server"

import type {NextRequest} from "next/server";
import {cookies} from "next/headers";
import {sessionGet} from "@/lib/firebase/get/session.get";
import {userGet} from "@/lib/firebase/get/user.get";
import type {UserType} from "@/shared/types/domen/user.type";

export async function GetUserBySessionIdAction(req?: NextRequest) : Promise<UserType | undefined> {
    let sessionId: string | undefined;

    if (req) {
        sessionId = req.cookies.get("session")?.value;
    } else {
        const cookieStore = await cookies();
        sessionId = cookieStore.get("session")?.value;
    }

    if (!sessionId) {
        console.log("no session id");
        return undefined;
    }

    const session = await sessionGet(sessionId);

    if (!session?.success) {
        console.log("no session found");
        return undefined;
    }

    const user = await userGet("id", session.data.userId);

    if (!user) {
        return undefined;
    }

    return user;
}
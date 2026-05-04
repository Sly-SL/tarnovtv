"use server"

import {sessionDelete} from "@/lib/firebase/delete/session.delete";
import {cookies} from "next/headers";

export async function LogoutAction() {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")

    if (!session) {
        return true
    }

    await sessionDelete(session.value)
    cookieStore.delete("session")
}
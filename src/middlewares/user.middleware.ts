import {redirect} from "next/navigation";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";

export async function UserMiddleware() {
    const user = await GetUserBySessionIdAction();
    if (!user) redirect("/login");
    return user;
}
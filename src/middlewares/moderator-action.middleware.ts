import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";

export const ModeratorActionMiddleware = async () => {
    const user = await GetUserBySessionIdAction()
    const role = user?.role
    if (!role || role !== 'moderator' && role !== 'admin' ) {
        throw new Error("Forbidden")
    }
};
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";

export const AdminActionMiddleware = async () => {
    const user = await GetUserBySessionIdAction()
    const role = user?.role
    if (!role || role !== 'admin' ) {
        throw new Error("Forbidden")
    }
};
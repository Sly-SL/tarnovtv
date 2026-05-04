"use server"

import {NextRequest, NextResponse} from "next/server";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";

export const ModeratorMiddleware = async (req?: NextRequest) => {
    const user = await GetUserBySessionIdAction(req)
    const role = user?.role
    if (!role || role !== 'moderator' && role !== 'admin' ) {
        return NextResponse.redirect(new URL(shortcuts.pnf, CONSTANTS.FRONTEND_URL));
    }
}
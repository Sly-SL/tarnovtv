import {type NextRequest, NextResponse} from "next/server";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import {ms} from "@/shared/util/ms.util";

export function middleware(req: NextRequest) {
    const response = NextResponse.next();
    const sessionId = req.cookies.get("session")?.value;

    if (sessionId) {
        response.cookies.set("session", sessionId, {
            httpOnly: CONSTANTS.SESSION.httpOnly,
            path: "/",
            secure: CONSTANTS.SESSION.secure,
            sameSite: CONSTANTS.SESSION.sameSite,
            maxAge: ms(CONSTANTS.SESSION.maxAge) / 1000,
        });
    }

    return response;
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};
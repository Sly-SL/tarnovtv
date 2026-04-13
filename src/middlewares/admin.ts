import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {getSessionQuery} from "@/lib/firebase/queries/get-session.query";
import {getFilteredUsers} from "@/lib/firebase/queries/get-user.query";
import {CONSTANTS} from "@/shared/consts/consts.consts";

export async function AdminMiddleware(req?: NextRequest) {
    let sessionId: string | undefined;

    if (req) {
        sessionId = req.cookies.get("session")?.value;
    } else {
        const cookieStore = await cookies();
        sessionId = cookieStore.get("session")?.value;
    }

    if (!sessionId) {
        console.error("No Sessionid found");
        return NextResponse.redirect(new URL(shortcuts.pnf, CONSTANTS.FRONTEND_URL));}

    const session = await getSessionQuery(sessionId);

    if (!session?.success) {
        console.error("No Session found");
        return NextResponse.redirect(new URL(shortcuts.pnf, CONSTANTS.FRONTEND_URL));
    }

    const users = await getFilteredUsers("id", session.data.userId);

    if (!users.length) {
        console.error("No users found");
        return NextResponse.redirect(new URL(shortcuts.pnf, CONSTANTS.FRONTEND_URL));
    }

    const user = users[0];

    if (!user.admin) {
        return NextResponse.redirect(new URL(shortcuts.pnf, CONSTANTS.FRONTEND_URL));
    }

    return NextResponse.next({status: 200});
}
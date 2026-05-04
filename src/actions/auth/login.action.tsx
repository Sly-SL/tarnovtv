"use server";

import type {LoginFormValues} from "@/shared/components/forms/auth/login.form";
import {verify} from "argon2";
import {createHash, randomUUID} from "node:crypto";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import {cookies} from "next/headers";
import {ms} from "@/shared/util/ms.util";
import {sendMail} from "@/lib/mailer/mailer";
import {StrangeActivityTemplate} from "@/lib/mailer/templates/strange-activity.template";
import {userGet} from "@/lib/firebase/get/user.get";
import {userPatch} from "@/lib/firebase/patch/user.patch";
import {sessionPost} from "@/lib/firebase/post/session.post";
import {getSessionMetaData} from "@/shared/util/get-session-metadata.util";
import {render} from "@react-email/render";
import {generateToken} from "@/shared/util/token/generate-token.util";

export async function LoginAction(data: LoginFormValues) {
    if (!data.login || !data.password) {
        return { success: false, message: "Bad request" };
    }

    const user = await userGet("email", data.login);
    if (!user) {
        return { success: false, message: "Not found" };
    }

    if(user.badAttempts > 6){
        return { success: false, message: "Strange activity, account is blocked cause provided wrong data to many times, to unlock check a mail" };
    }

    const isPasswordMatch = await verify(user.password,data.password);
    if (!isPasswordMatch) {
        const newBadAttempts = user.badAttempts + 1;
        await userPatch({ badAttempts: newBadAttempts }, user.id);

        if (newBadAttempts >= 6) {
            const token = await generateToken(user.id, "change-password");
            const html = await render(<StrangeActivityTemplate user={user} token={token.token} />);
            await sendMail(user.email, "Strange Activity", html);
        }

        return { success: false, message: "Invalid credentials, password incorrect" };
    }

    if(user.isDeactivated){
        await userPatch({"deactivatedAt":null,"isDeactivated":false}, user.id)
    }

    const sessionId = randomUUID();
    const metadata = await getSessionMetaData();

    const fingerprint = createHash("sha256")
        .update(
            `${metadata.ip}-${metadata.device.browser}-${metadata.device.os}-${metadata.device.type}`
        )
        .digest("hex");

    await userPatch({"badAttempts":0},user.id)

    await sessionPost({
        id: sessionId,
        userId: user.id,
        lastActivityAt: new Date().toString(),
        fingerprint,
        metadata,
    });

     (await cookies()).set("session", sessionId, {
        httpOnly: CONSTANTS.SESSION.httpOnly,
        path: "/",
        secure: CONSTANTS.SESSION.secure,
        sameSite: CONSTANTS.SESSION.sameSite,
        maxAge: ms(CONSTANTS.SESSION.maxAge) / 1000,
    });

    return { success: true };
}
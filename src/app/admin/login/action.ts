"use server";

import {LoginFormValues} from "@/shared/components/forms/auth/login.form";
import {getFilteredUsers} from "@/lib/firebase/queries/get-user.query";
import {verify} from "argon2";
import {randomUUID} from "node:crypto";
import {addDataWithCustomId, updateDocumentField} from "@/lib/firebase/firebase";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import {cookies} from "next/headers";
import {ms} from "@/shared/util/ms.util";
import {sendMail} from "@/lib/mailer/mailer";
import {StrangeActivityTemplate} from "@/lib/mailer/templates/strange-activity.template";

export async function LoginAction(data: LoginFormValues) {
    if (!data.login || !data.password) {
        return { success: false, message: "Bad request" };
    }

    const users = await getFilteredUsers("email", data.login);
    const user = users[0];
    if (!user) {
        return { success: false, message: "Not found" };
    }

    if(user.bad_attempts > 6){
        return { success: false, message: "Strange activity, account is blocked cause provided wrong data to many times, to unlock check a mail" };
    }

    const isPasswordMatch = await verify(user.password,data.password);
    if (!isPasswordMatch) {
        await updateDocumentField("users",user.id, "bad_attempts", user.bad_attempts + 1)
        if(user.bad_attempts + 1 == 6){
            const token = randomUUID()
            await updateDocumentField("users",user.id, "token", token )
            await sendMail(user.email,"Strange Activity", StrangeActivityTemplate(user))
        }
        return { success: false, message: "Invalid credentials, password incorrect" };
    }

    const sessionId = randomUUID();

    const session = {
        userId: users[0].id,
        createdAt: Date.now(),
    };

    await addDataWithCustomId("sessions", sessionId, session);

     (await cookies()).set("session", sessionId, {
        httpOnly: CONSTANTS.SESSION.httpOnly,
        path: "/",
        secure: CONSTANTS.SESSION.secure,
        sameSite: CONSTANTS.SESSION.sameSite,
        maxAge: ms(CONSTANTS.SESSION.maxAge) / 1000,
    });

    return { success: true };
}
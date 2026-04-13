"use server"

import type {ChangeReqValues} from "@/shared/components/forms/auth/change-req-password.form";
import {updateDocumentField} from "@/lib/firebase/firebase";
import {NextResponse} from "next/server";
import {sendMail} from "@/lib/mailer/mailer";
import {ChangeTemplate} from "@/lib/mailer/templates/change-password.template";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import {randomUUID} from "node:crypto";
import {getFilteredUsers} from "@/lib/firebase/queries/get-user.query";


export async function ReqChangeAction ({data}: {data:ChangeReqValues})    {
    const user = await getFilteredUsers("email",data.mail)
    const doc = user[0];
    const userId = doc.id;
    const userData = doc;

    if (!doc || !userData.email || !userId) {
        return new NextResponse("Not found", { status: 404 });
    }

    const token = randomUUID()

    await updateDocumentField(
        "users",
        userId,
        "token",
        token,
    )

    await sendMail(
        userData.email,
        "Email Verification",
        ChangeTemplate({
        domain:CONSTANTS.FRONTEND_DOMEN,
        token:token
    }));

}
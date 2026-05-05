"use server"

import type {ChangeReqValues} from "@/shared/components/forms/auth/change-req-password.form";
import {NextResponse} from "next/server";
import {sendMail} from "@/lib/mailer/mailer";
import {ChangePasswordTemplate} from "@/lib/mailer/templates/change-password.template";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import {userGet} from "@/lib/firebase/get/user.get";
import {generateToken} from "@/shared/util/token/generate-token.util";
import {render} from "@react-email/render";


export async function ReqChangeAction ({data}: {data:ChangeReqValues})    {
    const user = await userGet("email",data.mail)

    if (!user || !user.email || !user.id) {
        return new NextResponse("Not found", { status: 404 });
    }

    const token = await generateToken(user.id, "change-password")
    const html = await render(<
        ChangePasswordTemplate url={CONSTANTS.FRONTEND_URL}
        token={token.token}/>)

    await sendMail(
        user.email,
        "Change Password",html
    )
}
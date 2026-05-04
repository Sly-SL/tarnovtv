"use server"

import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {sendMail} from "@/lib/mailer/mailer";
import {generateToken} from "@/shared/util/token/generate-token.util";
import {EmailVerificationTemplate} from "@/lib/mailer/templates/email-verification.template";
import {render} from "@react-email/render";

export async function sendVerificationEmailAction(){
    const user = await GetUserBySessionIdAction();

    if(user){
        const token = await generateToken(user.id, "email-verification")
        const html = await render(<EmailVerificationTemplate token={token.token} user={user} />)
        await sendMail(
            user.email,
            "Email Verification",
            html)
    }
}
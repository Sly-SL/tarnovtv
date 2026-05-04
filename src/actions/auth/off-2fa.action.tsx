import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {sendMail} from "@/lib/mailer/mailer";
import {userSettingsEdit} from "@/actions/user/user-settings.edit.action";
import {Off2FATemplate} from "@/lib/mailer/templates/off-2fa.template";
import {render} from "@react-email/render";

export async function off2FaAction(){
    const user = await GetUserBySessionIdAction();

    if(user){
        const html = await render(<Off2FATemplate {...user} />);
        await sendMail(
            user.email,
            "Weryfikacja dwuetapowa została wyłączona",
            html
        );
        await userSettingsEdit({"isTwoFactorEnabled":false},user.id)
    }
}
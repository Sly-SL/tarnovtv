import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {sendMail} from "@/lib/mailer/mailer";
import {On2FATemplate} from "@/lib/mailer/templates/on-2fa.template";
import {userSettingsEdit} from "@/actions/user/user-settings.edit.action";
import {settingsGet} from "@/lib/firebase/get/settings.get";
import {render} from "@react-email/render";

export async function on2FaAction() {
    const user = await GetUserBySessionIdAction();
    if (!user) throw new Error("Nie jesteś zalogowany");

    const settingsResult = await settingsGet({ id: user.id });
    if (!settingsResult.success) throw new Error("Nie udało się pobrać ustawień");

    if (!settingsResult.data.isProvedEmail) {
        throw new Error("Potwierdź adres e-mail przed włączeniem 2FA");
    }

    const html = await render(<On2FATemplate {...user}/>)

    await sendMail(
        user.email,
        "Weryfikacja dwuetapowa została włączona",
        html,
    );
    await userSettingsEdit({ isTwoFactorEnabled: true }, user.id);
}
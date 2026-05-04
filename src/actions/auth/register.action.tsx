"use server";

import {sendMail} from "@/lib/mailer/mailer";
import {WelcomeTemplate} from "@/lib/mailer/templates/welcome.template";
import {hash} from "argon2";
import {userGet} from "@/lib/firebase/get/user.get";
import {userPost} from "@/lib/firebase/post/user.post";
import {randomUUID} from "node:crypto";
import type {RegisterFormType} from "@/shared/types/forms/register.form.type";
import {settingsPost} from "@/lib/firebase/post/settings.post";
import {AllUsersRolesEnum} from "@/shared/consts/enums/all-users-roles.enum";
import {render} from "@react-email/render";

export async function RegisterAction(data: RegisterFormType) {
    if (!data.email || !data.password || !data.password_confirm || !data.name || data.name.includes("@")) {
        throw new Error("Nieprawidłowe dane");
    }

    if (data.password !== data.password_confirm) {
        throw new Error("Hasła nie pasują do siebie");
    }

    const isExist = await userGet("email", data.email);
    if (isExist) {
        throw new Error("Użytkownik z tym adresem e-mail już istnieje");
    }

    const password = await hash(data.password);
    const userId = randomUUID();

    const user = {
        id: userId,
        email: data.email,
        name: data.name,
        surname: data.surname,
        password,
        gender: data.gender,
        role: AllUsersRolesEnum[0],
        isDeactivated: false,
        deactivatedAt: null,
        badAttempts: 0,
        image: "",
        token: "",
    };

    await userPost(user);

    await settingsPost({
        userId,
        isProvedEmail: false,
        theme: "purple",
        mode: "legacy",
        cleanMode: "false",
        isTwoFactorEnabled: false,
        isNotificationsAllowed: data.isNotificationAllowed,
    });

    const html = await render(<WelcomeTemplate name={data.name} />);
    await sendMail(data.email, "Witaj na pokładzie!", html);
}
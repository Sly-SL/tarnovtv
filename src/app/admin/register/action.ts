"use server"

import {RegisterFormValues} from "@/shared/components/forms/auth/register.form";
import {NextResponse} from "next/server";
import {addDataWithCustomId} from "@/lib/firebase/firebase";
import {sendMail} from "@/lib/mailer/mailer";
import {WelcomeTemplate} from "@/lib/mailer/templates/welcome.template";
import {hash} from "argon2";
import {getFilteredUsers} from "@/lib/firebase/queries/get-user.query";
import {randomUUID} from "node:crypto";

export async function RegisterAction(data:RegisterFormValues) {
    if(!data.mail|| !data.password || !data.name|| data.name.includes("@")){
        return new NextResponse("Not a valid data", {status: 400});
    }

    const isExist = await getFilteredUsers("email",data.mail)

    if(isExist.length){
        return new NextResponse("Conflict, user with that mail already exist", {status: 409});
    }


    const password = await hash(data.password)

    await addDataWithCustomId("users", randomUUID(),{
        "name":data.name,
        "email":data.mail,
        "password":password,
        "admin": false,
    })

    await sendMail(data.mail, "Welcome!", WelcomeTemplate(data.name))
}
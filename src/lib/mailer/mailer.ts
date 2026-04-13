"use server";

import "server-only";
import nodemailer from "nodemailer";
import type {ReactNode} from "react";
import {render} from "@react-email/render";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_PASSWORD,
    },
    attachments: [
        {
            filename: "logo.jpg",
            path: "./public/assets/logo.jpg",
            cid: "logo", // content id
        },
    ],
});


export async function sendMail(
    to: string,
    subject: string,
    react: ReactNode
) {

    const html = await render(react);

    return transporter.sendMail({
        from: process.env.MAIL_LOGIN,
        to,
        subject,
        html,
    });
}
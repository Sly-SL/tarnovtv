"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_PASSWORD,
    },
});

export async function sendMail(to: string, subject: string, html: string) {
    return transporter.sendMail({
        from: process.env.MAIL_LOGIN,
        to,
        subject,
        html,
    });
}
import type {ReactNode} from "react";
import Link from "next/link";
import {HouseLineIcon, MailboxIcon, PhoneOutgoingIcon} from "@phosphor-icons/react/ssr";

export const ButtonsContactEnum: {
    label: string,
    linkClassName: string,
    buttons: {
        element: ReactNode,
    }[]
}[] = [
    {
        label: "Kontakt",
        linkClassName: "inline-flex items-center dark:text-white/80 text-black/80 gap-2 text-base  hover:scale-[1.02] duration-300 sm:text-lg",
        buttons: [
            { element: <a href={"tel:+48 518 401 276"} className="inline-flex items-center gap-2"><PhoneOutgoingIcon  /> {"+48 518 401 276"}</a> },
            { element: <a className="inline-flex items-center gap-2" href="mailto:tarnovtv@gmail.com"><MailboxIcon /> tarnovtv@gmail.com</a> },
            { element: <Link href={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82022.92998206583!2d20.895407444901412!3d50.02603775679268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473d834352c3ffc7%3A0xcf1a70dff872f61e!2s33-100%20Tarn%C3%B3w!5e0!3m2!1spl!2spl!4v1772134312145!5m2!1spl!2sp"} className="inline-flex items-center gap-2"><HouseLineIcon /> 33-100 Tarnów</Link> }
        ]
    }
]
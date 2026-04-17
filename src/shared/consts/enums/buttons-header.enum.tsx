import type {ButtonHeaderProps} from "@/shared/types/header-button.type";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import Image from "next/image";
import {GearIcon} from "@phosphor-icons/react/ssr";

const logo = "/assets/logo.svg";

export const SUBDIV = "-subdiv"

export const BUTTONS: ButtonHeaderProps[] = [
    {
        link:shortcuts.home,
        children: <Image src={logo} className={"dark:invert"} alt={"logo"} height={50} width={50} priority />,
        id:shortcuts.home.slice(1),
    },
    {
        link:shortcuts.media,
        children: "Media",
        id: shortcuts.media.slice(1),
        getElementByIdAction: shortcuts.media.slice(1) + SUBDIV
    },
    {
        link:shortcuts.projects,
        children: "Projekty",
        id:shortcuts.projects.slice(1),
        getElementByIdAction: shortcuts.projects.slice(1) + SUBDIV
    },
    {
        link:shortcuts.about,
        children: "O nas",
        id:shortcuts.about.slice(1),
        getElementByIdAction: shortcuts.about.slice(1) + SUBDIV
    },
    {
        link:shortcuts.offers,
        children: "Oferta",
        id:shortcuts.offers.slice(1),
        getElementByIdAction: shortcuts.offers.slice(1) + SUBDIV
    },
    {
        link:shortcuts.contact,
        children: "Kontakt",
        id:shortcuts.contact.slice(1),
        getElementByIdAction: shortcuts.contact.slice(1) + SUBDIV
    },
    {
        link:shortcuts.settings,
        children: <GearIcon size={25}/>,
        id:shortcuts.settings.slice(1),
        getElementByIdAction: shortcuts.settings.slice(1) + SUBDIV
    },
    {
        link:shortcuts.settings,
        children: "Ustawienia",
        id:shortcuts.settings.slice(1) + "-mobile",
    }
] as const;
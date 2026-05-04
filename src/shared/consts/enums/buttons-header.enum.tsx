import type {ButtonHeaderProps} from "@/shared/types/header-button.type";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {
    DotsSixIcon,
    FoldersIcon,
    ImagesSquareIcon,
    PhoneIncomingIcon,
    RocketLaunchIcon,
    ScalesIcon,
} from "@phosphor-icons/react/ssr";
import TarnovTvIcon from "@/shared/consts/icons/tarnov-tv.icon";
import TeamIcon from "@/shared/consts/icons/team.icon";
import {AccountHeaderButton} from "@/shared/components/custom/header/account.button";

export const SUBDIV = "-subdiv"

export const BUTTONSLEGACY: ButtonHeaderProps[] = [
    {
        link:shortcuts.home,
        children: <TarnovTvIcon className={"text-(--contrast-color)"} height={50} width={50} />,
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
        link:shortcuts.us,
        children: "Nasz zespół",
        id:shortcuts.us.slice(1),
        getElementByIdAction:shortcuts.us.slice(1) + SUBDIV,
    },
    {
        link:shortcuts.settings,
        children: <AccountHeaderButton/>,
        id:shortcuts.settings.slice(1),
        noLink:true,
        getElementByIdAction: shortcuts.settings.slice(1) + SUBDIV
    },
    {
        link:shortcuts.settings,
        children: <AccountHeaderButton/>,
        noLink:true,
        id:shortcuts.settings.slice(1),
        mobile:true
    }
] as const;

export const BUTTONSNEW: ButtonHeaderProps[] = [
    {
        link:shortcuts.home,
        children:<TarnovTvIcon height={35} width={35}/>,
        label:"Tarnov TV"
    },
    {
        link:shortcuts.projects,
        children:<RocketLaunchIcon height={35} width={35}/>,
        label:"Projekty"
    },
    {
        link:shortcuts.media,
        children:<ImagesSquareIcon height={35} width={35}/>,
        label:"Media"
    },
    {
        link:shortcuts.contact,
        children:<PhoneIncomingIcon height={35} width={35}/>,
        label:"Kontakt"
    },
    {
        link:shortcuts.about,
        children: <FoldersIcon height={35} width={35}/>,
        label:"O nas",
        mobile:false
    },
    {
        link:shortcuts.offers,
        children:<ScalesIcon height={35} width={35}/>,
        label:"Oferta",
        mobile:false
    },
    {
        link:shortcuts.us,
        children: <TeamIcon height={35} width={35}/>,
        label: "Nasz zespół",
        mobile:false
    },
    {
        link:shortcuts.settings,
        children: <AccountHeaderButton/>,
        noLink:true,
        label: "Ustawienia",
        mobile:false
    },
    {
        link:shortcuts.more,
        children:<DotsSixIcon height={35} width={35}/>,
        label:"Więcej",
        mobile:true,
    },
]
import Github from "@/shared/consts/icons/github.icon"
import {InstagramLogoIcon} from "@phosphor-icons/react/ssr";
import type {FC, SVGProps} from "react";
import YoutubeIcon from "@/shared/consts/icons/youtube.icon";
import {shortcutsMedia} from "@/shared/consts/enums/shortcuts.enum";
import TiktokIcon from "@/shared/consts/icons/tiktok.icon";

interface SocialLinks {
    name: string;
    displayName: string;
    subText: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    url: string;
    color: string;
    gradient: string;
    isPrimary: boolean;
}

export const SocialLinksEnum:SocialLinks[] = [
    {
        name: "Instagram",
        displayName: "Instagram",
        subText: "@_slysl_",
        icon: InstagramLogoIcon,
        url: "https://www.instagram.com/_slysl_/",
        color: "#E4405F",
        gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
        isPrimary: true
    },
    {
        name: "Instagram",
        displayName: "Instagram",
        subText: "@tarnov_tv",
        icon: InstagramLogoIcon,
        url: shortcutsMedia.instagram,
        color: "#E4405F",
        gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
        isPrimary: false
    },
    {
        name: "GitHub",
        displayName: "Github",
        subText: "@Sly-SL",
        icon: Github,
        url: "https://github.com/Sly-SL",
        color: "#ffffff",
        gradient: "from-[#333] to-[#24292e]",
        isPrimary: false
    },
    {
        name: "YouTube",
        displayName: "YouTube",
        subText: "@slysl-coder",
        icon: YoutubeIcon,
        url: "https://www.youtube.com/@slysl-coder",
        color: "#FF0000",
        gradient: "from-[#FF0000] to-[#CC0000]",
        isPrimary: false
    },
    {
        name: "YouTube",
        displayName: "YouTube",
        subText: "@tarnovtv",
        icon: YoutubeIcon,
        url: "https://www.youtube.com/@tarnovtv",
        color: "#FF0000",
        gradient: "from-[#FF0000] to-[#CC0000]",
        isPrimary: false
    },
    {
        name: "TikTok",
        displayName: "Tiktok",
        subText: "@_slysl_",
        icon:TiktokIcon,
        url: "https://tiktok.com/@_slysl_",
        color: "black",
        gradient: "from-[#000000] via-[#25F4EE] to-[#FE2C55]",
        isPrimary: false
    },
    {
        name: "TikTok",
        displayName: "Tiktok",
        subText: "@tarnovtv",
        icon:TiktokIcon,
        url: "https://www.tiktok.com/@tarnovtv",
        color: "black",
        gradient: "from-[#000000] via-[#25F4EE] to-[#FE2C55]",
        isPrimary: false
    }
]as const;
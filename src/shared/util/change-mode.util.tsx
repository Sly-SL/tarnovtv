import type {AllModesEnumType} from "@/shared/consts/enums/all-modes.enum";

export const ChangeModeUtil = (mode:AllModesEnumType) => {
    localStorage.setItem("mode", mode);
    document.documentElement.setAttribute("data-mode", mode);
}
import type {AllThemesEnumType} from "@/shared/consts/enums/all-themes.enum";

export const ChangeThemeUtil = (theme:AllThemesEnumType) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
}
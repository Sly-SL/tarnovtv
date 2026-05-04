import type {ReactNode} from "react";
import type {ShortcutsType} from "@/shared/types/shortcuts.type";

export type ButtonHeaderProps = {
    link: ShortcutsType;
    children: ReactNode;
    className?: string;
    label?: ReactNode;
    getElementByIdAction?: string;
    id?: string;
    mobile?: boolean;
    noLink?: boolean; // ← добавь
}
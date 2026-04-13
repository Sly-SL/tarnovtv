import type {ReactNode} from "react";
import type {ShortcutsType} from "@/shared/types/shortcuts.type";

export type ButtonHeaderProps = {
    link: ShortcutsType;
    children: ReactNode;
    className?: string;
    getElementByIdAction?: string;
    id?: string;
}
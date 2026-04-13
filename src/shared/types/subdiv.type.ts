import type {ReactNode} from "react";
import {allSubdivs} from "@/shared/consts/enums/subdivs.enums";

export type SubdivType = {
    id:AllSubdivsType;
    children:ReactNode
}

export type AllSubdivsType = typeof allSubdivs[number];
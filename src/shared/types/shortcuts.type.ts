import {shortcuts, shortcutsSlysl,} from "@/shared/consts/enums/shortcuts.enum";

export type ShortcutsType = typeof shortcuts[keyof typeof shortcuts];

export type ShortcutsSlyslType = typeof shortcutsSlysl[keyof typeof shortcutsSlysl];


export type AllShortcutsType = ShortcutsType | ShortcutsSlyslType


type Combine<A extends string, B extends string> =
    `${A}/${B}` | `/${A}/${B}` | `${A}+${B}`;

type RecursiveCombine<
    T extends string,
    Acc extends string = never
> =
    | Acc
    | T
    | (T extends infer U extends string
    ? RecursiveCombine<
        Exclude<T, U>,
        Acc extends never ? U : Combine<Acc, U>
    >
    : never);

export type CascadeShortcutsType =
    | `${RecursiveCombine<AllShortcutsType>}`
    | (string & {});
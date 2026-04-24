export const AllThemesEnum = ["purple", "gold", "blue", "green", "red"] as const;

export type AllThemesEnumType = (typeof AllThemesEnum)[number];
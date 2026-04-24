export const AllModesEnum = ["new","legacy"] as const;

export type AllModesEnumType = (typeof AllModesEnum)[number];
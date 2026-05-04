import type {AllUsersRolesType} from "@/shared/types/all/all-user-roles.type";

export type UserType = {
    id: string;
    name: string;
    surname: string;
    gender: "male" | "female";
    email: string;
    password: string;
    badAttempts: number;
    image: string;
    role: AllUsersRolesType;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
};
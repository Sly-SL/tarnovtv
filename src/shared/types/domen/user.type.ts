import type {AllUsersRolesType} from "@/shared/types/all/all-user-roles.type";
import type {Timestamp} from "firebase-admin/firestore";

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
    deactivatedAt: Timestamp | null;
    createdAt: Timestamp;
};
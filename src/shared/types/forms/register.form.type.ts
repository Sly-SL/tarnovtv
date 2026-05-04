import type {UserType} from "@/shared/types/domen/user.type";

export interface RegisterFormType extends Omit<UserType,"id"| "badAttempts"| "token"| "image"| "role">{
    password_confirm: string
    isNotificationAllowed: boolean
}
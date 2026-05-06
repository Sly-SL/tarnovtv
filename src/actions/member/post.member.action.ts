// @/actions/members/member-post.action.ts
"use server";
import {memberPost} from "@/lib/firebase/post/member.post";
import type {MemberType} from "@/shared/types/domen/member.type";
import {AdminActionMiddleware} from "@/middlewares/admin-action.middleware";

export const MemberPostAction = async (data: Omit<MemberType, "id">): Promise<{success: boolean; message?: string}> => {
    if (!data.name?.trim()) return {success: false, message: "Podaj imię"};
    if (!data.role?.trim()) return {success: false, message: "Podaj rolę"};
    if (typeof data.order !== "number") return {success: false, message: "Podaj kolejność"};

    try {
        await AdminActionMiddleware()
        await memberPost(data);
        return {success: true};
    } catch {
        return {success: false, message: "Błąd podczas dodawania"};
    }
};
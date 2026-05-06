// @/actions/members/member-patch.action.ts
"use server";
import {memberPatch} from "@/lib/firebase/patch/member.patch";
import type {MemberType} from "@/shared/types/domen/member.type";
import {AdminActionMiddleware} from "@/middlewares/admin-action.middleware";

export const MemberPatchAction = async (id: string, data: Partial<Omit<MemberType, "id">>): Promise<{success: boolean; message?: string}> => {
    if (!id) return {success: false, message: "Brak ID"};
    if (data.name !== undefined && !data.name.trim()) return {success: false, message: "Imię nie może być puste"};
    if (data.role !== undefined && !data.role.trim()) return {success: false, message: "Rola nie może być pusta"};

    try {
        await AdminActionMiddleware()
        await memberPatch(id, data);
        return {success: true};
    } catch {
        return {success: false, message: "Błąd podczas aktualizacji"};
    }
};
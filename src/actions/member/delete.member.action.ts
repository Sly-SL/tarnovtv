// @/actions/members/member-delete.action.ts
"use server";
import {memberDelete} from "@/lib/firebase/delete/member.delete";

export const MemberDeleteAction = async (id: string): Promise<{success: boolean; message?: string}> => {
    if (!id) return {success: false, message: "Brak ID"};
    try {
        await memberDelete(id);
        return {success: true};
    } catch {
        return {success: false, message: "Błąd podczas usuwania"};
    }
};
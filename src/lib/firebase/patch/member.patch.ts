// member.patch.ts
import {adminDb} from "@/lib/firebase/firebase-admin";
import type {MemberType} from "@/shared/types/domen/member.type";

export const memberPatch = async (id: string, data: Partial<Omit<MemberType, "id">>) => {
    await adminDb.collection("members").doc(id).update(data);
};
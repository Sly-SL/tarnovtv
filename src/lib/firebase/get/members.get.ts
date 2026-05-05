// members.get.ts
import {adminDb} from "@/lib/firebase/firebase-admin";
import type {MemberType} from "@/shared/types/domen/member.type";

export const membersGet = async (): Promise<MemberType[]> => {
    const snap = await adminDb.collection("members").orderBy("order", "asc").get();
    return snap.docs.map(d => ({id: d.id, ...d.data()} as MemberType));
};
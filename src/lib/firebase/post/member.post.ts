// member.post.ts
import {adminDb} from "@/lib/firebase/firebase-admin";
import type {MemberType} from "@/shared/types/domen/member.type";

export const memberPost = async (data: Omit<MemberType, "id">) => {
    await adminDb.collection("members").add(data);
};
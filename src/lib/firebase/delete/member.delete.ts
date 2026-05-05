// @/lib/firebase/delete/member.delete.ts
import {adminDb} from "@/lib/firebase/firebase-admin";

export const memberDelete = async (id: string) => {
    await adminDb.collection("members").doc(id).delete();
};
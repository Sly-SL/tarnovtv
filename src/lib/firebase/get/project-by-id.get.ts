'use server'

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {ProjectType} from "@/shared/types/domen/project.type";

export async function projectByIdGet({id}: {id: string}): Promise<ProjectType | null> {
    const snap = await adminDb.collection("projects").doc(id).get();
    if (!snap.exists) return null;
    return {id: snap.id, ...snap.data() as Omit<ProjectType, "id">};
}
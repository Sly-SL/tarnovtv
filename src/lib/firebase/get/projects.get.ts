'use server'

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {ProjectType} from "@/shared/types/domen/project.type";

export async function projectsGet(): Promise<ProjectType[]> {
    const snap = await adminDb.collection("projects").get();
    if (snap.empty) return [];
    return snap.docs.map(doc => ({id: doc.id, ...doc.data() as Omit<ProjectType, "id">}));
}
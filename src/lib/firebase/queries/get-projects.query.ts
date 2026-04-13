'use server'

import {collection, getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase";
import type {ProjectType} from "@/shared/types/project.type";

export async function getProjectsQuery(): Promise<ProjectType[]> {
    const ref = collection(db, "projects");
    const snap = await getDocs(ref);

    if (snap.empty) return [];

    return snap.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<ProjectType, "id">),
    }));
}
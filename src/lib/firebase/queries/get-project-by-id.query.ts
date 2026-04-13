'use server'

import {doc, getDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase";
import type {ProjectType} from "@/shared/types/project.type";

export async function getProjectByIdQuery({id}:{id:string}): Promise<ProjectType|null> {
    const ref = doc(db, "projects", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return {
        id: snap.id,
        ...(snap.data() as Omit<ProjectType, "id">),
    };
}
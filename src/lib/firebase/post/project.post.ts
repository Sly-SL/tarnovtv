"use server";

import type {ProjectType} from "@/shared/types/domen/project.type";
import {adminDb} from "@/lib/firebase/firebase-admin";

export async function projectPost(data: Omit<ProjectType, "id">) {
    await adminDb.collection("projects").add(data);
}
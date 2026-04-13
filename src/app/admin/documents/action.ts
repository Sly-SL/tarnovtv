'use server'

import {addDataWithCustomId} from "@/lib/firebase/firebase";
import {AdminMiddleware} from "@/middlewares/admin";
import {DocumentType} from "@/shared/types/documents.type";
import {randomUUID} from "node:crypto";

export async function AddDocumentAction(project:Omit<DocumentType,"id">) {
    const res = await AdminMiddleware()

    if (res.status === 200) {
        const {...projectData } = project;

        await addDataWithCustomId("documents", randomUUID(), projectData);
    }
}
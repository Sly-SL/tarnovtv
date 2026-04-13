'use server'

import {addDataWithCustomId} from "@/lib/firebase/firebase";
import {ProjectType} from "@/shared/types/project.type";
import {AdminMiddleware} from "@/middlewares/admin";

export async function AddWorkAction(project:ProjectType) {
    const res = await AdminMiddleware()

    if (res.status === 200) {
        const { id, ...projectData } = project;

        await addDataWithCustomId("projects", id, projectData);
    }
}
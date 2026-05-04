'use server'

import {ModeratorMiddleware} from "@/middlewares/moderator.middleware";
import type {ProjectType} from "@/shared/types/domen/project.type";
import {addDataWithCustomId} from "@/lib/firebase/firebase-admin";

export async function AddProjectAction(project:ProjectType) {
    await ModeratorMiddleware()
    const { id, ...projectData } = project;

    await addDataWithCustomId("projects", id, projectData);
}
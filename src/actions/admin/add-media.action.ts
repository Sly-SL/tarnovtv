'use server'

import {randomUUID} from "node:crypto";
import {ModeratorMiddleware} from "@/middlewares/moderator.middleware";
import type {MediaType} from "@/shared/types/domen/media.type";
import {addDataWithCustomId} from "@/lib/firebase/firebase-admin";

export async function AddMediaAction(project:Omit<MediaType,"id">) {
    await ModeratorMiddleware()
    const {...projectData } = project;

    await addDataWithCustomId("media", randomUUID(), projectData);
}
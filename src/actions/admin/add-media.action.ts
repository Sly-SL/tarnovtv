'use server'

import {randomUUID} from "node:crypto";
import type {MediaType} from "@/shared/types/domen/media.type";
import {addDataWithCustomId} from "@/lib/firebase/firebase-admin";
import {ModeratorActionMiddleware} from "@/middlewares/moderator-action.middleware";

export async function AddMediaAction(project:Omit<MediaType,"id">) {
    await ModeratorActionMiddleware()
    const {...projectData } = project;

    await addDataWithCustomId("media", randomUUID(), projectData);
}
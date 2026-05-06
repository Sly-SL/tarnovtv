'use server'

import {ModeratorMiddleware} from "@/middlewares/moderator.middleware";
import {addDataWithCustomId} from "@/lib/firebase/firebase-admin";
import type {EventsType} from "@/shared/types/domen/events.type";

export async function AddEventAction(event:EventsType) {
    await ModeratorMiddleware()
    const { id, ...eventsData } = event;

    await addDataWithCustomId("events", id, eventsData);
}
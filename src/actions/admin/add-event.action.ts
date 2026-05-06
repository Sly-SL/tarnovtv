'use server'

import type {EventsType} from "@/shared/types/domen/events.type";
import {eventsPost} from "@/lib/firebase/post/events.post";
import {ModeratorActionMiddleware} from "@/middlewares/moderator-action.middleware";

export async function AddEventAction(event:Omit<EventsType, "id">) {
    await ModeratorActionMiddleware()
    const {...eventsData } = event;

    await eventsPost(eventsData);
}
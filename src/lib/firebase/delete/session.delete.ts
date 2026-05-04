"use server"


import {deleteDocument} from "@/lib/firebase/firebase-admin";

export const sessionDelete = async (sessionId:string) => {
    await deleteDocument("sessions", sessionId);
}
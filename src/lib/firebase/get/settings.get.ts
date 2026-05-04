'use server'

import {adminDb} from "@/lib/firebase/firebase-admin";
import type {UserSettingsType} from "@/shared/types/domen/user-settings.type";

type SettingsResult = { success: true; data: UserSettingsType } | { success: false };


export async function settingsGet({id}: {id: string}): Promise<SettingsResult> {
    const snap = await adminDb.collection("settings").doc(id).get();
    if (!snap.exists) return {success:false};
    return {success:true, data:{userId: snap.id, ...snap.data() as Omit<UserSettingsType, "userId">}};
}
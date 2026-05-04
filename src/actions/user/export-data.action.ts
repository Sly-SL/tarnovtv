"use server";

import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {settingsGet} from "@/lib/firebase/get/settings.get";
import {sessionsGet} from "@/lib/firebase/get/sessions.get";

export async function exportUserDataAction() {
    const user = await GetUserBySessionIdAction();
    if (!user) throw new Error("Nie jesteś zalogowany");

    const [settingsResult, sessionsResult] = await Promise.all([
        settingsGet({ id: user.id }),
        sessionsGet({ userId: user.id }),
    ]);

    const { password, ...safeUser } = user;

    return {
        exportedAt: new Date().toISOString(),
        profile: safeUser,
        settings: settingsResult.success ? settingsResult.data : null,
        sessions: sessionsResult.success
            ? sessionsResult.data.map(({ id, createdAt, lastActivityAt, metadata }) => ({
                id,
                createdAt,
                lastActivityAt,
                device: metadata?.device,
                location: metadata?.location,
                ip: metadata?.ip,
            }))
            : [],
    };
}
"use server"

import {adminDb} from "@/lib/firebase/firebase-admin";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import type {UserType} from "@/shared/types/domen/user.type";

export type AdminStatsType = {
    totalUsers: number;
    byRole: Record<string, number>;
    blockedUsers: number;
    totalSessions: number;
    topCountries: {country: string; count: number}[];
    recentRegistrations: number;
};

export async function getAdminStatsAction(): Promise<AdminStatsType | null> {
    const caller = await GetUserBySessionIdAction();
    if (!caller || caller.role !== "admin") return null;

    const [usersSnap, sessionsSnap] = await Promise.all([
        adminDb.collection("users").get(),
        adminDb.collection("sessions").get(),
    ]);

    const users = usersSnap.docs.map(d => d.data() as UserType);

    const byRole: Record<string, number> = {user: 0, moderator: 0, admin: 0};
    let blockedUsers = 0;
    let recentRegistrations = 0;
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    for (const u of users) {
        byRole[u.role] = (byRole[u.role] ?? 0) + 1;
        if (u.badAttempts > 0) blockedUsers++;
    }

    // Count sessions and top countries
    const countryCounts: Record<string, number> = {};
    for (const doc of sessionsSnap.docs) {
        const data = doc.data();
        const country = data?.metadata?.location?.country;
        if (country && country !== "unknown") {
            countryCounts[country] = (countryCounts[country] ?? 0) + 1;
        }
        const createdAt = data?.createdAt;
        if (createdAt && createdAt > sevenDaysAgo) recentRegistrations++;
    }

    const topCountries = Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([country, count]) => ({country, count}));

    return {
        totalUsers: users.length,
        byRole,
        blockedUsers,
        totalSessions: sessionsSnap.size,
        topCountries,
        recentRegistrations,
    };
}
"use client";

import {useEffect, useState} from "react";
import SettingsForUserPage from "@/shared/components/custom/pages/settings/settings-for-user.page";
import SettingsSkeletonPage from "@/shared/components/custom/pages/settings/settings-skeleton.page";
import SettingsForAdminPage from "@/shared/components/custom/pages/settings/settings-for-admin.page";
import SettingsForModeratorPage from "@/shared/components/custom/pages/settings/settings-for-moderator.page";
import SettingsForUnauthorizedPage from "@/shared/components/custom/pages/settings/settings-for-unauthorized.page";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";
import {settingsGet} from "@/lib/firebase/get/settings.get";
import {sessionsGet} from "@/lib/firebase/get/sessions.get";
import type {UserType} from "@/shared/types/domen/user.type";
import type {UserSettingsType} from "@/shared/types/domen/user-settings.type";
import type {SessionType} from "@/shared/types/domen/session.type";
import {toast} from "sonner";

const Page = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [settings, setSettings] = useState<UserSettingsType | null>(null);
    const [sessions, setSessions] = useState<SessionType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await GetUserBySessionIdAction();
                if (!user) return;

                setUser(user);

                const [settingsResult, sessionsResult] = await Promise.all([
                    settingsGet({ id: user.id }),
                    sessionsGet({ userId: user.id }),
                ]);

                setSettings(settingsResult.success ? settingsResult.data : null);
                setSessions(sessionsResult.success ? sessionsResult.data : []);
            } catch (error) {
                if (error instanceof Error) toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <SettingsSkeletonPage />;
    if (!user?.id) return <SettingsForUnauthorizedPage />;

    console.log(sessions+"Sessions logged",)

    switch (user.role) {
        case "admin":
            return <SettingsForAdminPage user={user} settings={settings} sessions={sessions} />;
        case "moderator":
            return <SettingsForModeratorPage user={user} settings={settings} sessions={sessions} />;
        case "user":
            return <SettingsForUserPage user={user} settings={settings} sessions={sessions} />;
        default:
            return <SettingsSkeletonPage />;
    }
};

export default Page;
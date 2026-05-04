"use client"

import SettingsForUnauthorizedPage from "@/shared/components/custom/pages/settings/settings-for-unauthorized.page";
import X1Y1HalfSettings from "@/shared/components/custom/pages/settings/halfs/x1y1.half.settings";
import X1Y3HalfSettings from "@/shared/components/custom/pages/settings/halfs/x1y3.half.settings";
import {SettingsPageProps} from "@/shared/types/pages/settings.type";

const SettingsForUserPage = ({ settings, sessions,user }: SettingsPageProps) => {

    return (
        <>
            <X1Y1HalfSettings {...user} />
            <SettingsForUnauthorizedPage {...user} />
            {settings && (
                <X1Y3HalfSettings
                    user={user}
                    settings={settings}
                    sessions={sessions}
                />
            )}
        </>
    );
};

export default SettingsForUserPage;
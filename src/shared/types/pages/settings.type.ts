import type {UserSettingsType} from "@/shared/types/domen/user-settings.type";
import type {UserType} from "@/shared/types/domen/user.type";
import type {SessionType} from "@/shared/types/domen/session.type";

export interface SettingsPageProps {
    settings: UserSettingsType | null;
    sessions: SessionType[];
    user: UserType;
}
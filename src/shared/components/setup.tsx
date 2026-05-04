"use client"

import {useEffect} from "react";
import {AllThemesEnum} from "@/shared/consts/enums/all-themes.enum";
import {AllModesEnum} from "@/shared/consts/enums/all-modes.enum";
import {AllCleanModesEnum} from "@/shared/consts/enums/all-clean-modes.enum";
import {settingsGet} from "@/lib/firebase/get/settings.get";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";

const Setup = () => {

    const applySettings = (theme: string, mode: string, cleanMode: string) => {
        const root = document.documentElement;
        root.setAttribute("data-theme", theme);
        root.setAttribute("data-mode", mode);
        root.setAttribute("data-clean-mode", cleanMode);
    };

    const RunSetup = async () => {
        const normalize = (value: string | null | undefined, list: readonly string[]) => {
            if (!value || value === "undefined") return list[0];
            return list.includes(value) ? value : list[0];
        };

        const isInitialized = localStorage.getItem("settings-initialized");

        let theme = normalize(localStorage.getItem("theme"), AllThemesEnum);
        let mode = normalize(localStorage.getItem("mode"), AllModesEnum);
        let cleanMode = normalize(localStorage.getItem("clean-mode"), AllCleanModesEnum);

        applySettings(theme, mode, cleanMode);

        if (isInitialized) return;

        try {
            const user = await GetUserBySessionIdAction();

            if (user?.id) {
                const userSettings = await settingsGet({ id: user.id });

                if (userSettings.success) {
                    theme = normalize(userSettings.data.theme, AllThemesEnum);
                    mode = normalize(userSettings.data.mode, AllModesEnum);
                    cleanMode = normalize(userSettings.data.cleanMode, AllCleanModesEnum);

                    console.log(theme,mode,cleanMode)

                    localStorage.setItem("theme", theme);
                    localStorage.setItem("mode", mode);
                    localStorage.setItem("clean-mode", cleanMode);

                    applySettings(theme, mode, cleanMode);
                }
            }

            localStorage.setItem("settings-initialized", "true");

        } catch {}
    };

    useEffect(() => {
        RunSetup();
    }, []);

    return null;
};

export default Setup;
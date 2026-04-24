"use client"

import {useLayoutEffect} from "react";
import {AllThemesEnum} from "@/shared/consts/enums/all-themes.enum";
import {AllModesEnum} from "@/shared/consts/enums/all-modes.enum";

const Setup = () => {
    useLayoutEffect(() => {
        const theme = localStorage.getItem("theme") ?? AllThemesEnum[0];
        const mode = localStorage.getItem("mode") ?? AllModesEnum[0];

        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.setAttribute("data-mode", mode);
    }, []);

    return <div className={"hidden"}/>;
};

export default Setup;
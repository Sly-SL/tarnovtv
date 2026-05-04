"use client";

import {AllThemesEnum} from "@/shared/consts/enums/all-themes.enum";
import {ChangeThemeUtil} from "@/shared/util/change/settings/change-theme.util";
import type {AllThemesType} from "@/shared/types/all/all-themes.type";
import type {UserType} from "@/shared/types/domen/user.type";

const themeColors: Record<AllThemesType, string> = {
    purple: "bg-purple-500",
    green:  "bg-green-500",
    lagune: "bg-blue-300",
    red:    "bg-red-600",
    gold:   "bg-yellow-600",
    blue:   "bg-blue-700",
    pink:   "bg-pink-400",
};

const ChangeThemeCustom = (user?: Partial<UserType>) => {
    return (
        <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)] p-6 flex flex-col gap-4">

            {/* Label */}
            <span className="block text-[11px] font-medium tracking-widest uppercase text-white/35">
                Motyw
            </span>

            <div>
                <p className="text-lg font-bold text-white leading-tight">
                    Kolor{" "}
                    <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                        akcentu
                    </span>
                </p>
                <p className="text-xs text-white/30 mt-1">
                    Wybierz kolor, który pojawia się w całej aplikacji.
                </p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"/>

            <ul className="flex flex-wrap gap-3">
                {AllThemesEnum.map((theme) => (
                    <li key={theme}>
                        <button
                            type="button"
                            title={theme}
                            onClick={() => ChangeThemeUtil(theme, user?.id)}
                            className={`w-9 h-9 rounded-full border-2 border-white/10 transition-all duration-150 hover:scale-110 active:scale-95 hover:border-(--contrast-color)/50 ${themeColors[theme]}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChangeThemeCustom;

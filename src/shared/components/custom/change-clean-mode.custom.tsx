"use client";

import {AllCleanModesEnum} from "@/shared/consts/enums/all-clean-modes.enum";
import {ChangeCleanModeUtil} from "@/shared/util/change/settings/change-clean-mode.util";
import BasicToggleComponent from "@/shared/components/libs/basic/toogle.component";
import type {UserType} from "@/shared/types/domen/user.type";
import {cleanModesParse} from "@/shared/util/parse/clean-modes.parse";

const ChangeCleanModeCustom = (user?: Partial<UserType>) => {
    return (
        <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)] p-6 flex flex-col gap-4">

            <span className="block text-[11px] font-medium tracking-widest uppercase text-white/35">
                Czysty tryb
            </span>

            <div>
                <p className="text-lg font-bold text-white leading-tight">
                    Tryb{" "}
                    <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                        skupienia
                    </span>
                </p>
                <p className="text-xs text-white/30 mt-1">
                    Zostawia tylko priorytetowe informacje. Niektóre treści mogą być niedostępne.
                </p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"/>

            <BasicToggleComponent
                data={AllCleanModesEnum.map((item) => ({
                    label: cleanModesParse(item),
                    value: item,
                    func: () => ChangeCleanModeUtil(item, user?.id),
                }))}
            />
        </div>
    );
};

export default ChangeCleanModeCustom;
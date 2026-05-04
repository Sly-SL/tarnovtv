"use client";

import {AllModesEnum} from "@/shared/consts/enums/all-modes.enum";
import {ChangeModeUtil} from "@/shared/util/change/settings/change-mode.util";
import BasicToggleComponent from "@/shared/components/libs/basic/toogle.component";
import type {UserType} from "@/shared/types/domen/user.type";

const ChangeModeCustom = (user?: Partial<UserType>) => {
    return (
        <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)] p-6 flex flex-col gap-4">

            <span className="block text-[11px] font-medium tracking-widest uppercase text-white/35">
                Tryb
            </span>

            <div>
                <p className="text-lg font-bold text-white leading-tight">
                    Tryb{" "}
                    <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                        wyświetlania
                    </span>
                </p>
                <p className="text-xs text-white/30 mt-1">
                    Wybierz stary bądź nowy styl interfejsu.
                </p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"/>

            <BasicToggleComponent
                data={AllModesEnum.map((item) => ({
                    label: item,
                    value: item,
                    func: () => ChangeModeUtil(item, user?.id),
                }))}
            />
        </div>
    );
};

export default ChangeModeCustom;
"use client";

import type {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import Animate from "@/shared/components/libs/animate/animate.ssr";

type ToggleItem<T extends string | number | boolean> = {
    value: T;
    label: string;
    func: Dispatch<SetStateAction<T>>;
};

const BasicToggleComponent = <T extends string | number | boolean>({
                                                        data,
                                                    }: {
    data: ToggleItem<T>[];
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Animate preset={"fadeRight"} duration={1500} className="inline-flex w-fit rounded-3xl border dark:bg-white/10 bg-white/60 select-none">
            {data.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                    <div
                        key={String(item.value)}
                        role="radio"
                        aria-checked={isActive}
                        onClick={() => {
                            setActiveIndex(index);
                            item.func(item.value);
                        }}
                        className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200
              ${isActive ? " rounded-3xl border text-white bg-purple-500 " : "dark:text-white hover:scale-105 text-black/90"}
            `}
                    >
                        {item.label}
                    </div>
                );
            })}
        </Animate>
    );
};

export default BasicToggleComponent;
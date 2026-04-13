export const dynamic = "force-static";

import type {ChangeEventHandler, CSSProperties, FC} from "react";

export interface Option {
    value: string | number;
    label: string;
}

export interface BasicSelectProps {
    value?: string | number;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
    className?: string;
    placeholder?: string;
    themaHex?: string;
    name?: string;
    required?: boolean;
    options: Option[];
    disabled?: boolean;
}

export const BasicSelect: FC<BasicSelectProps> = ({
                                                          value,
                                                          onChange,
                                                          className = "",
                                                          themaHex = "#ff7a00",
                                                          required = false,
                                                          placeholder = "Wybierz...",
                                                          name,
                                                          options,
                                                          disabled
                                                      }) => {
    return (
        <div
            className={`relative w-full ${className}`}
            style={{ "--select-color": themaHex } as CSSProperties}
        >
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                aria-disabled={disabled}
                className={`w-full appearance-none rounded-lg px-4 py-3 text-sm md:text-base bg-white/80 dark:bg-black/20 border border-(--select-color) text-gray-900 dark:text-gray-100 shadow-[0_3px_12px_rgba(0,0,0,0.08)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-(--select-color) disabled:opacity-50 disabled:pointer-events-none hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]`}
            >
                {placeholder && <option value="" hidden>
                    {placeholder}
                </option>}

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <span
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
                ▼
            </span>
        </div>
    );
};
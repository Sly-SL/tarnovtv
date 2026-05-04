import type {ReactNode} from "react";

export const BasicCheckbox = ({checked, onChange, children}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    children: ReactNode;
}) => (
    <div
        onClick={() => onChange(!checked)}
        className={[
            "flex items-start gap-2.5 px-3.5 py-3 rounded-xl border cursor-pointer select-none transition-all duration-150",
            checked
                ? "border-indigo-300 bg-indigo-50 dark:border-(--contrast-color)/32 dark:bg-(--contrast-color)/[0.06]"
                : "border-gray-200 bg-gray-50 hover:border-indigo-200 dark:border-white/[0.06] dark:bg-white/[0.018] dark:hover:border-(--contrast-color)/18",
        ].join(" ")}
    >
        <div className={[
            "mt-0.5 w-4 h-4 min-w-[16px] rounded-[5px] border flex items-center justify-center transition-all duration-150",
            checked
                ? "border-indigo-400 bg-indigo-100 text-indigo-500 dark:border-(--contrast-color) dark:bg-(--contrast-color)/22 dark:text-[#a5b4fc]"
                : "border-gray-300 bg-white dark:border-white/13 dark:bg-white/[0.035]",
        ].join(" ")}>
            {checked && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path
                        d="M1 3.5L3.5 6L8 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </div>
        <p className="text-xs leading-relaxed text-gray-500 dark:text-white/35">{children}</p>
    </div>
);
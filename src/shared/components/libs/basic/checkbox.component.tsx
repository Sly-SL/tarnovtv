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
                ? "border-(--contrast-color)/32 bg-(--contrast-color)/[0.06]"
                : "border-white/[0.06] bg-white/[0.018] hover:border-(--contrast-color)/18",
        ].join(" ")}
    >
        <div className={[
            "mt-0.5 w-4 h-4 min-w-[16px] rounded-[5px] border flex items-center justify-center transition-all duration-150",
            checked
                ? "border-(--contrast-color) bg-(--contrast-color)/22"
                : "border-white/13 bg-white/[0.035]",
        ].join(" ")}>
            {checked && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path d="M1 3.5L3.5 6L8 1" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )}
        </div>
        <p className="text-xs text-white/35 leading-relaxed">{children}</p>
    </div>
);
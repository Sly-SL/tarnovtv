export const dynamic = "force-static";

import type {CSSProperties, FC, MouseEvent, ReactNode} from "react";

interface BasicButtonProps {
    children?: ReactNode;
    themaHex?: string;
    type?: "submit" | "reset" | "button";
    className?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => unknown;
    onDoubleClick?: (e: MouseEvent<HTMLButtonElement>) => unknown;
    disabled?: boolean;
    loading?: boolean;
    description?: ReactNode;
    style?: CSSProperties;
    variant?: "solid" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const getContrastColor = (hex: string) => {
    // Преобразуем hex в RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Яркость по формуле WCAG
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000000" : "#ffffff"; // темный текст на светлом фоне и наоборот
};

export const BasicButton: FC<BasicButtonProps> = ({
                                                          children,
                                                          themaHex = "#b12ef2",
                                                          type = "button",
                                                          className = "",
                                                          onClick,
                                                          onDoubleClick,
                                                          disabled,
                                                          loading,
                                                          description,
                                                          style,
                                                          variant = "solid",
                                                          size = "md",
                                                      }) => {
    const sizeClass =
        size === "sm"
            ? "text-xs py-1.5 px-3 rounded-md"
            : size === "lg"
                ? "text-base py-3.5 px-7 rounded-xl"
                : "text-sm py-2.5 px-5 rounded-lg";

    const base =
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]";

    const variantClass =
        variant === "solid"
            ? " shadow-[0_3px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)] " +
            "bg-[color:var(--btn-color)] hover:brightness-105 focus-visible:ring-[color:var(--btn-color)]"
            : variant === "outline"
                ? "border border-[color:var(--btn-color)] " +
                "hover:bg-[color:var(--btn-color)] hover:text-white focus-visible:ring-[color:var(--btn-color)]"
                : " hover:bg-[color:var(--btn-color)]/10 focus-visible:ring-[color:var(--btn-color)]";

    return (
        <button
            type={type}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            aria-busy={loading}
            style={{ "--btn-color": themaHex,color: getContrastColor(themaHex), style} as CSSProperties}
            className={`${base} ${sizeClass} ${variantClass} ${className}`}
        >
            {loading ? (
                <span className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
            ) : (
                <>
                    {description && (
                        <span className="opacity-90 text-sm font-normal">{description}</span>
                    )}
                    {children}
                </>
            )}
        </button>
    );
};
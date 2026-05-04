import type {CSSProperties, FC, MouseEvent, ReactNode} from "react";

export const dynamic = "force-static";

interface BasicButtonProps {
    children?: ReactNode;
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

export const BasicButton: FC<BasicButtonProps> = ({
                                                      children,
                                                      type = "button",
                                                      className = "",
                                                      onClick,
                                                      onDoubleClick,
                                                      disabled,
                                                      loading,
                                                      description,
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
            ? "shadow-[0_3px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)] " +
            "bg-[color:var(--contrast-color)] hover:brightness-105 focus-visible:ring-[color:var(--contrast-color)]"
            : variant === "outline"
                ? "border border-[color:var(--contrast-color)] " +
                "hover:bg-[color:var(--contrast-color)] duration-400 hover:text-white focus-visible:ring-[color:var(--contrast-color)]"
                : "hover:bg-[color:var(--contrast-color)]/10 focus-visible:ring-[color:var(--contrast-color)]";

    return (
        <button
            type={type}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            aria-busy={loading}
            className={`${base} ${sizeClass} ${variantClass} ${className}`}
        >
            {loading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
                <>
                    {description && (
                        <span className="opacity-90 text-sm font-normal">
              {description}
            </span>
                    )}
                    {children}
                </>
            )}
        </button>
    );
};
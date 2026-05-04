"use client";

import {toast} from "sonner";
import type {ReactNode} from "react";
import {BasicButton} from "@/shared/components/libs/basic/button.component";

interface BasicSonnerProps {
    children: ReactNode;
    openButtonText: ReactNode;
    disabled?: boolean;
    onToastAction?: () => unknown;
    buttonType?: "submit" | "reset" | "button";
    className?: string;
    variant?: "solid" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    toastTitle?: string;
}

export function BasicSonner({
                                children,
                                openButtonText,
                                onToastAction,
                                buttonType = "button",
                                disabled = false,
                                className,
                                variant,
                                size,
                                toastTitle,
                            }: BasicSonnerProps) {
    const handleClick = () => {
        toast.custom(() => (
            <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#0d0f17]/95 backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)_inset] p-4">
                {toastTitle && (
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
                        {toastTitle}
                    </p>
                )}
                <div className="text-sm text-white/70 leading-relaxed">
                    {children}
                </div>
            </div>
        ));

        if (onToastAction) onToastAction();
    };

    return (
        <BasicButton
            type={buttonType}
            disabled={disabled}
            variant={variant}
            size={size}
            className={className}
            onClick={handleClick}
        >
            {openButtonText}
        </BasicButton>
    );
}
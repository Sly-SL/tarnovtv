"use client";

import {toast} from "sonner";
import type {ReactNode} from "react";
import {BasicButton} from "@/shared/components/libs/basic/button.component";

interface ClassicSonnerProps {
    children:ReactNode,
    openButtonText:ReactNode,
    disabled?:boolean,
    onToastAction?: () => unknown,
    buttonType:"submit"|"reset"|"button",
    className?:string
}

export function BasicSonner({children,openButtonText,onToastAction,buttonType,disabled=false,className}:ClassicSonnerProps) {
    return (
        <BasicButton
            className={className + " "}
            type={buttonType}
            disabled={disabled}
            onClick={() => {
                toast(
                    <div>{children}</div>
                );
                {
                    if (onToastAction) onToastAction();
                }
            }
            }
        >
            {openButtonText}
        </BasicButton>
    );
}

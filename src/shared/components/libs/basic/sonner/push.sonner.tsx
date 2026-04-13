"use client";

import {toast} from "sonner";
import type {ReactNode} from "react";
import {BasicButton} from "@/shared/components/libs/basic/button.component";

interface ClassicSonnerProps {
    children:ReactNode,
    openButtonText:ReactNode,
    disabled?:boolean,
    colorHex?:string,
    onToastAction?: () => unknown,
    buttonType:"submit"|"reset"|"button",
    className?:string
}

export function BasicSonner({children, colorHex,openButtonText,onToastAction,buttonType,disabled=false,className}:ClassicSonnerProps) {
    return (
        <BasicButton
            className={className + " "}
            type={buttonType}
            disabled={disabled}
            themaHex={colorHex}
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

export const dynamic = 'force-static'

import type {ReactNode} from "react";

export function BasicH4({ children,className}: { children?: ReactNode,className?: string }) {
    return (
        <h4 className={"scroll-m-20 text-xl font-semibold tracking-tight "+ className}>
            {children}
        </h4>
    )
}

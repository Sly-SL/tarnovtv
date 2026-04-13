export const dynamic = 'force-static'

import type {ReactNode} from "react";

export function BasicH2({ children,className }: { children?: ReactNode[]|ReactNode|string,className?:string }) {
    return (
        <h2 className={"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 "+ className}>
            {children}
        </h2>
    )
}

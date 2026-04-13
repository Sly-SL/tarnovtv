
export const dynamic= 'force-static'

import type {ReactNode} from "react";

export function BasicP({children,className}:{children?:ReactNode,className?:string}) {
    return (
        <p className={"leading-7 [&:not(:first-child)]:mt-2 "+className}>
            {children}
        </p>
    )
}

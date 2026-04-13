export const dynamic = 'force-static'

import type {ReactNode} from "react";

export function BasicSmall({children,className}:{children?:ReactNode,className?:string}) {
    return (
        <small className={"text-sm leading-none font-medium " + className}>{children}</small>
    )
}

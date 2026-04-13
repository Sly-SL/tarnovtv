export const dynamic = 'force-static';

import type {ReactNode} from "react";

export function BasicH1({children,className,id}:{children?:ReactNode,className?:string,id?:string}) {
    return (
        children ? (
            <h1 id={id} className={"scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"+ " "+className}>
                {children}
            </h1>
        ) : null
    );
}

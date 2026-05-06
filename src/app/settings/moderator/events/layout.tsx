import type {ReactNode} from "react";
import {ModeratorMiddleware} from "@/middlewares/moderator.middleware";

export default async function Layout({children}: {children: ReactNode}) {
    await ModeratorMiddleware();
    return <>{children}</>;
}
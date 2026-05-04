import {AdminMiddleware} from "@/middlewares/admin.middleware";
import type {ReactNode} from "react";

export default async function Layout({children}: {children: ReactNode}) {
    await AdminMiddleware();
    return <>{children}</>;
}
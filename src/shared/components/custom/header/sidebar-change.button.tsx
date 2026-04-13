"use client";

import {useEffect, useLayoutEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {XIcon} from "@/shared/consts/icons/x.icon";
import {ListIcon} from "@phosphor-icons/react";

const SidebarChangeButton = ({ className }: { className?: string }) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useLayoutEffect(() => {
        const t = setTimeout(() => setOpen(false), 0);
        return () => clearTimeout(t);
    }, [pathname]);

    useEffect(() => {
        const target = document.getElementById("global-sidebar");
        if (!target) return;

        const valueToRemove = !open ? "block" : "hidden";
        const value = open ? "block" : "hidden";

        target.classList.add(value);
        target.classList.remove(valueToRemove);
    }, [open]);

    return (
        <li className={className}>
            <button
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((prev) => !prev)}
                style={{ position: "relative", width: 40, height: 40 }}
            >
                {/* Menu */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transition: "opacity 0.3s, transform 0.3s",
                        opacity: open ? 0 : 1,
                        transform: `rotate(${open ? 90 : 0}deg) scale(${open ? 0.8 : 1})`,
                    }}
                >
                    <ListIcon size={40} />
                </div>

                {/* X */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transition: "opacity 0.3s, transform 0.3s",
                        opacity: open ? 1 : 0,
                        transform: `rotate(${open ? 0 : -90}deg) scale(${open ? 1 : 0.8})`,
                    }}
                >
                    <XIcon size={40} />
                </div>
            </button>
        </li>
    );
};

export default SidebarChangeButton;
import {CONSTANTS} from "@/shared/consts/consts.consts";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";

export const revalidate = 60 * 60 * 24 * 31;

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="relative w-full pointer-events-auto mt-auto">

            {/* Top divider */}
            <div className="w-full h-px bg-gray-200 dark:bg-white/[0.07]"/>

            <div className="bg-white/20 dark:bg-[#161617]/20 backdrop-blur-xl px-4 sm:px-8 lg:px-12 py-5">
                <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">

                    {/* Left: copyright */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-1.5 gap-y-1 text-xs text-black/50 dark:text-white/60 font-light">
                        <span className="[display:var(--new)] md:w-20 w-0 inline-block shrink-0"/>

                        <span className="bg-linear-to-r from-blue-500 via-(--contrast-color) to-pink-500 bg-clip-text text-transparent font-semibold">©</span>
                        <span>2021–{year}</span>
                        <span className="text-black/20 dark:text-white/15">·</span>
                        <a
                            href="https://slysl.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold bg-linear-to-r from-blue-500 via-(--contrast-color) to-pink-500 bg-clip-text text-transparent hover:opacity-70 transition-opacity duration-150"
                        >
                            Slysl
                        </a>
                        <span className="text-black/30 dark:text-white/60">&</span>
                        <a
                            href={CONSTANTS.FRONTEND_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold bg-linear-to-r from-blue-500 via-(--contrast-color) to-pink-500 bg-clip-text text-transparent hover:opacity-70 transition-opacity duration-150"
                        >
                            TarnovTV
                        </a>
                        <span className="text-black/40 dark:text-white/60">· All rights reserved.</span>
                    </div>

                    {/* Right: nav */}
                    <nav aria-label="Footer navigation" className="flex items-center gap-0.5">
                        {[
                            {label: "Prywatność", href: shortcuts.privacy},
                            {label: "Regulamin",  href: shortcuts.terms},
                            {label: "Kontakt",    href: shortcuts.contact},
                        ].map(({label, href}) => (
                            <Link
                                key={href}
                                href={href}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium text-black/45 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-all duration-150"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
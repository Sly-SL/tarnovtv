import {CONSTANTS} from "@/shared/consts/consts.consts";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";

export const revalidate = 60*60*24*31;

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="pointer-events-auto z-9999 w-screen bg-white/40 dark:bg-black/40 dark:text-white text-black px-6 py-8 md:py-12">
            <hr className="my-6 border-gray-700 opacity-30" />
            <article className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
                <section className="text-center md:text-left text-sm md:text-base space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row items-center md:items-start">
                    <span>
                        <span className="[display:var(--new)] md:w-24 w-0 inline-block" />
                        <span className={"bg-linear-to-r from-blue-400 via-(--contrast-color) to-pink-500 bg-clip-text text-transparent transition-colors"}>©</span>
                        2021-{year}
                    </span>
                    <a
                        href="https://slysl.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-extrabold bg-linear-to-r from-blue-400 via-(--contrast-color) to-pink-500 bg-clip-text text-transparent transition-colors hover:scale-105 duration-1000"
                    >
                        Slysl
                    </a>
                    <span className="w-0.5 inline-block" />
                    &
                    <span className="w-0.5 inline-block" />

                    <a
                        href={CONSTANTS.FRONTEND_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-extrabold bg-linear-to-r from-blue-400 via-(--contrast-color) to-pink-500 bg-clip-text text-transparent transition-colors hover:scale-105 duration-1000"
                    >
                         TarnovTV
                    </a>
                    <span>. All Rights Reserved.</span>
                </section>
                <nav aria-label="Footer navigation" className="flex flex-wrap justify-center md:justify-end gap-4 text-sm md:text-base mt-4 md:mt-0">
                    <Link className="hover:text-(--contrast-color) transition-colors duration-200 font-medium" href={shortcuts.privacy}>
                        Privacy Policy
                    </Link>
                    <Link className="hover:text-(--contrast-color) transition-colors duration-200 font-medium" href={shortcuts.terms}>
                        Terms of Service
                    </Link>
                    <Link className="hover:text-(--contrast-color) transition-colors duration-200 font-medium" href={shortcuts.contact}>
                        Contact
                    </Link>
                </nav>
            </article>
        </footer>
    );
};

export default Footer;
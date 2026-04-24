import {InstagramLogoIcon, TiktokLogoIcon} from "@phosphor-icons/react/ssr";
import TarnovTvIcon from "@/shared/consts/icons/tarnov-tv.icon";

export default function WeAreChangingForYouPageService() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-12 px-16 sm:items-start">
                <TarnovTvIcon className={"text-(--contrast-color)"} height={100} width={100} />
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        Zmieniamy się dla was
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        niedługo strona będzie dostępna, narazie zobacz{" "}
                        <a
                            href="https://www.tiktok.com/@tarnovtv?lang=en-GB"
                            className="font-medium text-(--contrast-color)"
                        >
                            Tiktok
                        </a>{" "}
                        albo{" "}
                        <a
                            href="https://www.instagram.com/tarnow_tv/"
                            className="font-medium text-(--contrast-color)"
                        >
                            Instagram
                        </a>
                    </p>
                </div>
                <div className="flex flex-col gap-4 pt-5 text-base font-medium sm:flex-row">
                    <a
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 dark:text-zinc-950 text-zinc-50 transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
                        href="https://www.instagram.com/tarnow_tv/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <InstagramLogoIcon/>
                        Instagram
                    </a>
                    <a
                        className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 gap-2 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
                        href="https://www.tiktok.com/@tarnovtv?lang=en-GB"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <TiktokLogoIcon/>
                        Tiktok
                    </a>
                </div>
            </main>
        </div>
    );
}

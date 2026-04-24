import {BUTTONSLEGACY} from "@/shared/consts/enums/buttons-header.enum";
import ButtonHeader from "@/shared/components/custom/header/button.header";
import AboutSubdiv from "@/shared/components/custom/header/subdivs/subdivs/about.subdiv";
import SidebarChangeButton from "@/shared/components/custom/header/sidebar-change.button";
import ProjectsSubdiv from "@/shared/components/custom/header/subdivs/subdivs/projects.subdiv";
import ContactSubdiv from "@/shared/components/custom/header/subdivs/subdivs/contact.subdiv";
import MediaSubdiv from "@/shared/components/custom/header/subdivs/subdivs/media.subdiv";
import OffersSubdiv from "@/shared/components/custom/header/subdivs/subdivs/offers.subdiv";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import SettingsSubdiv from "@/shared/components/custom/header/subdivs/subdivs/settings.subdiv";
import UsSubdiv from "@/shared/components/custom/header/subdivs/subdivs/us.subdiv";


const LegacyHeader = () => {
    return (
        <header className="bg-[rgba(255,255,255,0.55)] dark:bg-[rgba(22,22,23,0.7)] w-screen fixed z-[9999] backdrop-blur-[20px] backdrop-saturate-180 border-b border-purple-100 dark:border-(--contrast-color)/10">
            <h1 className={"hidden"}>Tarnov TV</h1>
            <div className={"h-full [display:var(--legacy)]"}>

                {/*Desktop nav*/}
                <div className={'select-none hidden lg:block z-2 h-full py-4 min-w-[1024px] ps-[22px] pe-[22px]'}>
                    <nav className={"h-full"}>
                        <ul className={'flex sm:gap-2 md:gap-9 text-center h-full items-center justify-center'}>
                            <ButtonHeader id={BUTTONSLEGACY[0].id} link={BUTTONSLEGACY[0].link}>
                                {BUTTONSLEGACY[0].children}
                            </ButtonHeader>
                            {BUTTONSLEGACY.filter((btn,i)=> btn.mobile != true && i != 0).map((button)=>(
                                <ButtonHeader
                                    className={button.className+" text-md underline-offset-8  hover:underline hover:decoration-[3px] hover:text-(--contrast-color) dark:hover:text-(--contrast-color)"}
                                    getElementByIdAction={button.getElementByIdAction}
                                    id={button.id} key={button.id}
                                    link={button.link}>
                                    {button.children}
                                </ButtonHeader>
                            ))}
                        </ul>
                        <li id={"global-nav-subdiv"}
                            className={"hidden justify-center"}>
                            <OffersSubdiv/>
                            <AboutSubdiv/>
                            <ContactSubdiv/>
                            <MediaSubdiv/>
                            <ProjectsSubdiv/>
                            <UsSubdiv/>
                            <SettingsSubdiv/>
                        </li>
                    </nav>
                </div>

                {/*Mobile nav*/}
                <nav
                    className={'block h-full lg:hidden overflow-y-auto py-9 border-(--contrast-color)/5 z-[9999] pointer-events-auto backdrop-blur-[30px] backdrop-saturate-180 dark:border-(--contrast-color)/15 bg-white/30 dark:bg-[#161617]/80'}>
                    <ol className={'flex justify-center'}>
                        <ButtonHeader className={"absolute left-1 translate-x-1 top-3 z-3"} link={BUTTONSLEGACY[0].link}>
                            {BUTTONSLEGACY[0].children}
                        </ButtonHeader>

                        <SidebarChangeButton className={"absolute right-4 top-4 translate-x-1 z-3 "}/>

                        <li>
                            <aside id={"global-sidebar"} className={'hidden'}>
                                <Animate preset={"fadeDown"}>
                                    <ul className={"flex flex-col pt-20 h-screen justify-center items-center gap-3"}>
                                        {BUTTONSLEGACY.filter((_,i)=>i !== 0 && i !== 6).map((button)=>(
                                            <ButtonHeader
                                                className={button.className+" text-6xl text-center w-full"}
                                                getElementByIdAction={button.getElementByIdAction}
                                                id={button.id}
                                                key={button.id}
                                                link={button.link}>
                                                {button.children}
                                            </ButtonHeader>
                                        ))}
                                    </ul>
                                </Animate>
                            </aside>
                        </li>
                    </ol>
                </nav>
            </div>
        </header>
    );
};

export default LegacyHeader;
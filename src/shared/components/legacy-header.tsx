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
        <header className="[display:var(--legacy)] w-screen fixed z-[9999]">
            <h1 className="hidden">Tarnov TV</h1>

            {/* ── Desktop ── */}
            <div className="hidden lg:block">
                <div className="mx-4 mt-3 rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.035)_inset]">
                    <nav className="px-5 py-3">
                        <ul className="flex items-center justify-center gap-1">

                            {/* Logo */}
                            <ButtonHeader id={BUTTONSLEGACY[0].id} link={BUTTONSLEGACY[0].link}
                                          className="mr-auto flex items-center">
                                {BUTTONSLEGACY[0].children}
                            </ButtonHeader>

                            {/* Nav links */}
                            {BUTTONSLEGACY.filter((btn, i) => btn.mobile !== true && i !== 0).map((button) => (
                                <ButtonHeader
                                    key={button.id}
                                    id={button.id}
                                    link={button.link}
                                    getElementByIdAction={button.getElementByIdAction}
                                    className={
                                        (button.className ?? "") +
                                        " px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
                                    }
                                >
                                    {button.children}
                                </ButtonHeader>
                            ))}
                        </ul>

                        {/* Subnavs */}
                        <li id="global-nav-subdiv" className="hidden justify-center pt-1">
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
            </div>

                {/*Mobile nav*/}
                <nav
                    className={'block h-full lg:hidden overflow-y-auto py-9 border-(--contrast-color)/5 z-[9999] pointer-events-auto backdrop-blur-[30px] backdrop-saturate-180 dark:border-(--contrast-color)/15 bg-white/30 dark:bg-[#161617]/80'}>
                    <ol className={'flex justify-center'}>
                        <ButtonHeader className={"absolute left-1 translate-x-1 top-3 z-3"} link={BUTTONSLEGACY[0].link}>
                            {BUTTONSLEGACY[0].children}
                        </ButtonHeader>

                        <SidebarChangeButton className={"absolute right-4 top-4 translate-x-1 z-3 "}/>

                        {/* Fullscreen sidebar */}
                        <li>
                            <aside id={"global-sidebar"} className={'hidden'}>
                                <Animate preset={"fadeDown"}>
                                    <ul className={"flex flex-col h-screen justify-center items-center gap-3"}>
                                        {BUTTONSLEGACY.filter((_,i)=>i !== 0 && i !== 7).map((button)=>(
                                            <ButtonHeader
                                                key={button.id}
                                                id={button.id}
                                                link={button.link}
                                                className={
                                                    (button.className ?? "") +
                                                    " text-4xl font-extrabold text-white/80 hover:text-white hover:text-(--contrast-color) transition-colors duration-150 w-full text-center py-3"
                                                }
                                            >
                                                {button.children}
                                            </ButtonHeader>
                                        ))}
                                    </ul>
                                </Animate>
                            </aside>
                        </li>
                    </ol>
            </nav>
        </header>
    );
};

export default LegacyHeader;
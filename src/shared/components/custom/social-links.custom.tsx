import {SocialLinksEnum} from "@/shared/consts/enums/social-links.enum";
import {ShareNetworkIcon} from "@phosphor-icons/react/ssr";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const SocialLinksCustom = () => {
    const primaryLink = SocialLinksEnum.find(link => link.isPrimary);
    const linksMap = SocialLinksEnum.filter(link => !link.isPrimary);

    return (
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.4)] p-6">

            <p className="text-[11px] font-medium tracking-widest uppercase text-white/35 mb-5">
                Nasze media
            </p>

            <div className="flex flex-col gap-3">

                {/* Primary */}
                {primaryLink && (
                    <Animate preset="fadeLeft" duration={700} once>
                        <a
                            href={primaryLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-between px-4 py-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.018] overflow-hidden hover:border-white/[0.14] transition-all duration-300"
                        >
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r ${primaryLink.gradient}`}/>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"/>
                            </div>

                            <div className="relative flex items-center gap-3.5">
                                <div className="relative flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-15 rounded-xl group-hover:opacity-25 group-hover:scale-110 transition-all duration-500" style={{backgroundColor: primaryLink.color}}/>
                                    <div className="relative p-2.5 rounded-xl">
                                        <primaryLink.icon className="w-5 h-5 transition-all duration-500 group-hover:scale-110" style={{color: primaryLink.color}}/>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors duration-200 leading-tight">
                                        {primaryLink.displayName}
                                    </span>
                                    <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors duration-200">
                                        {primaryLink.subText}
                                    </span>
                                </div>
                            </div>

                            <ShareNetworkIcon className="relative w-4 h-4 text-white/15 group-hover:text-white/50 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"/>
                        </a>
                    </Animate>
                )}

                {/* Grid */}
                <div className="grid grid-cols-2 gap-2">
                    {linksMap.map((link, i) => (
                        <Animate key={i} preset={i % 2 === 0 ? "fadeLeft" : "fadeRight"} once>
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center gap-2.5 px-3 py-3 rounded-xl border border-white/[0.06] bg-white/[0.018] overflow-hidden hover:border-white/[0.12] transition-all duration-300"
                            >
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-linear-to-r ${link.gradient}`}/>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"/>
                                </div>

                                <div className="relative flex items-center justify-center flex-shrink-0">
                                    <div className="absolute inset-0 opacity-15 rounded-lg group-hover:opacity-25 group-hover:scale-110 transition-all duration-500" style={{backgroundColor: link.color}}/>
                                    <div className="relative p-2 rounded-lg">
                                        <link.icon className="w-4 h-4 transition-all duration-500 group-hover:scale-110" style={{color: link.color}}/>
                                    </div>
                                </div>

                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors duration-200 leading-tight">
                                        {link.displayName}
                                    </span>
                                    <span className="text-[10px] text-white/25 group-hover:text-white/45 truncate transition-colors duration-200">
                                        {link.subText}
                                    </span>
                                </div>

                                <ShareNetworkIcon className="w-3 h-3 text-white/15 group-hover:text-white/40 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0"/>
                            </a>
                        </Animate>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialLinksCustom;
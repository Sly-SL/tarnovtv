// @/app/us/page.tsx
import Animate from "@/shared/components/libs/animate/animate.ssr";
import Image from "next/image";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {
    FacebookLogoIcon,
    InstagramLogoIcon,
    SparkleIcon,
    TiktokLogoIcon,
    UsersThreeIcon
} from "@phosphor-icons/react/ssr";
import type {MemberType} from "@/shared/types/domen/member.type";
import {MembersGetAction} from "@/actions/member/get.member.action";
import type {ReactNode} from "react";

const SocialLink = ({href, icon}: {href?: string; icon: ReactNode}) => {
    if (!href) return null;
    return (
        <Link href={href} target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-black/[0.07] bg-black/[0.028] text-black/30 hover:text-(--contrast-color) hover:border-(--contrast-color)/25 transition-all duration-150 dark:border-white/[0.07] dark:bg-white/[0.028] dark:text-white/30">
            {icon}
        </Link>
    );
};

const MemberCard = ({m}: {m: MemberType}) => (
    <div className="group rounded-2xl border border-gray-200 bg-white shadow-sm backdrop-blur-xl overflow-hidden transition-all duration-200 hover:border-indigo-200 hover:shadow-md dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-none dark:hover:border-(--contrast-color)/25">
        {/* Image */}
        <div className="relative w-full aspect-square overflow-hidden bg-black/[0.028] dark:bg-white/[0.028]">
            {m.image ? (
                <Image src={m.image} alt={m.name} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-500"/>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl font-extrabold text-black/10 dark:text-white/10">{m.name[0]}</span>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
        </div>

        {/* Info */}
        <div className="p-5">
            <p className="text-sm font-extrabold tracking-tight text-gray-900 dark:text-white">{m.name}</p>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mt-0.5 mb-3 dark:text-white/30">{m.role}</p>
            {m.bio && (
                <p className="text-xs text-gray-500 leading-relaxed mb-4 dark:text-white/35">{m.bio}</p>
            )}
            <div className="flex items-center gap-1.5">
                <SocialLink href={m.socials?.instagram} icon={<InstagramLogoIcon size={12}/>}/>
                <SocialLink href={m.socials?.tiktok} icon={<TiktokLogoIcon size={12}/>}/>
                <SocialLink href={m.socials?.facebook} icon={<FacebookLogoIcon size={12}/>}/>
            </div>
        </div>
    </div>
);

const UsPage = async () => {
    const members = await MembersGetAction();

    return (
        <div className="relative w-full min-h-screen overflow-hidden">

            {/* Background */}
            <div className="fixed -top-40 right-0 w-[700px] h-[700px] rounded-full bg-(--contrast-color)/10 blur-[140px] pointer-events-none z-0"/>
            <div className="fixed bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-pink-500/[0.06] blur-[120px] pointer-events-none z-0"/>
            <div className="fixed inset-0 pointer-events-none z-0" style={{backgroundImage:"linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",backgroundSize:"48px 48px",maskImage:"radial-gradient(ellipse 100% 100% at 50% 0%,black 40%,transparent 100%)"}}/>

            <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12 py-16">
                <Animate preset="fadeDown" duration={600}>

                    {/* Header */}
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-(--contrast-color)/10 border border-indigo-200 text-(--contrast-color) dark:border-(--contrast-color)/20">
                            <SparkleIcon size={9}/>
                            Poznaj nas
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-50 border border-indigo-200 dark:bg-(--contrast-color)/10 dark:border-(--contrast-color)/20">
                                <UsersThreeIcon size={20} className="text-(--contrast-color)"/>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                Nasz{" "}
                                <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                                    zespół
                                </span>
                            </h1>
                        </div>
                        <p className="text-sm text-gray-500 font-light leading-relaxed max-w-lg dark:text-white/35">
                            Jesteśmy grupą młodych ludzi z Tarnowa, którzy wspólnie tworzą lokalne medium. Każdy z nas wnosi coś wyjątkowego.
                        </p>
                    </div>

                    {/* Grid */}
                    {members.length === 0 ? (
                        <div className="rounded-3xl border border-gray-200 bg-white p-16 text-center text-gray-400 text-sm dark:border-white/[0.07] dark:bg-white/[0.028] dark:text-white/25">
                            Zespół jest w trakcie uzupełniania — wróć wkrótce.
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {members.map(m => <MemberCard key={m.id} m={m}/>)}
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-12 rounded-2xl border border-indigo-100 bg-(--contrast-color)/[0.03] p-8 text-center dark:border-(--contrast-color)/[0.12]">
                        <p className="text-sm text-gray-500 dark:text-white/35">
                            Chcesz dołączyć do zespołu?{" "}
                            <Link href={shortcuts.contact} className="text-(--contrast-color) hover:underline font-medium">
                                Napisz do nas
                            </Link>
                        </p>
                    </div>

                </Animate>
            </div>
        </div>
    );
};

export default UsPage;
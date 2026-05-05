import Animate from "@/shared/components/libs/animate/animate.ssr";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {projectsGet} from "@/lib/firebase/get/projects.get";
import {mediaGet} from "@/lib/firebase/get/media.get";
import Image from "next/image";
import {
  ArrowRightIcon,
  CalendarBlankIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  PhoneIncomingIcon,
  RocketLaunchIcon,
  TiktokLogoIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";

const stats = [
  {icon: <TiktokLogoIcon size={18}/>, value: "10K+", label: "TikTok", color: "text-gray-800 dark:text-white"},
  {icon: <InstagramLogoIcon size={18}/>, value: "6.5K+", label: "Instagram", color: "text-pink-500 dark:text-pink-400"},
  {icon: <FacebookLogoIcon size={18}/>, value: "2K+", label: "Facebook", color: "text-blue-500 dark:text-blue-400"},
  {icon: <CalendarBlankIcon size={18}/>, value: "20+", label: "Wydarzeń", color: "text-indigo-500 dark:text-(--contrast-color)"},
];

const Page = async () => {
  const [projects, media] = await Promise.all([projectsGet(), mediaGet()]);

  const latestProjects = projects.filter((p) => !p.private).slice(0, 3);
  const latestMedia = media.slice(0, 6);

  return (
      <div className="relative w-full flex flex-col overflow-hidden bg-transparent">

        {/* ── Background ── */}
        <div className="fixed -top-40 right-0 w-[700px] h-[700px] rounded-full bg-(--contrast-color)/10 blur-[140px] pointer-events-none z-0"/>
        <div className="fixed bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-pink-500/[0.06] blur-[120px] pointer-events-none z-0"/>
        <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
            }}
        />

        {/* ── HERO ── */}
        <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 text-center">
          <Animate preset="fadeUp" duration={800}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-(--contrast-color)/10 dark:border-(--contrast-color)/20 dark:text-(--contrast-color)/85">
              <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
              Lokalne medium młodzieżowe · Tarnów
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-4xl mx-auto
                                   text-gray-900 dark:text-white">
              Tu dzieje się{" "}
              <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                            Tarnów
                        </span>
            </h1>

            <p className="text-base sm:text-lg font-light mt-5 max-w-xl mx-auto leading-relaxed
                                  text-gray-500 dark:text-white/35">
              Tworzymy wideo, organizujemy wydarzenia i budujemy lokalną społeczność — od 2024 roku.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Link href={shortcuts.projects}>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-150 shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:opacity-90 bg-(--contrast-color)">
                  <RocketLaunchIcon size={15}/>
                  Zobacz projekty
                  <ArrowRightIcon size={13}/>
                </div>
              </Link>
              <Link href={shortcuts.contact}>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-150
                                            border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900
                                            dark:border-white/[0.10] dark:bg-white/[0.04] dark:text-white/70 dark:hover:bg-white/[0.08] dark:hover:text-white">
                  <PhoneIncomingIcon size={15}/>
                  Skontaktuj się
                </div>
              </Link>
            </div>
          </Animate>
        </section>

        {/* ── STATS ── */}
        <section className="relative z-10 px-4 sm:px-8 lg:px-12 py-12
                                border-y border-gray-100 dark:border-white/[0.05]">
          <div className="max-w-screen-xl mx-auto">
            <Animate preset="fadeDown" duration={600}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <div key={s.label} className="rounded-2xl hover:scale-[1.04] duration-700 border p-5 flex flex-col gap-2 backdrop-blur-xl
                                                               border-gray-200 bg-white shadow-sm
                                                               dark:border-white/[0.07] dark:bg-white/[0.028]">
                      <div className={`${s.color} opacity-70`}>{s.icon}</div>
                      <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.value}</span>
                      <span className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-white/60">{s.label}</span>
                    </div>
                ))}
              </div>
            </Animate>
          </div>
        </section>

        {/* ── LATEST PROJECTS ── */}
        {latestProjects.length > 0 && (
            <section className="relative z-10 px-4 sm:px-8 lg:px-12 py-16">
              <div className="max-w-screen-xl mx-auto">
                <Animate preset="fadeDown">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <div className="inline-flex hover:scale-[1.04] duration-700 items-center gap-1.5 px-3 py-1 mb-3 rounded-full text-[10px] font-semibold tracking-widest uppercase
                                                    border border-indigo-200 text-(--contrast-color)
                                                    bg-(--contrast-color)/10 dark:border-(--contrast-color)/20">
                        <RocketLaunchIcon size={9}/>
                        Projekty
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Ostatnie{" "}
                        <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                                            projekty
                                        </span>
                      </h2>
                    </div>
                    <Link href={shortcuts.projects} className="hidden sm:inline-flex items-center gap-1.5 text-xs transition-colors
                                                                           text-gray-400 hover:text-gray-700
                                                                           dark:text-white/30 dark:hover:text-white/60">
                      Wszystkie <ArrowRightIcon size={11}/>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {latestProjects.map((p) => (
                        <Link key={p.id} href={`${shortcuts.projects}/${p.id}`}>
                          <div className="group rounded-2xl border backdrop-blur-xl overflow-hidden transition-all duration-200
                                                        border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50
                                                        dark:border-white/[0.07] dark:bg-white/[0.028] dark:hover:border-(--contrast-color)/30 dark:hover:bg-(--contrast-color)/[0.04]">
                            {((p as any).images?.[0] ?? p.image) && (
                                <div className="relative w-full h-40 overflow-hidden">
                                  <Image
                                      src={(p as any).images?.[0] ?? p.image}
                                      alt={p.name}
                                      fill
                                      className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                                </div>
                            )}
                            <div className="p-5">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{p.name}</p>
                              <p className="text-xs mt-1 line-clamp-2 text-gray-500 dark:text-white/35">{p.description}</p>
                              {p.hashtags.length > 0 && (
                                  <p className="text-[10px] mt-2 truncate text-indigo-400 dark:text-(--contrast-color)/50">
                                    {p.hashtags.map(t => `#${t}`).join(" ")}
                                  </p>
                              )}
                            </div>
                          </div>
                        </Link>
                    ))}
                  </div>

                  <Link href={shortcuts.projects} className="sm:hidden mt-4 inline-flex items-center gap-1.5 text-xs transition-colors
                                                                       text-gray-400 hover:text-gray-700
                                                                       dark:text-white/30 dark:hover:text-white/60">
                    Wszystkie projekty <ArrowRightIcon size={11}/>
                  </Link>
                </Animate>
              </div>
            </section>
        )}

        {/* ── MEDIA PREVIEW ── */}
        {latestMedia.length > 0 && (
            <section className="relative z-10 px-4 sm:px-8 lg:px-12 py-16
                                    border-t border-gray-100 dark:border-white/[0.05]">
              <div className="max-w-screen-xl mx-auto">
                <Animate preset="fadeDown">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full text-[10px] font-semibold tracking-widest uppercase
                                                    bg-pink-50 border border-pink-200 text-pink-600
                                                    dark:bg-pink-500/10 dark:border-pink-500/20 dark:text-pink-400/85">
                        <InstagramLogoIcon size={9}/>
                        Galeria
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Nasze{" "}
                        <span className="bg-linear-to-br from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                            media
                                        </span>
                      </h2>
                    </div>
                    <Link href={shortcuts.media} className="hidden sm:inline-flex items-center gap-1.5 text-xs transition-colors
                                                                        text-gray-400 hover:text-gray-700
                                                                        dark:text-white/30 dark:hover:text-white/60">
                      Wszystkie <ArrowRightIcon size={11}/>
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {latestMedia.map((m) => (
                        <Link key={m.id} href={shortcuts.media}>
                          <div className="relative aspect-square rounded-xl overflow-hidden border group cursor-pointer
                                                        border-gray-200 dark:border-white/[0.07]">
                            <Image
                                src={m.image}
                                alt={m.id}
                                fill
                                className="object-cover group-hover:scale-[1.05] transition-transform duration-300"
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                                            bg-black/20 dark:bg-black/40"/>
                          </div>
                        </Link>
                    ))}
                  </div>
                </Animate>
              </div>
            </section>
        )}

        {/* ── TEAM CTA ── */}
        <section className="relative z-10 px-4 sm:px-8 lg:px-12 py-16
                                border-t border-gray-100 dark:border-white/[0.05]">
          <div className="max-w-screen-xl mx-auto">
            <Animate preset="fadeDown">
              <div className="rounded-2xl border hover:scale-[1.03] duration-700 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 backdrop-blur-xl
                                        border-gray-200 bg-white shadow-sm
                                        dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center
                                                bg-indigo-50 border border-indigo-200
                                                dark:bg-(--contrast-color)/10 dark:border-(--contrast-color)/20">
                    <UsersThreeIcon size={24} className="text-(--contrast-color)"/>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                      Poznaj nasz{" "}
                      <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                                            zespół
                                        </span>
                    </h2>
                    <p className="text-sm mt-1 max-w-md leading-relaxed text-gray-500 dark:text-white/60">
                      Jesteśmy grupą młodych ludzi z Tarnowa, którzy wspólnie tworzą lokalne medium. Poznaj nas bliżej.
                    </p>
                  </div>
                </div>
                <Link href={shortcuts.us} className="flex-shrink-0">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-150 whitespace-nowrap shadow-[0_4px_24px_rgba(99,102,241,0.3)] hover:opacity-90 bg-(--contrast-color)">
                    <UsersThreeIcon size={15}/>
                    Nasz zespół
                    <ArrowRightIcon size={13}/>
                  </div>
                </Link>
              </div>
            </Animate>
          </div>
        </section>

        {/* ── CONTACT CTA ── */}
        <section className="relative z-10 px-4 sm:px-8 lg:px-12 py-16
                                border-t border-gray-100 dark:border-white/[0.05]">
          <div className="max-w-screen-xl mx-auto">
            <Animate preset="fadeDown">
              <div className="rounded-2xl border p-8 sm:p-12 text-center backdrop-blur-xl
                                        border-indigo-100
                                        dark:border-(--contrast-color)/[0.12] bg-(--contrast-color)/[0.03]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full text-[10px] font-semibold tracking-widest uppercase
                                             border border-indigo-200
                                           bg-(--contrast-color)/10 dark:border-(--contrast-color)/20 text-(--contrast-color)/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) animate-pulse"/>
                  Współpraca
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-gray-900 dark:text-white">
                  Chcesz z nami{" "}
                  <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                                    współpracować?
                                </span>
                </h2>
                <p className="text-sm max-w-md mx-auto mb-6 leading-relaxed text-gray-500 dark:text-white/60">
                  Organizujesz wydarzenie? Chcesz pojawić się w naszym materiale? Napisz do nas — odpiszemy szybko.
                </p>
                <Link href={shortcuts.contact}>
                  <div className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-150 shadow-[0_4px_24px_rgba(99,102,241,0.3)] hover:opacity-90 bg-(--contrast-color)">
                    <PhoneIncomingIcon size={15}/>
                    Skontaktuj się
                    <ArrowRightIcon size={13}/>
                  </div>
                </Link>
              </div>
            </Animate>
          </div>
        </section>

      </div>
  );
};

export default Page;
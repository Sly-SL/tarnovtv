import {ArrowLeftIcon, FileLockIcon, SparkleIcon} from "@phosphor-icons/react/ssr";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";

const sections = [
    {
        title: "Akceptacja warunków",
        content: "Korzystając z naszego serwisu, akceptujesz niniejsze warunki użytkowania w całości. Jeśli nie zgadzasz się z którymkolwiek z zapisów, prosimy o niekorzystanie z serwisu. Warunki mogą być aktualizowane — dalsze korzystanie ze strony oznacza akceptację zmian.",
    },
    {
        title: "Zakres usług",
        content: "Serwis służy do prezentacji działalności lokalnego medium młodzieżowego z Tarnowa — w tym projektów, wydarzeń, mediów oraz informacji o zespole. Nie świadczymy usług komercyjnych za pośrednictwem serwisu bez uprzedniego kontaktu i ustalenia warunków współpracy.",
    },
    {
        title: "Własność intelektualna",
        content: "Wszelkie treści zamieszczone w serwisie — teksty, zdjęcia, grafiki, logotypy oraz materiały wideo — stanowią własność intelektualną naszego zespołu lub zostały użyte za zgodą właścicieli. Kopiowanie, reprodukowanie lub rozpowszechnianie tych materiałów bez naszej zgody jest zabronione.",
    },
    {
        title: "Odpowiedzialność",
        content: "Dokładamy wszelkich starań, aby treści w serwisie były aktualne i zgodne z rzeczywistością. Nie ponosimy jednak odpowiedzialności za ewentualne błędy, nieścisłości ani za szkody wynikłe z korzystania z serwisu lub niemożności korzystania z niego.",
    },
    {
        title: "Linki zewnętrzne",
        content: "Serwis może zawierać odnośniki do zewnętrznych stron internetowych. Nie mamy wpływu na ich treść ani politykę prywatności i nie ponosimy odpowiedzialności za ich zawartość. Zalecamy zapoznanie się z regulaminami tych serwisów przed ich użyciem.",
    },
    {
        title: "Zachowanie użytkowników",
        content: "Korzystając z serwisu, zobowiązujesz się do działania zgodnego z prawem i dobrymi obyczajami. Zabrania się podejmowania działań mogących zakłócić funkcjonowanie serwisu, naruszać prawa innych użytkowników lub osób trzecich, a także rozpowszechniać treści niezgodnych z prawem.",
    },
    {
        title: "Współpraca i kontakt",
        content: "Wszelkie propozycje współpracy, zapytania dotyczące materiałów lub inne kwestie biznesowe należy kierować przez formularz kontaktowy dostępny w serwisie. Zastrzegamy sobie prawo do odmowy współpracy bez podania przyczyny.",
    },
    {
        title: "Prawo właściwe",
        content: "Niniejsze warunki użytkowania podlegają prawu polskiemu. Wszelkie spory wynikające z korzystania z serwisu będą rozstrzygane przez sąd właściwy dla siedziby naszego zespołu.",
    },
];

const TermsPage = () => {
    return (
        <div className="relative min-h-screen px-4 py-16 overflow-hidden">

            {/* Background */}
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

            <div className="relative z-10 max-w-3xl mx-auto">
                <Animate preset="fadeUp" duration={600}>

                    {/* Back */}
                    <Link
                        href={shortcuts.home}
                        className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-gray-700 transition-colors mb-8 dark:text-white/30 dark:hover:text-white/60"
                    >
                        <ArrowLeftIcon size={12}/>
                        Strona główna
                    </Link>

                    {/* Header */}
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-(--contrast-color)/10 border border-indigo-200 text-(--contrast-color) dark:border-(--contrast-color)/20">
                            <SparkleIcon size={9}/>
                            Dokument prawny
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-50 border border-indigo-200 dark:bg-(--contrast-color)/10 dark:border-(--contrast-color)/20">
                                <FileLockIcon size={20} className="text-(--contrast-color)"/>
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                Warunki użytkowania
                            </h1>
                        </div>
                        <p className="text-sm text-gray-500 font-light leading-relaxed dark:text-white/35">
                            Prosimy o uważne zapoznanie się z poniższymi warunkami przed skorzystaniem z naszego serwisu.
                        </p>
                        <p className="text-[11px] text-gray-400 mt-2 dark:text-white/20">
                            Ostatnia aktualizacja: maj 2025
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="flex flex-col gap-3">
                        {sections.map((s, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 backdrop-blur-xl transition-all duration-200 hover:border-indigo-200 dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-none dark:hover:border-(--contrast-color)/25"
                            >
                                <div className="flex items-center gap-2.5 mb-3">
                                    <span className="w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold bg-(--contrast-color)/10 text-(--contrast-color) shrink-0">
                                        {i + 1}
                                    </span>
                                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{s.title}</h2>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed dark:text-white/40">{s.content}</p>
                            </div>
                        ))}
                    </div>

                    {/* Footer note */}
                    <div className="mt-8 rounded-2xl border border-indigo-100 bg-(--contrast-color)/[0.03] p-6 text-center dark:border-(--contrast-color)/[0.12]">
                        <p className="text-sm text-gray-500 dark:text-white/35">
                            Pytania dotyczące warunków?{" "}
                            <Link href={shortcuts.contact} className="text-(--contrast-color) hover:underline font-medium">
                                Napisz do nas
                            </Link>
                            {" "}— postaramy się wyjaśnić wszelkie wątpliwości.
                        </p>
                    </div>

                </Animate>
            </div>
        </div>
    );
};

export default TermsPage;
import {ArrowLeftIcon, ShieldCheckIcon, SparkleIcon} from "@phosphor-icons/react/ssr";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";

const sections = [
    {
        title: "Jakie dane zbieramy?",
        content: "Zbieramy dane, które dobrowolnie nam przekazujesz — na przykład imię, adres e-mail lub inne informacje podane w formularzu kontaktowym. Automatycznie możemy gromadzić anonimowe dane analityczne, takie jak typ przeglądarki, kraj odwiedzin czy czas spędzony na stronie.",
    },
    {
        title: "W jakim celu?",
        content: "Twoje dane wykorzystujemy wyłącznie w celu odpowiedzi na Twoje zapytania, realizacji współpracy oraz ulepszania działania naszego serwisu. Nie sprzedajemy, nie wynajmujemy ani nie udostępniamy Twoich danych osobom trzecim w celach marketingowych.",
    },
    {
        title: "Pliki cookie",
        content: "Nasza strona może używać plików cookie do zapewnienia prawidłowego działania serwisu oraz zbierania anonimowych statystyk. Możesz wyłączyć obsługę cookie w ustawieniach swojej przeglądarki — nie wpłynie to na korzystanie z podstawowych funkcji strony.",
    },
    {
        title: "Przechowywanie danych",
        content: "Dane przechowujemy tak długo, jak jest to niezbędne do realizacji celów opisanych w tej polityce, lub do momentu gdy poprosisz o ich usunięcie. Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane przed nieuprawnionym dostępem.",
    },
    {
        title: "Twoje prawa",
        content: "Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia oraz przeniesienia. Możesz również wnieść sprzeciw wobec przetwarzania. Aby skorzystać z tych praw, skontaktuj się z nami przez formularz kontaktowy lub bezpośrednio e-mailem.",
    },
    {
        title: "Usługi zewnętrzne",
        content: "Możemy korzystać z zewnętrznych narzędzi analitycznych (np. Google Analytics) lub platform społecznościowych. Usługi te mają własne polityki prywatności i mogą zbierać dane zgodnie ze swoimi regulaminami, na co nie mamy bezpośredniego wpływu.",
    },
    {
        title: "Zmiany polityki",
        content: "Zastrzegamy sobie prawo do aktualizacji niniejszej polityki prywatności. O istotnych zmianach będziemy informować poprzez zamieszczenie nowej wersji na tej stronie wraz z datą ostatniej aktualizacji.",
    },
    {
        title: "Kontakt",
        content: "Jeśli masz pytania dotyczące ochrony danych osobowych lub chcesz skorzystać ze swoich praw, skontaktuj się z nami przez stronę kontaktową. Odpowiemy tak szybko, jak to możliwe.",
    },
];

const PrivacyPolicyPage = () => {
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
                                <ShieldCheckIcon size={20} className="text-(--contrast-color)"/>
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                Polityka prywatności
                            </h1>
                        </div>
                        <p className="text-sm text-gray-500 font-light leading-relaxed dark:text-white/35">
                            Szanujemy Twoją prywatność. Poniżej opisujemy, jakie dane zbieramy, w jakim celu oraz jak je chronimy.
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
                            Masz pytania?{" "}
                            <Link href={shortcuts.contact} className="text-(--contrast-color) hover:underline font-medium">
                                Skontaktuj się z nami
                            </Link>
                            {" "}— odpowiemy tak szybko, jak to możliwe.
                        </p>
                    </div>

                </Animate>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
import {Html} from "@react-email/html";
import {Body, Head, Heading, Img, Link, Preview, Section, Tailwind, Text} from "@react-email/components";
import {CONSTANTS} from "@/shared/consts/consts.consts";

export function WelcomeTemplate({name}:{name: string}) {
    return (
        <Html>
            <Head />
            <Preview>Witaj na pokładzie — cieszymy się, że jesteś!</Preview>
            <Tailwind>
                <Body className="max-w-xl mx-auto bg-[#0a0a0f] font-sans">

                    {/* Header */}
                    <Section className="px-8 pt-10 pb-6 text-center">
                        <Img
                            src={`${CONSTANTS.FRONTEND_DOMEN}/assets/logo.svg`}
                            width="48"
                            height="48"
                            alt="Logo"
                            className="mx-auto mb-6 rounded-xl"
                        />
                        <Heading className="text-2xl font-extrabold text-white tracking-tight m-0 p-0">
                            Witaj, {name}!
                        </Heading>
                        <Text className="text-sm text-[#ffffff55] mt-2 mb-0">
                            Twoje konto zostało pomyślnie utworzone.
                        </Text>
                    </Section>

                    {/* Card */}
                    <Section className="mx-6 rounded-2xl border border-[#ffffff12] bg-[#ffffff05] px-8 py-8">
                        <Text className="text-sm text-[#ffffff60] leading-relaxed mt-0 mb-6">
                            Cieszymy się, że dołączyłeś/-aś do nas. Twoje konto jest już aktywne —
                            możesz w pełni korzystać ze wszystkich funkcji platformy.
                        </Text>

                        <Section className="text-center">
                            <Link
                                href={CONSTANTS.FRONTEND_DOMEN}
                                className="inline-block rounded-xl bg-indigo-500 text-white text-sm font-semibold px-8 py-3 no-underline tracking-wide"
                            >
                                Przejdź do platformy →
                            </Link>
                        </Section>
                    </Section>

                    {/* Info block */}
                    <Section className="mx-6 mt-3 rounded-xl border border-[#818cf822] bg-[#818cf808] px-6 py-4">
                        <Text className="text-xs text-[#818cf899] m-0 leading-relaxed">
                            Jeśli nie zakładałeś/-aś tego konta, skontaktuj się z nami niezwłocznie.
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section className="px-8 py-8 text-center">
                        <Text className="text-xs text-[#ffffff25] m-0">
                            Masz pytania? Napisz do nas:{" "}
                            <Link
                                href={`mailto:${CONSTANTS.MAIL.login}`}
                                className="text-indigo-400 underline"
                            >
                                {CONSTANTS.MAIL.login}
                            </Link>
                        </Text>
                        <Text className="text-xs text-[#ffffff15] mt-2 mb-0">
                            {CONSTANTS.FRONTEND_DOMEN}
                        </Text>
                    </Section>

                </Body>
            </Tailwind>
        </Html>
    );
}
import {Html} from "@react-email/html";
import {Body, Head, Heading, Link, Preview, Section, Tailwind, Text} from "@react-email/components";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import type {UserType} from "@/shared/types/domen/user.type";

export function Off2FATemplate(user: UserType) {
    return (
        <Html>
            <Head />
            <Preview>Weryfikacja dwuetapowa została wyłączona</Preview>
            <Tailwind>
                <Body className="max-w-xl mx-auto bg-[#0a0a0f] font-sans">

                    <Section className="px-8 pt-10 pb-6 text-center">
                        <Heading className="text-2xl font-extrabold text-white tracking-tight m-0 p-0">
                            2FA wyłączone
                        </Heading>
                        <Text className="text-sm text-[#ffffff55] mt-2 mb-0">
                            Cześć, {user.name} — weryfikacja dwuetapowa została dezaktywowana.
                        </Text>
                    </Section>

                    <Section className="mx-6 rounded-2xl border border-[#ffffff12] bg-[#ffffff05] px-8 py-8">
                        <Text className="text-sm text-[#ffffff60] leading-relaxed mt-0 mb-6">
                            Weryfikacja dwuetapowa (2FA) została wyłączona na Twoim koncie.
                            Od teraz logowanie wymaga jedynie hasła — bez dodatkowego potwierdzenia.
                        </Text>

                        <Text className="text-xs text-[#ffffff35] uppercase tracking-widest m-0 mb-4">
                            Co się zmieniło
                        </Text>

                        <Text className="text-sm text-[#ffffff60] m-0 mb-2 leading-relaxed">
                            ✗ Logowanie nie wymaga już drugiego kroku weryfikacji
                        </Text>
                        <Text className="text-sm text-[#ffffff60] m-0 mb-2 leading-relaxed">
                            ✗ Konto jest mniej chronione w przypadku wycieku hasła
                        </Text>
                        <Text className="text-sm text-[#ffffff60] m-0 mb-0 leading-relaxed">
                            → Możesz ponownie włączyć 2FA w ustawieniach konta
                        </Text>
                    </Section>

                    <Section className="mx-6 mt-3 rounded-xl border border-[#ef444422] bg-[#ef444408] px-6 py-4">
                        <Text className="text-xs text-[#ef444499] m-0 leading-relaxed">
                            Jeśli to nie Ty wyłączyłeś weryfikację dwuetapową, natychmiast zmień hasło
                            i skontaktuj się z nami — ktoś mógł uzyskać nieautoryzowany dostęp do Twojego konta.
                        </Text>
                    </Section>

                    <Section className="px-8 py-8 text-center">
                        <Text className="text-xs text-[#ffffff25] m-0">
                            Masz pytania? Napisz do nas:{" "}
                            <Link href={`mailto:${CONSTANTS.MAIL.login}`} className="text-indigo-400 underline">
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
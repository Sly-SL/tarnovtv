import {Html} from "@react-email/html";
import {Body, Head, Heading, Link, Preview, Section, Tailwind, Text} from "@react-email/components";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import type {UserType} from "@/shared/types/domen/user.type";

export function On2FATemplate(user: UserType) {
    return (
        <Html>
            <Head />
            <Preview>Weryfikacja dwuetapowa została włączona</Preview>
            <Tailwind>
                <Body className="max-w-xl mx-auto bg-[#0a0a0f] font-sans">

                    <Section className="px-8 pt-10 pb-6 text-center">
                        <Heading className="text-2xl font-extrabold text-white tracking-tight m-0 p-0">
                            2FA włączone
                        </Heading>
                        <Text className="text-sm text-[#ffffff55] mt-2 mb-0">
                            Cześć, {user.name} — Twoje konto jest teraz lepiej chronione.
                        </Text>
                    </Section>

                    <Section className="mx-6 rounded-2xl border border-[#ffffff12] bg-[#ffffff05] px-8 py-8">
                        <Text className="text-sm text-[#ffffff60] leading-relaxed mt-0 mb-6">
                            Weryfikacja dwuetapowa (2FA) została pomyślnie włączona na Twoim koncie.
                            Od teraz przy każdym logowaniu będziesz proszony o dodatkowe potwierdzenie tożsamości.
                        </Text>

                        <Text className="text-xs text-[#ffffff35] uppercase tracking-widest m-0 mb-4">
                            Co się zmieniło
                        </Text>

                        <Text className="text-sm text-[#ffffff60] m-0 mb-2 leading-relaxed">
                            ✓ Logowanie wymaga teraz dwóch kroków weryfikacji
                        </Text>
                        <Text className="text-sm text-[#ffffff60] m-0 mb-2 leading-relaxed">
                            ✓ Twoje konto jest chronione nawet jeśli hasło wycieknie
                        </Text>
                        <Text className="text-sm text-[#ffffff60] m-0 mb-0 leading-relaxed">
                            ✓ Możesz wyłączyć 2FA w ustawieniach konta w dowolnym momencie
                        </Text>
                    </Section>

                    <Section className="mx-6 mt-3 rounded-xl border border-[#f59e0b22] bg-[#f59e0b08] px-6 py-4">
                        <Text className="text-xs text-[#f59e0b99] m-0 leading-relaxed">
                            Jeśli to nie Ty włączyłeś weryfikację dwuetapową, natychmiast zmień hasło
                            i skontaktuj się z nami.
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
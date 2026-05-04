import { Html } from "@react-email/html";
import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import { shortcuts } from "@/shared/consts/enums/shortcuts.enum";
import { CONSTANTS } from "@/shared/consts/consts.consts";

interface ChangePasswordTemplateProps {
    domain: string;
    token: string;
}

export function ChangePasswordTemplate({ domain, token }: ChangePasswordTemplateProps) {
    const changePasswordLink = `${domain}${shortcuts["change-password"]}/${token}`;

    return (
        <Html>
            <Head />
            <Preview>Resetowanie hasła — link ważny 24 godziny</Preview>
            <Tailwind>
                <Body className="max-w-xl mx-auto bg-[#0a0a0f] font-sans">

                    {/* Header */}
                    <Section className="px-8 pt-10 pb-6 text-center">
                        <Heading className="text-2xl font-extrabold text-white tracking-tight m-0 p-0">
                            Zmiana hasła
                        </Heading>
                        <Text className="text-sm text-[#ffffff55] mt-2 mb-0">
                            Otrzymaliśmy prośbę o reset hasła dla Twojego konta.
                        </Text>
                    </Section>

                    {/* Card */}
                    <Section className="mx-6 rounded-2xl border border-[#ffffff12] bg-[#ffffff05] px-8 py-8">
                        <Text className="text-sm text-[#ffffff60] leading-relaxed mt-0">
                            Kliknij poniższy przycisk, aby ustawić nowe hasło. Link jest jednorazowy
                            i wygaśnie po 24 godzinach.
                        </Text>

                        {/* CTA */}
                        <Section className="text-center my-6">
                            <Link
                                href={changePasswordLink}
                                className="inline-block rounded-xl bg-indigo-500 text-white text-sm font-semibold px-8 py-3 no-underline tracking-wide"
                            >
                                Ustaw nowe hasło →
                            </Link>
                        </Section>

                        <Text className="text-xs text-[#ffffff30] leading-relaxed mb-0 mt-4">
                            Jeśli przycisk nie działa, skopiuj i wklej ten link do przeglądarki:
                        </Text>
                        <Text className="text-xs text-indigo-400 break-all mt-1 mb-0">
                            {changePasswordLink}
                        </Text>
                    </Section>

                    {/* Warning */}
                    <Section className="mx-6 mt-3 rounded-xl border border-[#f59e0b22] bg-[#f59e0b08] px-6 py-4">
                        <Text className="text-xs text-[#f59e0b99] m-0 leading-relaxed">
                            Jeśli nie prosiłeś/-aś o zmianę hasła, zignoruj tę wiadomość.
                            Twoje hasło pozostanie bez zmian.
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
                            {domain}
                        </Text>
                    </Section>

                </Body>
            </Tailwind>
        </Html>
    );
}
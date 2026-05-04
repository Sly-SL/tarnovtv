import {Html} from "@react-email/html";
import {Body, Head, Heading, Img, Link, Preview, Section, Tailwind, Text} from "@react-email/components";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import type {UserType} from "@/shared/types/domen/user.type";

export function EmailVerificationTemplate({ token, user }: { token: string; user: UserType }) {
    const verificationLink = `${CONSTANTS.FRONTEND_DOMEN}${shortcuts.verify}/${token}`;

    return (
        <Html>
            <Head />
            <Preview>Potwierdź swój adres e-mail — {CONSTANTS.FRONTEND_DOMEN}</Preview>
            <Tailwind>
                <Body className="max-w-xl mx-auto bg-[#0a0a0f] font-sans">

                    <Section className="px-8 pt-10 pb-6 text-center">
                        <Img
                            src={`${CONSTANTS.FRONTEND_DOMEN}/assets/logo.svg`}
                            width="48"
                            height="48"
                            alt="Logo"
                            className="mx-auto mb-6 rounded-xl"
                        />
                        <Heading className="text-2xl font-extrabold text-white tracking-tight m-0 p-0">
                            Potwierdź adres e-mail
                        </Heading>
                        <Text className="text-sm text-[#ffffff55] mt-2 mb-0">
                            Cześć, {user.name} — zostało tylko jedno kliknięcie.
                        </Text>
                    </Section>

                    <Section className="mx-6 rounded-2xl border border-[#ffffff12] bg-[#ffffff05] px-8 py-8">
                        <Text className="text-sm text-[#ffffff60] leading-relaxed mt-0">
                            Otrzymaliśmy prośbę o weryfikację tego adresu e-mail dla Twojego konta.
                            Kliknij przycisk poniżej, aby potwierdzić, że to Ty.
                        </Text>

                        <Section className="text-center my-6">
                            <Link
                                href={verificationLink}
                                className="inline-block rounded-xl bg-indigo-500 text-white text-sm font-semibold px-8 py-3 no-underline tracking-wide"
                            >
                                Potwierdź adres e-mail →
                            </Link>
                        </Section>

                        <Text className="text-xs text-[#ffffff30] leading-relaxed mb-0 mt-4">
                            Jeśli przycisk nie działa, skopiuj i wklej ten link do przeglądarki:
                        </Text>
                        <Text className="text-xs text-indigo-400 break-all mt-1 mb-0">
                            {verificationLink}
                        </Text>
                    </Section>

                    <Section className="mx-6 mt-3 rounded-xl border border-[#f59e0b22] bg-[#f59e0b08] px-6 py-4">
                        <Text className="text-xs text-[#f59e0b99] m-0 leading-relaxed">
                            Jeśli nie zakładałeś konta, zignoruj tę wiadomość. Link wygaśnie po 24 godzinach.
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
import {Html} from "@react-email/html";
import {Body, Head, Heading, Img, Link, Preview, Section, Tailwind, Text} from "@react-email/components";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import type {UserType} from "@/shared/types/domen/user.type";

export function StrangeActivityTemplate({user,token}:{user: UserType, token: string}) {
    const changePasswordLink = `${CONSTANTS.FRONTEND_DOMEN}${shortcuts.admin}${shortcuts.change}/${token}`;

    return (
        <Html>
            <Head />
            <Preview>Wykryto podejrzaną aktywność na Twoim koncie</Preview>
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
                            Wykryto podejrzaną aktywność
                        </Heading>
                        <Text className="text-sm text-[#ffffff55] mt-2 mb-0">
                            Cześć, <Text className="text-white font-medium">{user.name}</Text> — zauważyliśmy coś niepokojącego.
                        </Text>
                    </Section>

                    {/* Card */}
                    <Section className="mx-6 rounded-2xl border border-[#ffffff12] bg-[#ffffff05] px-8 py-8">
                        <Text className="text-sm text-[#ffffff60] leading-relaxed mt-0">
                            Na Twoim koncie wykryliśmy podejrzaną aktywność — możliwe, że ktoś próbował uzyskać nieautoryzowany dostęp.
                            Jeśli to nie Ty, natychmiast zmień hasło klikając poniższy przycisk.
                        </Text>

                        {/* CTA */}
                        <Section className="text-center my-6">
                            <Link
                                href={changePasswordLink}
                                className="inline-block rounded-xl bg-red-500 text-white text-sm font-semibold px-8 py-3 no-underline tracking-wide"
                            >
                                Zmień hasło →
                            </Link>
                        </Section>

                        <Text className="text-xs text-[#ffffff30] leading-relaxed mb-0 mt-4">
                            Jeśli przycisk nie działa, skopiuj i wklej ten link do przeglądarki:
                        </Text>
                        <Text className="text-xs text-red-400 break-all mt-1 mb-0">
                            {changePasswordLink}
                        </Text>
                    </Section>

                    {/* Warning */}
                    <Section className="mx-6 mt-3 rounded-xl border border-[#ef444422] bg-[#ef444408] px-6 py-4">
                        <Text className="text-xs text-[#ef444499] m-0 leading-relaxed">
                            Jeśli to Ty logowałeś/-aś się na konto, możesz zignorować tę wiadomość. Link wygaśnie po 24 godzinach.
                            W razie wątpliwości skontaktuj się z nami.
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section className="px-8 py-8 text-center">
                        <Text className="text-xs text-[#ffffff25] m-0">
                            Masz pytania? Napisz do nas:{" "}
                            <Link
                                href={`mailto:${CONSTANTS.MAIL.login}`}
                                className="text-red-400 underline"
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
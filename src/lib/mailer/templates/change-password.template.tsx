import {Html} from "@react-email/html";
import {Body, Head, Heading, Link, Preview, Section, Tailwind, Text,} from "@react-email/components";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {CONSTANTS} from "@/shared/consts/consts.consts";

interface VerificationTemplateProps {
    domain: string;
    token: string;
}
export function ChangeTemplate({
                                         domain,
                                         token,
                                     }: VerificationTemplateProps) {
    const verificationLink = `${domain}${shortcuts.admin}${shortcuts.change}/${token}`;
    return (
        <Html>
            <Head />
            <Preview>Email Verification</Preview>
            <Tailwind>
                <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
                    <Section className="text-center mb-8">
                        <Heading className="text-3xl text-black font-bold">
                            Change Password
                        </Heading>
                        <Text className="text-base text-black">
                            Thanks about using us service, for change password enter this link
                        </Text>
                        <Link
                            className="justify-center items-center inline-flex rounded-full text-sm font-medium text-white bg-[#18B9AE] px-5 py-2"
                            href={verificationLink}
                        >
                            {" "}
                            Change Password{" "}
                        </Link>
                    </Section>
                    <Section className="text-center mt-8">
                        <Text className="text-gray-600">
                            If you gets any problem with us shop don&apos;t worry, you always
                            can contact us {""}
                            <Link
                                href={`mailto:${CONSTANTS.MAIL.login}`}
                                className="text-[#18b9ae] underline"
                            >
                                {CONSTANTS.MAIL.login}
                            </Link>
                        </Text>
                    </Section>
                </Body>
            </Tailwind>
        </Html>
    );
}

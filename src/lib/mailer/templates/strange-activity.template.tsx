import {Html} from "@react-email/html";
import {Body, Head, Heading, Img, Link, Preview, Section, Tailwind, Text} from "@react-email/components";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import {UserRecord} from "@/shared/types/user.type";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";

export function StrangeActivityTemplate(user:UserRecord) {
    const verificationLink = `${CONSTANTS.FRONTEND_DOMEN}${shortcuts.admin}${shortcuts.change}/${(user.token)}`;

    return (
        <Html>
            <Head />
            <Preview>StrangeActivity</Preview>
            <Tailwind>
                <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
                    <Section className="text-center mb-8 justify-center">
                        <Heading className="text-3xl text-black font-bold">
                            Hello {user.name}!
                        </Heading>
                        <Img
                            src={`${CONSTANTS.FRONTEND_DOMEN}/assets/slysl.svg`}
                            className="rounded-[12px] my-0 mx-auto"
                            width="120"
                            height="120"
                            alt="Logo"
                        />
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

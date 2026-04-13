import {Html} from "@react-email/html";
import {Body, Head, Heading, Img, Link, Preview, Section, Tailwind, Text} from "@react-email/components";
import {CONSTANTS} from "@/shared/consts/consts.consts";

export function WelcomeTemplate(name:string) {
    return (
        <Html>
            <Head />
            <Preview>Welcome</Preview>
            <Tailwind>
                <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
                    <Section className="text-center mb-8 justify-center">
                        <Heading className="text-3xl text-black font-bold">
                            Hello {name}!
                        </Heading>
                        <Img
                            src={`${CONSTANTS.FRONTEND_DOMEN}/assets/slysl.svg`}
                            className="rounded-[12px] my-0 mx-auto"
                            width="120"
                            height="120"
                            alt="Logo"
                        />                        <Text className="text-base text-black">
                            Thanks about using us service
                        </Text>
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

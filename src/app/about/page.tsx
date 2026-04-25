import LiquidGlassCustom from "@/shared/components/custom/liquid-glass.custom";
import {BasicH1} from "@/shared/components/libs/basic/text/h1.text";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import {BasicP} from "@/shared/components/libs/basic/text/p.text";
import {BasicH2} from "@/shared/components/libs/basic/text/h2.text";

const Page = () => {
    return (
        <div className={"p-2"}>
            <Animate preset={"fadeDown"}>
                <LiquidGlassCustom>
                    <BasicH1 className={"text-(--contrast-color) text-center md:text-left"}>
                        Nasza historia
                    </BasicH1>
                </LiquidGlassCustom>
            </Animate>

            <section className={"grid grid-cols-1 gap-4 md:gap-6"}>

                {/* BLOK 1 */}
                <section className={"flex flex-col md:flex-row gap-4 pt-2"}>
                    <Animate preset={"fadeLeft"} duration={1100}>
                        <LiquidGlassCustom>
                            <BasicP>
                                Wszystko zaczęło się w lipcu <span className={"text-(--contrast-color) font-bold"}>2024 roku</span>, podczas warsztatów psychologicznych w fundacji <span className={"text-(--contrast-color) font-bold"}>Bema 20 w Tarnowie</span>. To właśnie tam narodził się pomysł stworzenia czegoś więcej niż tylko szkolnych wywiadów i krótkich nagrań. Chcieliśmy wyjść poza schemat i zacząć tworzyć materiał, który będzie angażował mieszkańców całego miasta – od luźnych ulicznych rozmów, po pytania, które budują lokalną tożsamość i pokazują codzienność Tarnowa z nieoczywistej strony.
                            </BasicP>
                        </LiquidGlassCustom>
                    </Animate>

                    <Animate preset={"fadeRight"} duration={1100}>
                        <LiquidGlassCustom>
                            <BasicP>
                                Od samego początku naszym celem nie było jedynie nagrywanie filmów. Chcieliśmy zbudować społeczność – aktywną, zaangażowaną i gotową do wspólnego działania. Wtorki i soboty miały stać się dniami premier, ale równie ważne było dla nas tworzenie przestrzeni, w której ludzie mogą się spotykać, wymieniać doświadczeniami i razem uczestniczyć w wydarzeniach organizowanych w Tarnowie.
                            </BasicP>
                        </LiquidGlassCustom>
                    </Animate>
                </section>

                {/* BLOK 2 */}
                <section className={"flex flex-col md:flex-row gap-4 pt-2"}>
                    <Animate preset={"fadeLeft"} duration={1100}>
                        <LiquidGlassCustom>
                            <BasicP>
                                Z czasem nasze działania zaczęły wychodzić daleko poza internet. Organizowaliśmy wydarzenia takie jak charytatywne turnieje e-sportowe (<span className={"text-(--contrast-color) font-bold"}>zebraliśmy m.in. 2000 zł na pomoc dla zwierząt oraz 600 zł na wsparcie dzieci</span>), wieczory planszówkowe, targi ubraniowe, debaty oksfordzkie oraz wykłady maturalne. Każde z tych wydarzeń miało jeden wspólny cel – łączenie ludzi i tworzenie realnej wartości dla lokalnej społeczności.
                            </BasicP>
                        </LiquidGlassCustom>
                    </Animate>

                    <Animate preset={"fadeRight"} duration={1100}>
                        <LiquidGlassCustom>
                            <BasicP>
                                Początki były skromne – kilku znajomych, prosta kamera i dużo entuzjazmu. Z czasem jednak struktura projektu zaczęła się zmieniać. Tworzyliśmy zespół, w którym każdy miał swoją rolę – od prowadzenia materiałów, przez organizację, aż po montaż.
                            </BasicP>
                        </LiquidGlassCustom>
                    </Animate>
                </section>

                {/* BLOK 3 */}
                <section className={"flex flex-col md:flex-row gap-4 pt-2"}>
                    <Animate preset={"fadeLeft"} duration={1100}>
                        <LiquidGlassCustom>
                            <BasicP>
                                Dziś Tarnów TV to projekt, który z małej inicjatywy młodzieżowej przekształcił się w rozpoznawalne medium lokalne. Nasze treści docierają do tysięcy odbiorców – blisko <span className={"text-(--contrast-color) font-bold"}>10 tysięcy</span> obserwujących na TikToku, <span className={"text-(--contrast-color) font-bold"}>ponad 6,5 tysiąca</span> na Instagramie oraz 2 tysiące na Facebooku.
                            </BasicP>
                        </LiquidGlassCustom>
                    </Animate>

                    <Animate preset={"fadeRight"} duration={1100}>
                        <LiquidGlassCustom>
                            <BasicP>
                                Wraz z rozwojem skali i jakości naszych działań, Tarnów TV zaczęło przyjmować bardziej profesjonalny charakter. Dziś funkcjonujemy nie tylko jako projekt społeczny, ale również jako rosnąca inicjatywa medialna.
                            </BasicP>
                        </LiquidGlassCustom>
                    </Animate>
                </section>

                {/* FINAŁ */}
                <section className={"pt-4 text-center md:text-left"}>
                    <Animate preset={"fadeLeft"} duration={1100}>
                        <BasicH2 className={"text-(--contrast-color)"}>
                            Tarnów TV to historia, która nadal się pisze – razem z Wami.
                        </BasicH2>
                    </Animate>
                </section>

            </section>
        </div>
    );
};

export default Page;
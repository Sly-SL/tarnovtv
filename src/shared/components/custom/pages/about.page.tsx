import {StatCard} from "@/shared/components/custom/stats-card.custom";
import {GlobeIcon} from "@phosphor-icons/react/dist/ssr";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import {GoogleMaps} from "@/shared/components/custom/google-maps.custom";
import ContactCustom from "@/shared/components/custom/pages/contact.custom";

export const dynamic = "force-static"

const AboutPage = () => {

    const startDate = new Date("2024-08-11");
    const today = new Date();
    const YearExperience =
        today.getFullYear() - startDate.getFullYear() -
        (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);


    function getYearWord(n:number) {
        if (n === 1) return "rok";

        const lastDigit = n % 10;
        const lastTwoDigits = n % 100;

        if (
            lastDigit >= 2 &&
            lastDigit <= 4 &&
            !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
        ) {
            return "lata";
        }

        return "lat";
    }

    const value = `${YearExperience} ${getYearWord(YearExperience)}`;

    const statsData = [
        {
            icon: GlobeIcon,
            color: "from-white/20 to-gray-200/20",
            value: value,
            label: "Jesteśmy z wami już",
            description: "Stabilność to podstawa!",
        },
    ];

    return (
        <section
            className="h-auto pb-[10%] text-white overflow-hidden sm:px-[5%] mt-10 sm-mt-0"
            id="About"
        >
            <div className="grid lg:grid-cols-2 gap-8 justify-center items-center">
                <Animate preset={"fadeRight"}>
                    <GoogleMaps />
                </Animate>


                <div className={"grid grid-rows-2 items-center"}>
                    <div>
                        <Animate preset={"fadeDown"}>
                            <h1 className={"font-bold text-2xl pt-5 text-black dark:text-white"}>TarnovTV</h1>
                        </Animate>

                        <div
                            className="grid grid-cols-1 pt-8 grid-rows-1 gap-3 cursor-pointer"
                        >
                            {statsData.map((stat,i) => (
                                <Animate preset={i % 4 == 1 ? "fadeRight" : i % 4 == 2 ?  "fadeDown": i % 4 == 3 ? "fadeUp" : "fadeLeft"} key={i}>
                                    <StatCard key={stat.label} {...stat} />
                                </Animate>
                            ))}
                        </div>
                    </div>
                    <ContactCustom/>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
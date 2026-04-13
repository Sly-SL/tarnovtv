import {SparkleIcon} from "@phosphor-icons/react/ssr";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const AboutHeader = () => {
    return (
        <div className="text-center lg:mb-4 mb-2 px-[5%] pt-8">
            <div className="inline-block relative group">
                <Animate preset={"zoomIn"} duration={1600}>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
                    >
                        O mnie
                    </h2>
                </Animate>
            </div>
            <Animate
                preset={"zoomIn"}
                duration={800}>
                <p
                    className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
                    data-aos="zoom-in-up"
                >
                    <SparkleIcon className="w-5 h-5 text-purple-400" />
                    Zmieniam pomysły w rzeczywistość
                    <SparkleIcon className="w-5 h-5 text-purple-400" />
                </p>
            </Animate>
        </div>
    );
};

export default AboutHeader;
import {TechStacksEnum} from "@/shared/consts/enums/tech-stack.enum";
import TechStackBody from "@/shared/components/custom/body/projects/tech.body";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const TechTabs = () => {
    return (
        <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {TechStacksEnum.map((stack, index) => (
                    <Animate
                        key={index}
                        preset={
                            index % 3 === 0
                                ? "fadeRight"
                                : index % 3 === 1
                                    ? "fadeUp"
                                    : "fadeLeft"
                        }
                        duration={index % 3 === 0 ? 1000 : index % 3 === 1 ? 1200 : 1000}
                    >
                        <TechStackBody TechStackIcon={stack.icon} Language={stack.language} />
                    </Animate>
                ))}
            </div>
        </div>
    );
};

export default TechTabs;
import Link from "next/link";
import SubdivConstructor from "@/shared/components/custom/header/subdivs/subdiv-constructor.subdiv";
import {projectsGet} from "@/lib/firebase/get/projects.get";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const ProjectsSubdiv = async () => {
    const projects = await projectsGet()
    return (
        <SubdivConstructor id={"projects"}>
            <div className={"grid grid-cols-3 items-start justify-center gap-18"}>
                {projects.map((item, i) => (
                    <Animate preset={i % 4 == 1 ? "fadeRight" : i % 4 == 2 ?  "fadeDown": i % 4 == 3 ? "fadeUp" : "fadeLeft"} key={i}>
                        <Link className={"text-black/90 hover:text-black dark:text-white/90  dark:hover:text-white text-3xl hover:scale-105 duration-500 font-medium"} href={shortcuts.projects + "/" + item.id} key={i}>
                            {item.name}
                        </Link>
                    </Animate>
                ))}
            </div>
        </SubdivConstructor>
    );
};

export default ProjectsSubdiv;
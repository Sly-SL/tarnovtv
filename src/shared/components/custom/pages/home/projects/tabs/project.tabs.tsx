import ProjectBody from "@/shared/components/custom/body/projects/project.body";
import {getProjectsQuery} from "@/lib/firebase/queries/get-projects.query";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import {ToggleButtonProjects} from "@/shared/components/custom/pages/home/projects/toggle-show.projects";

const ProjectTabs = async () => {

    const projects = await getProjectsQuery()
    return (
        <div>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
                <div id={"projects-mobile-show-less"} className="grid grid-cols-1 md:hidden gap-5">
                    {projects.slice(0,4).map((project, index) => (
                        <Animate
                            preset={index % 3 === 0 ? "fadeRight"
                            : index % 3 === 1 ? "fadeUp" : "fadeLeft"}
                            duration={index % 3 === 0 ? 1000 : index % 3 === 1 ? 1200 : 1000}
                            key={project.id || index}>
                                <ProjectBody
                                    Img={project.image}
                                    Title={project.name}
                                    Description={project.description}
                                    Link={project.deployment_url}
                                    id={project.id}
                                />
                        </Animate>
                    ))}
                </div>
                <div id={"projects-desktop-show-less"}
                    className="md:grid hidden md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                    {projects.slice(0,6).map((project, index) => (
                        <Animate
                            preset={index % 3 === 0 ? "fadeRight"
                                : index % 3 === 1 ? "fadeUp" : "fadeLeft"}
                            duration={index % 3 === 0 ? 1000 : index % 3 === 1 ? 1200 : 1000}
                            key={project.id || index}>
                            <ProjectBody
                                Img={project.image}
                                Title={project.name}
                                Description={project.description}
                                Link={project.deployment_url}
                                id={project.id}
                            />
                        </Animate>
                    ))}
                </div>
                <div id={"projects-show-more"}
                    className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                    {projects.map((project, index) => (
                        <Animate
                            preset={index % 3 === 0 ? "fadeRight"
                                : index % 3 === 1 ? "fadeUp" : "fadeLeft"}
                            duration={index % 3 === 0 ? 1000 : index % 3 === 1 ? 1200 : 1000}
                            key={project.id || index}>
                            <ProjectBody
                                Img={project.image}
                                Title={project.name}
                                Description={project.description}
                                Link={project.deployment_url}
                                id={project.id}
                            />
                        </Animate>
                    ))}
                </div>

            </div>
            <div className={"md:hidden block"}>
                {projects.length > 4 && (
                    <div className="mt-6 w-full flex justify-start">
                        <ToggleButtonProjects
                            type={"projects"}
                        />
                    </div>
                )}
            </div>
            <div className={"hidden md:block"}>
                {projects.length > 6 && (
                    <div className="mt-6 w-full flex justify-start">
                        <ToggleButtonProjects
                            type={'projects'}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectTabs;
import ToggleProject from "@/shared/components/custom/pages/projects/toggle.project";
import ProjectTabs from "@/shared/components/custom/pages/projects/tabs/project.tabs";
import DocsTabs from "@/shared/components/custom/pages/projects/tabs/docs.tabs";
import TechTabs from "@/shared/components/custom/pages/projects/tabs/tech.tabs";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const X1Y4Half = () => {
    return (
        <section className="md:px-[10%] px-[5%] w-full my-[3rem] overflow-hidden" id="showcase">
            <Animate preset={"fadeUp"} duration={1000}>
                <article className="text-center pb-10">
                    <h2 className=" text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-linear-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
              backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
          }}>
            Portfolio
          </span>
                    </h2>
                    <p className="dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
                        Tutaj możesz zobaczyć moje projekty, certyfikaty i technologie, których używałem w moich projektach. Każdy projekt bardzo pomógł mi w rozwoju
                    </p>
                </article>
            </Animate>
            <Animate preset={"fadeDown"} duration={1000}>
                <article className="w-full">
                    <ToggleProject/>

                    <div
                        id="projects-project-section"
                        className="project-section mt-10 block"
                    >
                        <ProjectTabs />
                    </div>

                    <div
                        id="documents-project-section"
                        className="project-section mt-10 hidden"
                    >
                        <DocsTabs />
                    </div>

                    <div
                        id="tech-project-section"
                        className="project-section mt-10 hidden"
                    >
                        <TechTabs />
                    </div>
                </article>
            </Animate>
        </section>
    );
};

export default X1Y4Half;
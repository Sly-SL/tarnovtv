import OrderConsultationForm from "@/shared/components/forms/order-consultation.form";
import TypingText from "@/shared/components/custom/pages/home/typing-text.home";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const X1Y1Half = () => {
    const TECHSTACK = ["SwiftUi", "Next", "Nest", "Actix"];

    return (
        <Animate className={"flex p-4 group sm:pt-6 md:pt-8 lg:pt-10 flex-col justify-center md:pb-40 items-start px-6 md:px-20"} preset={"fadeRight"} duration={500}>
                <div className="hidden">
                    <h1>Slysl Fullstack Developer Portfolio — SwiftUI, Vapor, Next.js, Nest.js</h1>
                </div>
                <h1 className="text-8xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Stefan Loish
                </h1>
                <h2 className="pt-8 text-3xl md:text-xl uppercase tracking-wide text-black/90 group-hover:text-black dark:text-white/60  dark:group-hover:text-white font-semibold">
                    Fullstack developer
                </h2>
                <div className="pt-8 text-5xl md:text-2xl">
                    <TypingText />
                    <p className="text-sm pt-8 md:text-lg text-black/90 group-hover:text-black dark:text-white/80  dark:group-hover:text-white max-w-xl font-light">
                        Fullstack developer specjalizujący się w SwiftUI, Actix, Next.js oraz Nest.js. Tworzę skalowalne i przyjazne<br/> dla użytkownika aplikacje od podstaw, koncentrując<br/> się na wydajności, czystej architekturze <br/> i nowoczesnym designie.
                    </p>
                </div>
                <div className="pt-18 flex flex-wrap gap-3">

                    {TECHSTACK.map((tech) => (
                        <span
                            key={tech}
                            className="bg-white/80 border dark:bg-gray-800 text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white px-4 py-2 rounded-full text-2xl md:text-xl font-mono"
                        >
              {tech}
            </span>
                    ))}
                </div>
            <div className={"flex pt-6"}><OrderConsultationForm/></div>
        </Animate>
    );
};

export default X1Y1Half;
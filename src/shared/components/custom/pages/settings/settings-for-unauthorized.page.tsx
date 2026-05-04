import Animate from "@/shared/components/libs/animate/animate.ssr";
import X1y2HalfSettings from "./halfs/x1y2.half.settings";
import type {UserType} from "@/shared/types/domen/user.type";

const SettingsForUnauthorizedPage = (user?: Partial<UserType>) => {
    return (
        <div className="relative w-full flex flex-col overflow-hidden">

            {/* Background */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-(--contrast-color)/10 blur-[120px] pointer-events-none"/>
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.07] blur-[100px] pointer-events-none"/>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
                }}
            />

            {/* Header */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-8 pb-6 border-b border-white/[0.06]">
                <div className="max-w-screen-xl mx-auto">
                    <Animate preset="fadeLeft" duration={600}>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-(--contrast-color)/10 border border-indigo-500/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                            <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                            Ustawienia
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                            Twoje{" "}
                            <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                                Preferencje
                            </span>
                        </h1>
                        <p className="text-sm text-white/30 font-light mt-1">
                            Dostosuj wygląd i zachowanie aplikacji do swoich potrzeb.
                        </p>
                    </Animate>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-8">
                <div className="max-w-screen-xl mx-auto">
                    <X1y2HalfSettings {...user}/>
                </div>
            </div>
        </div>
    );
};

export default SettingsForUnauthorizedPage;
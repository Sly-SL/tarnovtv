import type {ReactNode} from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

const LiquidGlassCustom = ({ children,className }: Props) => {
    return (
        <article className={`p-2 sm:p-4 rounded-2xl w-full bg-gray-500/5 backdrop-blur-xl border border-white/20 shadow-lg ${className}`}>
            <div className="absolute inset-0 pointer-events-none -z-1">
                <div className="absolute -z-1 inset-0 bg-gray-500/5 backdrop-blur-[5px] rounded-2xl"/>
                <div className="absolute -z-1 inset-0 rounded-2xl shadow-[inset_0_0_50px_rgba(255,255,255,0.1)]"/>
            </div>
            {children}
        </article>
    );
};

export default LiquidGlassCustom;
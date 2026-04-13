import type {ComponentType, FC, ReactNode, SVGProps} from "react";
import Link from "next/link";

interface CTAButtonProps {
    href?: string;
    children:ReactNode;
    className?: string;
    icon:ComponentType<SVGProps<SVGSVGElement>>;
    animation: 1|2;
    onClick?: () => unknown;
}

export const BasicCTAButton:FC<CTAButtonProps> = (({ href, className, children, icon: Icon,animation }) => (
    href ? <Link href={href}>
        <button className={`group relative w-[200px] ${className}`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
            <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
                <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
                <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-bold z-10">
            {children}
          </span>
          <Icon className={`w-4 h-4 text-gray-200 ${animation === 1 ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
            </div>
        </button>
    </Link>
        :
        <button className={`group relative w-[200px] ${className}`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
                <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
                    <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
                    <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r font-bold from-gray-200 to-white bg-clip-text text-transparent z-10">
            {children}
          </span>
          <Icon className={`w-4 h-4 text-gray-200 ${animation === 1 ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
                </div>
        </button>
));
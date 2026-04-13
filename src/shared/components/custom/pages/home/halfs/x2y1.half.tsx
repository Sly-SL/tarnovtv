import Image from "next/image";
import Background from "@/public/assets/slysl.webp"
import Animate from "@/shared/components/libs/animate/animate.ssr";

const X2Y1Half = () => {
    return (
        <Animate
            className="relative overflow-hidden max-h-screen"
            preset="fadeLeft"
        >
            <Image
                src={Background}
                alt="Background"
                fill
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-linear-to-l from-transparent via-black/40 to-black/95" />
        </Animate>
    );
};

export default X2Y1Half;
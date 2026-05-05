import type {UsPartnersBodyProps} from "@/shared/types/us-partners-body.type";
import Link from "next/link";

const UsPartnersCarouselBody = ({ data }: { data: UsPartnersBodyProps }) => {
    return (
        <Link
            href={data.link}
            className="relative flex-none w-[200px] h-[200px] rounded-2xl border border-black/[0.07] bg-black/[0.028] hover:border-(--contrast-color)/25 hover:bg-(--contrast-color)/[0.04] backdrop-blur-xl transition-all duration-300 overflow-hidden group block dark:border-white/[0.07] dark:bg-white/[0.028]"
        >
            <div className="flex items-center justify-center w-full h-full lg:opacity-40 lg:grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300">
                {data.image}
            </div>
        </Link>
    );
};

export default UsPartnersCarouselBody;
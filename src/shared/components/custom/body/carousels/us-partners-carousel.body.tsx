import type {UsPartnersBodyProps} from "@/shared/types/us-partners-body.type";
import Link from "next/link";

const UsPartnersCarouselBody = ({ data }: { data: UsPartnersBodyProps }) => {

    return (
        <Link href={data.link}
            className="rounded-md hover:scale-105 lg:grayscale hover:grayscale-0 transition-transform block hover:scale-[1.03] duration-500 flex-none h-[200px] w-[200px] items-center justify-center overflow-hidden"
        >
            <div className="flex items-center justify-center w-full h-full">
                {data.image}
            </div>
        </Link>
    );
};

export default UsPartnersCarouselBody;
import type {StaticImageData} from "next/image";

export interface CommentBodyProps {
    id: string;
    name: string;
    image?: string | StaticImageData;
    comment: string;
    created_at: number,

}
import Image from "next/image";
import {CommentBodyProps} from "@/shared/types/comment-body.type";
import UserCircleDashedIcon from "@/shared/consts/icons/user-circle-dashed.icon";

export const CommentBody = ({ name,comment,created_at,image }:CommentBodyProps) => {

    const formatDate = (timestamp?: number | null): string => {
        if (!timestamp) return '';

        const date = new Date(timestamp);
        const now = new Date();
        const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 1) {
            const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
            return diffSeconds < 5 ? 'Just now' : `${diffSeconds}s ago`;
        }
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
        return `${Math.floor(diffDays / 365)}y ago`;
    };


    return (
    <div
        className="px-4 pt-4 pb-2 rounded-xl dark:bg-white/5 bg-black/5 border border-white/10 hover:bg-white/10 transition-all group hover:shadow-lg hover:-translate-y-0.5"

    >
        <div className="flex items-start gap-3 ">
            {image ? (
                <Image
                    src={image}
                    alt={`${name}'s profile`}
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30"
                    loading="lazy"
                    width={40}
                    height={40}
                />
            ) : (
                <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
                    <UserCircleDashedIcon size={20} />
                </div>
            )}
            <div className="grow min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <h4 className="font-medium text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white truncate">{name}</h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
    {formatDate(created_at)}
</span>
                </div>
                <p className="text-black/90 group-hover:text-black dark:text-white/70  dark:group-hover:text-white text-sm wrap-break-word leading-relaxed relative bottom-2">{comment}</p>
            </div>
        </div>
    </div>
);
}
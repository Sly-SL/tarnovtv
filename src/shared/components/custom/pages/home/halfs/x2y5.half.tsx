'use client'

import {CommentForm} from "@/shared/components/forms/comment.form";
import {getCommentsQuery} from "@/lib/firebase/queries/get-comments.query";
import {CommentBody} from "@/shared/components/custom/body/comments/comment.body";
import {useEffect, useState} from "react";
import {CommentBodyProps} from "@/shared/types/comment-body.type";
import {ChatCircleDotsIcon, UserCircleDashedIcon} from "@phosphor-icons/react";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const X2Y5Half = () => {
    const [comments, setComments] = useState<CommentBodyProps[]>([]);

    const handleFetch = async () => {
        const comments = await getCommentsQuery()
        setComments(comments)
    }
    useEffect(() => {
        handleFetch()
    },[])

    return (
        <Animate preset={"fadeRight"} className={"pt-10"}>
            <div className="w-full bg-linear-to-b from-white/10 to-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl">
                <Animate className="p-6 border-b border-white/10 animate-fade-in-down"  duration={800}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-indigo-500/20">
                            <ChatCircleDotsIcon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white">
                            Komentarze <span className="text-indigo-400">({comments.length})</span>
                        </h3>
                    </div>
                </Animate>
                <div className="p-6 space-y-6">

                    <div >
                        <CommentForm />
                    </div>

                    <Animate
                        preset={"fadeUp"}
                        delay={2000}
                        className="space-y-4 h-[300px] overflow-y-auto custom-scrollbar">
                        {comments.length === 0 ? (
                            <div className="text-center py-8" data-aos="fade-in">
                                <UserCircleDashedIcon className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-50" />
                                <p className="text-gray-400">No comments yet. Start the conversation!</p>
                            </div>
                        ) : (
                            comments.map((comment, i) => (
                                <CommentBody
                                    key={i}
                                    {...comment}
                                />
                            ))
                        )}
                    </Animate>
                </div>
            </div>
        </Animate>
    );
};

export default X2Y5Half;
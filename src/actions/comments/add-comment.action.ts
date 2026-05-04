'use server'

import type {CommentBodyProps} from "@/shared/types/comment-body.type";
import {randomUUID} from "node:crypto";
import {NextResponse} from "next/server";
import {addDataWithCustomId} from "@/lib/firebase/firebase-admin";

export async function AddCommentAction(data:Omit<CommentBodyProps, "id">){
    if(!data.name || !data.comment){
        return new NextResponse("Not a valid data", {status: 400});
    }
    await addDataWithCustomId("comments", randomUUID(),{
        "name":data.name,
        "comment":data.comment,
        "image":data.image,
        "created_at":data.created_at,
    })
}
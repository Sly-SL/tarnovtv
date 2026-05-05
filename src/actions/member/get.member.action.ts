// @/actions/members/members-get.action.ts
"use server";
import {membersGet} from "@/lib/firebase/get/members.get";

export const MembersGetAction = async () => {
    return await membersGet();
};
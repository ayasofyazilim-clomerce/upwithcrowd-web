"use server"

import { getUpwithcrowd } from "@/utils/client";

export async function getMembership() {
    const api_client = await getUpwithcrowd();
    // console.log("api_client server", api_client);
    const myMember = await api_client.member.getApiMymember();
    console.log("myMember server", myMember);
    return myMember;
}
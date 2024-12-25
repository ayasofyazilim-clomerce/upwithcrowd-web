"use server"

import { getUpwithcrowd } from "@/utils/client";
import { Volo_Abp_Application_Dtos_PagedResultDto_1 } from "@ayasofyazilim/saas/upwithcrowdService";

export async function getMembership() {
    const api_client = await getUpwithcrowd();
    // console.log("api_client server", api_client);
    const myMember = await api_client.member.getApiMymember() as Volo_Abp_Application_Dtos_PagedResultDto_1;
    // console.log("myMember server", myMember);
    return myMember;
}
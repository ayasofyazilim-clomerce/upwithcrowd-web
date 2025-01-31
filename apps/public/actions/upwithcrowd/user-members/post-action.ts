"use server";
import { getUpwithcrowd } from "@/utils/client";
import { PostApiUserMembersData } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { structuredError, structuredResponse } from "@repo/utils/api";
export async function postUserMembersApi(data: PostApiUserMembersData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.userMembers.postApiUserMembers(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

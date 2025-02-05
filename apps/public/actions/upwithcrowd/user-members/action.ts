"use server";

import {getUpwithcrowd} from "@/utils/client";
import {GetApiUserMembersByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";

export async function getUserMemberApi(data: GetApiUserMembersByIdData) {
  const api_client = await getUpwithcrowd();
  try {
    const response = await api_client.userMembers.getApiUserMembersById(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

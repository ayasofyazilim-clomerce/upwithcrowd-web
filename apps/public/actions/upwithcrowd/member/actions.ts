"use server";

import { getUpwithcrowd } from "@/utils/client";
import { GetApiMemberData } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { structuredError, structuredResponse } from "@repo/utils/api";

export async function getApiMemberApi(data?: GetApiMemberData) {
  const api_client = await getUpwithcrowd();
  try {
    const response = await api_client.member.getApiMember(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

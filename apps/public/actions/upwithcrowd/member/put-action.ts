"use server";
import { getUpwithcrowd } from "@/utils/client";
import { PutApiMemberByIdSwitchData } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { structuredError, structuredResponse } from "@repo/utils/api";

export async function putMemberSwitchByIdApi(data: PutApiMemberByIdSwitchData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.member.putApiMemberByIdSwitch(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

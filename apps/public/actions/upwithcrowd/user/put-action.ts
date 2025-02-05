"use server";
import {getUpwithcrowd} from "@/utils/client";
import {PutApiIdentityUsersByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";

export async function putUserApi(data: PutApiIdentityUsersByIdData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.user.putApiIdentityUsersById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

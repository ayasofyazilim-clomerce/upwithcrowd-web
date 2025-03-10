"use server";
import {getAccountServiceClient} from "../../core/lib";
import {PutApiAccountMyProfileData} from "@ayasofyazilim/core-saas/AccountService";
import {structuredError, structuredResponse} from "@repo/utils/api";

export async function putMyProfileApi(data: PutApiAccountMyProfileData) {
  try {
    const client = await getAccountServiceClient();
    const dataResponse = await client.profile.putApiAccountMyProfile(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

"use server";
import {getUpwithcrowdClient} from "../lib";
import {PutApiIdentityUsersByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";

export async function putUserApi(data: PutApiIdentityUsersByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.user.putApiIdentityUsersById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

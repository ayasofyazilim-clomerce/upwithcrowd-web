"use server";

import type {PutApiProviderByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function putProviderApi(data: PutApiProviderByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.providers.putApiProviderById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

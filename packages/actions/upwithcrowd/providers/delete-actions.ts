"use server";

import type {DeleteApiProviderByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function deleteProviderByIdApi(data: DeleteApiProviderByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.providers.deleteApiProviderById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

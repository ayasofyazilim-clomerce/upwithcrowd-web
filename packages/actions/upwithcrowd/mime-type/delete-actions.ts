"use server";

import type {DeleteApiMimeTypeByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function deleteMimeTypeByIdApi(data: DeleteApiMimeTypeByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.mimeType.deleteApiMimeTypeById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

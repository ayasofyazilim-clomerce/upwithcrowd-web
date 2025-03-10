"use server";

import type {PutApiMimeTypeByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function putMimeTypeApi(data: PutApiMimeTypeByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.mimeType.putApiMimeTypeById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

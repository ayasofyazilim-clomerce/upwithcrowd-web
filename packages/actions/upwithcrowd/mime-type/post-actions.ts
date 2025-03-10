"use server";

import type {PostApiMimeTypeData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredResponse, structuredError} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function postMimeTypeApi(data: PostApiMimeTypeData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.mimeType.postApiMimeType(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

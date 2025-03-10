"use server";

import type {PostApiFileTypeData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function postFileTypeApi(data: PostApiFileTypeData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileType.postApiFileType(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

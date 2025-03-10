"use server";

import type {PostApiFileTypeGroupData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function postFileTypeGroupApi(data: PostApiFileTypeGroupData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileTypeGroup.postApiFileTypeGroup(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

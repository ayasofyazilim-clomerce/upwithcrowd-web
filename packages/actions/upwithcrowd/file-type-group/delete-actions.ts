"use server";

import type {DeleteApiFileTypeGroupByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function deleteFileTypeGroupByIdApi(data: DeleteApiFileTypeGroupByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileTypeGroup.deleteApiFileTypeGroupById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

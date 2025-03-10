"use server";

import type {DeleteApiFileTypeByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function deleteFileTypeByIdApi(data: DeleteApiFileTypeByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileType.deleteApiFileTypeById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

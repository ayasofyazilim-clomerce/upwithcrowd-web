"use server";

import type {DeleteApiFileTypeMimeTypesByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function deleteFileTypeMimeTypesByIdApi(data: DeleteApiFileTypeMimeTypesByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileTypeMimeTypes.deleteApiFileTypeMimeTypesById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

"use server";

import type {PutApiFileTypeMimeTypesByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function putFileTypeMimeTypesApi(data: PutApiFileTypeMimeTypesByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileTypeMimeTypes.putApiFileTypeMimeTypesById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

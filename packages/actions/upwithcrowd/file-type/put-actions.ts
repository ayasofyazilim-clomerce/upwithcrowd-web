"use server";

import type {PutApiFileTypeByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function putFileTypeApi(data: PutApiFileTypeByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileType.putApiFileTypeById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

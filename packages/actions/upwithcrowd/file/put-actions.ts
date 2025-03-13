"use server";

import type {PutApiFileByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function putFileValidationByIdApi(data: PutApiFileByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.file.putApiFileById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

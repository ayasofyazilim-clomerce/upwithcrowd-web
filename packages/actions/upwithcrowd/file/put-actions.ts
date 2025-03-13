"use server";

import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";
import type {PutApiFileByIdValidatedData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

export async function putFileValidationByIdApi(data: PutApiFileByIdValidatedData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.file.putApiFileByIdValidated(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

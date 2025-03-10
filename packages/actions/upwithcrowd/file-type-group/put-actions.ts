"use server";

import type {PutApiFileTypeGroupByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function putFileTypeGroupApi(data: PutApiFileTypeGroupByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileTypeGroup.putApiFileTypeGroupById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

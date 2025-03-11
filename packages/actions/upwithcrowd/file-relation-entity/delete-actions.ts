"use server";

import type {DeleteApiFileRelationEntityByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function deleteFileRelationEntityByIdApi(data: DeleteApiFileRelationEntityByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileRelationEntity.deleteApiFileRelationEntityById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

"use server";

import type {DeleteApiFileRelationsByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function deleteFileRelationEntityByIdApi(data: DeleteApiFileRelationsByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileRelations.deleteApiFileRelationsById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

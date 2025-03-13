"use server";

import type {PutApiFileRelationsByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function putFileRelationsApi(data: PutApiFileRelationsByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileRelations.putApiFileRelationsById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

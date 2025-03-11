"use server";

import type {PutApiFileRelationEntityByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function putFileRelationEntityApi(data: PutApiFileRelationEntityByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileRelationEntity.putApiFileRelationEntityById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

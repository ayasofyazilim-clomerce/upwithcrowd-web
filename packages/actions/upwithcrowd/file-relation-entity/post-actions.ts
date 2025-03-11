"use server";

import type {PostApiFileRelationEntityData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function postFileRelationEntityApi(data: PostApiFileRelationEntityData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileRelationEntity.postApiFileRelationEntity(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

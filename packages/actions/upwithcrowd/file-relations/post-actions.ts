"use server";

import type {PostApiFileRelationsData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function postFileRelationEntityApi(data: PostApiFileRelationsData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileRelations.postApiFileRelations(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

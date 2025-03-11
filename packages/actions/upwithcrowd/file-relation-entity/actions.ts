"use server";

import type {GetApiFileRelationEntityData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import type {Session} from "next-auth";
import {getUpwithcrowdClient} from "../lib";

export async function getFileRelationEntityApi(data: GetApiFileRelationEntityData, session: Session | null) {
  try {
    const client = await getUpwithcrowdClient(session);
    const response = await client.fileRelationEntity.getApiFileRelationEntity(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}

"use server";

import type {GetApiMimeTypeData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import type {Session} from "next-auth";
import {getUpwithcrowdClient} from "upwithcrowd/lib";

export async function getRolesByIdClaimsApi(data: GetApiMimeTypeData, session: Session | null) {
  try {
    const client = await getUpwithcrowdClient(session);
    const response = await client.mimeType.getApiMimeType(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

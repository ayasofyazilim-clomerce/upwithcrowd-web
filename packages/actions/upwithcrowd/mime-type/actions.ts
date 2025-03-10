"use server";

import type {GetApiMimeTypeData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import type {Session} from "next-auth";
import {getUpwithcrowdClient} from "../lib";

export async function getMimeTypesApi(data: GetApiMimeTypeData, session: Session | null) {
  try {
    const client = await getUpwithcrowdClient(session);
    const response = await client.mimeType.getApiMimeType(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}

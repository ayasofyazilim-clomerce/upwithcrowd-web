"use server";

import type {GetApiFileTypeMimeTypesData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import type {Session} from "next-auth";
import {getUpwithcrowdClient} from "../lib";

export async function getFileTypeMimeTypesApi(data: GetApiFileTypeMimeTypesData, session: Session | null) {
  try {
    const client = await getUpwithcrowdClient(session);
    const response = await client.fileTypeMimeTypes.getApiFileTypeMimeTypes(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}

"use server";

import type {GetApiFileTypeData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import type {Session} from "next-auth";
import {getUpwithcrowdClient} from "../lib";

export async function getFileTypeApi(data: GetApiFileTypeData, session: Session | null) {
  try {
    const client = await getUpwithcrowdClient(session);
    const response = await client.fileType.getApiFileType(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}

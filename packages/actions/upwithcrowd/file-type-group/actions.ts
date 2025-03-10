"use server";

import type {GetApiFileTypeGroupData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import type {Session} from "next-auth";
import {getUpwithcrowdClient} from "../lib";

export async function getFileTypeGroupApi(data: GetApiFileTypeGroupData, session: Session | null) {
  try {
    const client = await getUpwithcrowdClient(session);
    const response = await client.fileTypeGroup.getApiFileTypeGroup(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}

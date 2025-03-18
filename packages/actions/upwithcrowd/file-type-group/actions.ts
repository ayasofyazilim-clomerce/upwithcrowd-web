"use server";

import type {
  GetApiFileTypeGroupData,
  GetApiFileTypeGroupRulesetData,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
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
export async function getApiFileTypeGroupRulesetApi(data?: GetApiFileTypeGroupRulesetData, session?: Session | null) {
  try {
    const client = await getUpwithcrowdClient(session);
    const dataResponse = await client.fileTypeGroup.getApiFileTypeGroupRuleset(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    throw structuredError(error);
  }
}

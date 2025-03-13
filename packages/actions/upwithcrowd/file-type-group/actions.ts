"use server";

import type {
  GetApiFileTypeGroupData,
  GetApiFileTypeGroupFileTypeGroupRulesetData,
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
export async function getApiFileTypeGroupFileTypeGroupRulesetApi(
  data?: GetApiFileTypeGroupFileTypeGroupRulesetData,
  session?: Session | null,
) {
  try {
    const client = await getUpwithcrowdClient(session);
    const dataResponse = await client.fileTypeGroup.getApiFileTypeGroupFileTypeGroupRuleset(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    throw structuredError(error);
  }
}

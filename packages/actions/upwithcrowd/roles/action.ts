"use server";

import type {GetApiCustomRolesData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredResponse, structuredError} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function getCustomRolesApi(data?: GetApiCustomRolesData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.customRoles.getApiCustomRoles(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

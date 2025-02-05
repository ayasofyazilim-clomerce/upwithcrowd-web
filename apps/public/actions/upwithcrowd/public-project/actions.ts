"use server";

import {getUpwithcrowd} from "@/utils/client";
import {GetApiPublicProjectProjectListData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";

export async function getPublicProjectsApi(data?: GetApiPublicProjectProjectListData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.publicProject.getApiPublicProjectProjectList(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
